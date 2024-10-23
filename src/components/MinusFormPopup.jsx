import React, { useState } from 'react';
import '../styles/AddItemPopup.css';

function MinusFormPopup({ isOpen, onClose, onSubmit, itemName, defaultUnit, currentLanguage }) {
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState(defaultUnit);
  const [type, setType] = useState('used');
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      itemName,
      quantity: parseInt(quantity),
      unit,
      type,
      name: type === 'given' ? name : '',
      contactNumber: type === 'given' ? contactNumber : ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{currentLanguage === 'eng' ? 'Remove Item' : 'વસ્તુ દૂર કરો'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="itemName">
              {currentLanguage === 'eng' ? 'Item Name' : 'વસ્તુનું નામ'}:
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">
              {currentLanguage === 'eng' ? 'Quantity' : 'જથ્થો'}:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
          <div className="form-group">
            <label htmlFor="type">
              {currentLanguage === 'eng' ? 'Type' : 'પ્રકાર'}:
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="used">{currentLanguage === 'eng' ? 'Used' : 'વપરાયેલ'}</option>
              <option value="given">{currentLanguage === 'eng' ? 'Given' : 'આપેલ'}</option>
            </select>
          </div>
          {type === 'given' && (
            <>
              <div className="form-group">
                <label htmlFor="name">
                  {currentLanguage === 'eng' ? 'Name' : 'નામ'}:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactNumber">
                  {currentLanguage === 'eng' ? 'Contact Number' : 'સંપર્ક નંબર'}:
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div className="button-group">
            <button type="submit" className="submit-button">
              {currentLanguage === 'eng' ? 'Remove' : 'દૂર કરો'}
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

export default MinusFormPopup;

