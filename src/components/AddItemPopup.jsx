import React, { useState } from 'react';
import '../styles/AddItemPopup.css';

function AddItemPopup({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pradesh, setPradesh] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, unit, quantity, pradesh });
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'popup-overlay') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content">
        <h2>Add Items</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <label htmlFor="pradesh">Pradesh :</label>
            <select
              id="pradesh"
              value={pradesh}
              onChange={(e) => setPradesh(e.target.value)}
              required
              className="select-pradesh"
            >
              <option value="">Select Pradesh</option>
              <option value="Pradesh1">Pradesh 1</option>
              <option value="Pradesh2">Pradesh 2</option>
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
