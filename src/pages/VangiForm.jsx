import React, { useState, useEffect } from 'react';
import '../styles/VangiForm.css';
import infoIcon from '../assets/information-button.png';
import languageIcon from '../assets/languages.png';
import { callAxiosApi, getTableData, addReceiveItem } from '../api_utils';

function VangiForm() {
  const [formData, setFormData] = useState({
    pradeshId: '',
    itemId: '',
    quantity: '',
    unit: '',
    deliveryPersonName: '',
    contactNumber: '',
    reference: '',
    remarks: ''
  });
  const [itemData, setItemData] = useState([]);
  const [pradeshData, setPradeshData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('eng');
  
  const handleLanguageChange = () => {
    setCurrentLanguage(prev => prev === 'eng' ? 'guj' : 'eng');
  };
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      table: "itemRec",
      itemId: parseInt(formData.itemId),
      pId: parseInt(formData.pradeshId),
      qty: formData.quantity,
      dePerson: formData.deliveryPersonName,
      dePerCont: formData.contactNumber,
      reference: formData.reference,
      remark: formData.remarks
    };

    try {
      const response = await callAxiosApi(addReceiveItem(), submissionData);
      if (response && response.data) {
        console.log('Item received successfully:', response.data);
        // Reset form or show success message
        setFormData({
          pradeshId: '',
          itemId: '',
          quantity: '',
          unit: '',
          deliveryPersonName: '',
          contactNumber: '',
          reference: '',
          remarks: ''
        });
        // You might want to show a success message to the user here
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error receiving item:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="vangi-form-container">
      <div className="vangi-form-header">
        <h1>{currentLanguage === 'eng' ? 'Harisumiran Pradesh ▼' : 'હરિસુમિરન પ્રદેશ ▼'}</h1>
        <div className="header-icons">
          <button className="icon-button">
            <img src={infoIcon} alt="Info" className="icon" />
          </button>
          <button className="icon-button" onClick={handleLanguageChange}>
            <img src={languageIcon} alt="Language" className="icon" />
          </button>
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <form onSubmit={handleSubmit} className="vangi-form">
          <div className="form-group">
            <label htmlFor="pradeshId">{currentLanguage === 'eng' ? 'Pradesh Name :' : 'પ્રદેશ નામ :'}</label>
            <select
              id="pradeshId"
              name="pradeshId"
              value={formData.pradeshId}
              onChange={handleChange}
              required
            >
              <option value="">{currentLanguage === 'eng' ? 'Select Pradesh' : 'પ્રદેશ પસંદ કરો'}</option>
              {pradeshData.map((pradesh) => (
                <option key={pradesh.pId} value={pradesh.pId}>
                  {currentLanguage === 'eng' ? pradesh.newNameEng : pradesh.newNameGuj}
                </option>
              ))}
            </select>
          </div>
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
              {itemData.map((item) => (
                <option key={item.itemId} value={item.itemId}>
                  {currentLanguage === 'eng' ? item.nameEng : item.nameGuj}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">{currentLanguage === 'eng' ? 'Quantity :' : 'જથ્થો :'}</label>
              <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="unit">{currentLanguage === 'eng' ? 'Unit :' : 'એકમ :'}</label>
              <select id="unit" name="unit" value={formData.unit} onChange={handleChange} required>
                <option value="">{currentLanguage === 'eng' ? 'Select Unit' : 'એકમ પસંદ કરો'}</option>
                <option value="Kg">Kg</option>
                <option value="Box">Box</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="deliveryPersonName">{currentLanguage === 'eng' ? 'Delivery Person Name :' : 'ડિલિવરી વ્યક્તિનું નામ :'}</label>
            <input type="text" id="deliveryPersonName" name="deliveryPersonName" value={formData.deliveryPersonName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="contactNumber">{currentLanguage === 'eng' ? 'Contact Number :' : 'સંપર્ક નંબર :'}</label>
            <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="reference">{currentLanguage === 'eng' ? 'Reference :' : 'સંદર્ભ :'}</label>
            <input type="text" id="reference" name="reference" value={formData.reference} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="remarks">{currentLanguage === 'eng' ? 'Remarks :' : 'નોંધ :'}</label>
            <input type="text" id="remarks" name="remarks" value={formData.remarks} onChange={handleChange} />
          </div>
          <button type="submit" className="submit-button">{currentLanguage === 'eng' ? 'Submit' : 'સબમિટ કરો'}</button>
        </form>
      )}
    </div>
  );
}

export default VangiForm;