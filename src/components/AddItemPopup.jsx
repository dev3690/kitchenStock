import React, { useState, useEffect } from 'react';
import '../styles/AddItemPopup.css';
import { callAxiosApi, getPradeshItemsDetails, getTableData, assignItemToPradesh } from '../api_utils';

function AddItemPopup({ isOpen, onClose, onSubmit }) {
  const [itemId, setItemId] = useState('');
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pradeshId, setPradeshId] = useState('');
  const [itemData, setItemData] = useState([]);
  const [pradeshData, setPradeshData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemResponse = await callAxiosApi(getTableData, { table: "item" });
        const pradeshResponse = await callAxiosApi(getTableData, { table: "pradesh" });
        setItemData(itemResponse.data.data);
        setPradeshData(pradeshResponse.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
        unit: unit
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
        <h2>Add Items</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="itemId">Item Name :</label>
            <select
              id="itemId"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
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
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
              className="select-unit"
            >
              <option value="">Select Unit</option>
              <option value="Kg">Kg</option>
              <option value="Box">Box</option>
            </select>
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
          <div className="form-group">
            <label htmlFor="pradeshId">Pradesh :</label>
            <select
              id="pradeshId"
              value={pradeshId}
              onChange={(e) => setPradeshId(e.target.value)}
              required
              className="select-pradesh"
            >
              <option value="">Select Pradesh</option>
              {pradeshData.map((pradesh) => (
                <option key={pradesh.pId} value={pradesh.pId}>
                  {pradesh.newNameEng}
                </option>
              ))}
            </select>
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
