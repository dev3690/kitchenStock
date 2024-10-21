import React, { useState } from 'react';
import '../styles/VangiForm.css';
import { addReceiveItem } from '../api_utils';

function VangiForm({ onClose, onSubmit, currentLanguage, pradeshId, pradeshName, itemIds, itemsList }) {
  const [formData, setFormData] = useState({
    pId: pradeshId,
    dePerson: '',
    dePerCont: '',
    reference: ' ',
    remark: ''
  });

  const [items, setItems] = useState([{ itemId: '', qty: '', unit: '', isOther: false, itemName: '' }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addReceiveItem({
        ...formData,
        pId: Number(formData.pId),
        table: "others",
        items: items.map(item => ({
          itemId: item.isOther ? null : Number(item.itemId),
          itemName: item.isOther ? item.itemName : null,
          qty: Number(item.qty),
          unit: item.isOther ? item.unit : null,
          isOther: item.isOther
        }))
      });

      if (response.status === 'error') {
        throw new Error(response.message || 'An error occurred while submitting the form');
      }
      console.log('Items received successfully:', response);
      onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error receiving items:', error);
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    if (field === 'itemId') {
      const selectedItem = itemsList.find(item => item.itemId === Number(value));
      updatedItems[index].unit = selectedItem ? selectedItem.unit : '';
      updatedItems[index].isOther = value === 'other';
      updatedItems[index].itemName = '';
      if (value === 'other') {
        updatedItems[index].unit = ''; 
      }
    }
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { itemId: '', qty: '', unit: '', isOther: false, itemName: '' }]);
  };

  return (
    <div className="vangi-form-overlay" onClick={onClose}>
      <div className="vangi-form-container" onClick={(e) => e.stopPropagation()}>
        <div className="vangi-form-header">
          <h2>{currentLanguage === 'eng' ? 'Receive Item' : 'વસ્તુ પ્રાપ્ કરો'}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="vangi-form-content">
          <form onSubmit={handleSubmit} className="vangi-form">
            <div className="form-group">
              <label htmlFor="pradeshName">{currentLanguage === 'eng' ? 'Pradesh Name :' : 'પ્રદેશ નામ :'}</label>
              <input type="text" id="pradeshName" value={pradeshName} disabled />
            </div>

            {items.map((item, index) => (
              <div key={index} className="form-row">
                <div className="form-group">
                  <select
                    id={`itemId-${index}`}
                    value={item.itemId}
                    onChange={(e) => handleItemChange(index, 'itemId', e.target.value)}
                    required
                  >
                    <option value="">{currentLanguage === 'eng' ? 'Select Item' : 'વસ્તુ પસંદ કરો'}</option>
                    {itemIds
                      .filter(itemId => itemsList.find(i => i.itemId === itemId && !i.isOther))
                      .map((itemId) => (
                        <option key={itemId} value={itemId}>
                          {currentLanguage === 'eng' 
                            ? itemsList.find(i => i.itemId === itemId)?.nameEng 
                            : itemsList.find(i => i.itemId === itemId)?.nameGuj}
                        </option>
                      ))}
                    <option value="other">{currentLanguage === 'eng' ? 'Other' : 'અન્ય'}</option>
                  </select>
                </div>
                {item.isOther && (
                  <div className="form-group">
                    <input
                      type="text"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      placeholder={currentLanguage === 'eng' ? 'Item Name' : 'વસ્તુનું નામ'}
                      required
                    />
                  </div>
                )}
                <div className="form-group">
                  <input
                    type="number"
                    id={`qty-${index}`}
                    value={item.qty}
                    placeholder={currentLanguage === 'eng' ? 'Quantity' : 'જથ્થો'}
                    onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id={`unit-${index}`}
                    value={item.unit}
                    placeholder={currentLanguage === 'eng' ? 'Unit' : 'એકમ'}
                    onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                    readOnly={!item.isOther}
                  />
                  
                </div>
              </div>
            ))}

            <button type="button" onClick={handleAddItem} className="add-item-btn">
              <img src="/assets/add.png" alt="Add Item" className="add-icon" />
              <span className="add-item-text">
                {currentLanguage === 'eng' ? 'Add Item' : 'વસ્તુ ઉમેરો'}
              </span>
            </button>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dePerson">{currentLanguage === 'eng' ? 'Delivery Person :' : 'ડિલિવરી વ્યક્તિ :'}</label>
                <input
                  type="text"
                  id="dePerson"
                  name="dePerson"
                  value={formData.dePerson}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dePerCont">{currentLanguage === 'eng' ? 'Contact Number :' : 'સંપર્ક નંબર :'}</label>
                <input
                  type="tel"
                  id="dePerCont"
                  name="dePerCont"
                  value={formData.dePerCont}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="reference">{currentLanguage === 'eng' ? 'Reference :' : 'સંદર્ભ :'}</label>
                <input
                  type="text"
                  id="reference"
                  name="reference"
                  value={formData.reference || ' '}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="remark">{currentLanguage === 'eng' ? 'Remarks :' : 'ટિપ્પણીઓ :'}</label>
                <textarea
                  id="remark"
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="button-group">
              <button type="submit" className="submit-button">
                {currentLanguage === 'eng' ? 'Submit' : 'સબમિટ કરો'}
              </button>
              <button type="button" className="cancel-button" onClick={onClose}>
                {currentLanguage === 'eng' ? 'Cancel' : 'રદ કરો'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VangiForm;
