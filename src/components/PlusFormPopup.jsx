import React, { useState } from 'react';
import '../styles/AddItemPopup.css';

function PlusFormPopup({ isOpen, onClose, onSubmit, itemName, defaultUnit, currentLanguage }) {
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState(defaultUnit);
  const [type, setType] = useState('purchase');
  const [sevakName, setSevakName] = useState('');
  const [sevakNo, setSevakNo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      itemName,
      quantity: parseInt(quantity),
      unit,
      type,
      sevakName: type === 'seva' ? sevakName : '',
      sevakNo: type === 'seva' ? sevakNo : ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{currentLanguage === 'eng' ? 'Add Item' : 'વસ્તુ ઉમેરો'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="itemName">
              {currentLanguage === 'eng' ? 'Item Name' : 'વ���્તુનું નામ'}:
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
              <option value="purchase">{currentLanguage === 'eng' ? 'Purchase' : 'ખરીદી'}</option>
              <option value="seva">{currentLanguage === 'eng' ? 'Seva' : 'સેવા'}</option>
            </select>
          </div>
          {type === 'seva' && (
            <>
              <div className="form-group">
                <label htmlFor="sevakName">
                  {currentLanguage === 'eng' ? 'Sevak Name' : 'સેવકનું નામ'}:
                </label>
                <input
                  type="text"
                  id="sevakName"
                  value={sevakName}
                  onChange={(e) => setSevakName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="sevakNo">
                  {currentLanguage === 'eng' ? 'Sevak No' : 'સેવક નંબર'}:
                </label>
                <input
                  type="text"
                  id="sevakNo"
                  value={sevakNo}
                  onChange={(e) => setSevakNo(e.target.value)}
                  required
                />
              </div>
            </>
          )}
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

export default PlusFormPopup;

