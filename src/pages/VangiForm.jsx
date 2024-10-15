import React, { useState, useEffect } from 'react';
import '../styles/VangiForm.css';
import { callAxiosApi, getTableData, addReceiveItem } from '../api_utils';

function VangiForm({ onClose, onSubmit, currentLanguage, pradeshId, pradeshName, itemIds, itemsList }) {
  const [formData, setFormData] = useState({
    itemId: '',
    pId: pradeshId,
    qty: '',
    unit: '',
    dePerson: '',
    dePerCont: '',
    reference: '',
    remark: ''
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // If the item changes, update the unit
    if (name === 'itemId') {
      const selectedItem = itemData.find(item => item.itemId === value);
      if (selectedItem) {
        setFormData(prevState => ({
          ...prevState,
          unit: selectedItem.unit // Assuming the item data includes a 'unit' field
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addReceiveItem({
        ...formData,
        itemId: Number(formData.itemId),
        pId: Number(formData.pId),
      });
      if (response.errorStatus) {
        throw new Error(response.msg || 'An error occurred while submitting the form');
      }
      console.log('Item received successfully:', response);
      onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error receiving item:', error);
      setError(error.message || "Failed to receive item. Please try again.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="vangi-form-overlay">
      <div className="vangi-form-container">
        <div className="vangi-form-header">
          <h2>{currentLanguage === 'eng' ? 'Receive Item' : 'વસ્તુ પ્રાપ્ત કરો'}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="vangi-form-content">
          <form onSubmit={handleSubmit} className="vangi-form">
            {/* Pradesh Name (disabled) */}
            <div className="form-group">
              <label htmlFor="pradeshName">{currentLanguage === 'eng' ? 'Pradesh Name :' : 'પ્રદેશ નામ :'}</label>
              <input type="text" id="pradeshName" value={pradeshName} disabled />
            </div>

            {/* Item selection */}
            <div className="form-group">
              <label htmlFor="itemId">{currentLanguage === 'eng' ? 'Item :' : 'વસ્તુ :'}</label>
              <select
                id="itemId"
                name="itemId"
                value={formData.itemId}
                onChange={handleChange}
                required
              >
                <option value="">{currentLanguage === 'eng' ? 'Select Item' : 'વસ્તુ પસંદ કરો'}</option>
                {itemIds.map((itemId) => (
                  <option key={itemId} value={itemId}>
                    {currentLanguage === 'eng' ? itemsList.find(item => item.itemId === itemId)?.nameEng : itemsList.find(item => item.itemId === itemId)?.nameGuj}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label htmlFor="qty">{currentLanguage === 'eng' ? 'Quantity :' : 'જથ્થો :'}</label>
              <input
                type="text"
                id="qty"
                name="qty"
                value={formData.qty}
                onChange={handleChange}
                required
              />
            </div>

            {/* Unit (read-only) */}
            <div className="form-group">
              <label htmlFor="unit">{currentLanguage === 'eng' ? 'Unit :' : 'એકમ :'}</label>
              <input
                type="text"
                id="unit"
                name="unit"
                value={formData.unit}
                readOnly
              />
            </div>

            {/* Delivery Person Name */}
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

            {/* Delivery Person Contact */}
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

            {/* Reference */}
            <div className="form-group">
              <label htmlFor="reference">{currentLanguage === 'eng' ? 'Reference :' : 'સંદર્ભ :'}</label>
              <input
                type="text"
                id="reference"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
              />
            </div>

            {/* Remarks */}
            <div className="form-group">
              <label htmlFor="remark">{currentLanguage === 'eng' ? 'Remarks :' : 'ટિપ્પણીઓ :'}</label>
              <textarea
                id="remark"
                name="remark"
                value={formData.remark}
                onChange={handleChange}
              ></textarea>
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
