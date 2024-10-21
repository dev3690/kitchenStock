import React, { useState, useEffect } from 'react';
import '../styles/AddItemPopup.css';
import { callAxiosApi, getTableData, assignItemToPradesh } from '../api_utils';

function AddItemPopup({ isOpen, onClose, onSubmit, pradeshId, pradeshName, currentLanguage }) {
  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOther, setIsOther] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setItemId('');
      setItemName('');
      setUnit('');
      setQuantity('');
      setIsOther(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemResponse = await callAxiosApi(getTableData, { table: "item" });
        setItemData(itemResponse.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleItemChange = (e) => {
    const selectedItemId = e.target.value;
    setItemId(selectedItemId);
    if (selectedItemId === 'other') {
      setIsOther(true);
      setUnit('');
      setItemName('');
    } else {
      setIsOther(false);
      const selectedItem = itemData.find(item => item.itemId === parseInt(selectedItemId));
      if (selectedItem) {
        setUnit(selectedItem.unit);
        setItemName(selectedItem.nameEng);
      } else {
        setUnit('');
        setItemName('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await callAxiosApi(assignItemToPradesh, {
        pId: parseInt(pradeshId),
        itemId: isOther ? null : parseInt(itemId),
        itemName: isOther ? itemName : null,
        qty: quantity,
        unit: unit,
        isOther: isOther
      });
      console.log('Item assigned successfully:', response.data);
      onSubmit({
        itemId: isOther ? null : parseInt(itemId),
        nameEng: isOther ? itemName : itemData.find(item => item.itemId === parseInt(itemId))?.nameEng,
        updatedData: response.data
      });
      onClose();
    } catch (error) {
      console.error('Error assigning item:', error);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'popup-overlay') {
      onClose();
    }
  };

  if (!isOpen) return null;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content">
        <h2>{currentLanguage === 'eng' ? 'Assign New Item' : 'નવી વસ્તુ સોંપો'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="pradeshName">
              {currentLanguage === 'eng' ? 'Pradesh Name' : 'પ્રદેશ નામ'}:
            </label>
            <input
              type="text"
              id="pradeshName"
              value={pradeshName}
              readOnly
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', border: '1px solid #ff9966', borderRadius: '10px' }}
              className="readonly-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="itemId">Item Name :</label>
            <select
              id="itemId"
              style={{ borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
              value={itemId}
              onChange={handleItemChange}
              required
              className="select-item"
            >
              <option value="">Select Item</option>
              {itemData.map((item) => (
                <option key={item.itemId} value={item.itemId}>
                  {item.nameEng}
                </option>
              ))}
              {/* <option value="other">Other</option> */}
            </select>
          </div>
          {isOther && (
            <div className="form-group">
              <label htmlFor="itemName">Custom Item Name :</label>
              <input
                type="text"
                id="itemName"
                style={{ borderRadius: '10px' }}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="unit">Unit :</label>
            <input
              type="text"
              id="unit"
              value={unit}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', border: '1px solid #ff9966', borderRadius: '10px' }}
              onChange={(e) => setUnit(e.target.value)}
              readOnly={!isOther}
              className={isOther ? '' : 'readonly-input'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity :</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              style={{ borderRadius: '10px' }}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button" style={{ backgroundColor: '#BA5600', color: 'white', borderRadius: '40px' }}>
              {currentLanguage === 'eng' ? 'Add' : 'ઉમેરો'}
            </button>
            <button type="button" className="cancel-button" onClick={onClose} style={{ backgroundColor: 'white', color: '#BA5600  ', borderRadius: '40px' }}>
              {currentLanguage === 'eng' ? 'Cancel' : 'રદ કરો'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemPopup;
