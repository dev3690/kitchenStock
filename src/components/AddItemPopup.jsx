import React, { useState, useEffect } from 'react';
import '../styles/AddItemPopup.css';
import { callAxiosApi, getTableData, assignItemToPradesh } from '../api_utils';

function AddItemPopup({ isOpen, onClose, onSubmit, pradeshId, pradeshName, currentLanguage }) {
  const [itemId, setItemId] = useState('');
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const selectedItem = itemData.find(item => item.itemId === parseInt(selectedItemId));
    if (selectedItem) {
      setUnit(selectedItem.unit);
    } else {
      setUnit('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await callAxiosApi(assignItemToPradesh, {
        pId: parseInt(pradeshId),
        itemId: parseInt(itemId),
        qty: quantity
      });
      console.log('Item assigned successfully:', response.data);
      const selectedItem = itemData.find(item => item.itemId === parseInt(itemId));
      onSubmit({
        itemId: parseInt(itemId),
        nameEng: selectedItem ? selectedItem.nameEng : 'Unknown Item',
        qty: quantity,
        unit: unit,
        updatedData: response.data // Include the updated data from the response
      });
      onClose();
    } catch (error) {
      console.error('Error assigning item:', error);
      // You might want to show an error message to the user here
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
              className="readonly-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="itemId">Item Name :</label>
            <select
              id="itemId"
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
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="unit">Unit :</label>
            <input
              type="text"
              id="unit"
              value={unit}
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity :</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">Submit</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemPopup;
