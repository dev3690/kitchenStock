import React, { useState } from 'react';
import '../styles/AddItemPopup.css';

function AddItemPopup({ isOpen, onClose, onSubmit, categoryId, categoryName, currentLanguage }) {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      categoryId,
      itemName,
      quantity: parseInt(quantity),
      unit
    });
    setItemName('');
    setQuantity('');
    setUnit('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{currentLanguage === 'eng' ? 'Add New Item' : 'નવી વસ્તુ ઉમેરો'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="categoryName">
              {currentLanguage === 'eng' ? 'Category' : 'શ્રેણી'}:
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="itemName">
              {currentLanguage === 'eng' ? 'Item Name' : 'વસ્તુનું નામ'}:
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="unit">
              {currentLanguage === 'eng' ? 'Unit' : 'એકમ'}:
            </label>
            <input
              type="text"
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">
              {currentLanguage === 'eng' ? 'Add' : 'ઉમેરો'}
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              {currentLanguage === 'eng' ? 'Cancel' : 'રદ કરો'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemPopup;
