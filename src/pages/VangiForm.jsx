import React, { useState } from 'react';
import '../styles/VangiForm.css';
import infoIcon from '../assets/information-button.png';
import languageIcon from '../assets/languages.png';

function VangiForm() {
  const [formData, setFormData] = useState({
    srNo: '',
    name: '',
    item: '',
    quantity: '',
    unit: '',
    deliveryPersonName: '',
    contactNumber: '',
    reference: '',
    remarks: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission here
  };

  return (
    <div className="vangi-form-container">
      <div className="vangi-form-header">
        <h1>Harisumiran Pradesh ▼</h1>
        <div className="header-icons">
          <button className="icon-button">
            <img src={infoIcon} alt="Info" className="icon" />
          </button>
          <button className="icon-button">
            <img src={languageIcon} alt="Language" className="icon" />
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="vangi-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="srNo">Sr No :</label>
            <input type="text" id="srNo" name="srNo" value={formData.srNo} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name :</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="item">Item :</label>
          <select id="item" name="item" value={formData.item} onChange={handleChange}>
            <option value="">Select Item</option>
            {/* Add item options here */}
          </select>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="quantity">Quantity :</label>
            <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="unit">Unit :</label>
            <select id="unit" name="unit" value={formData.unit} onChange={handleChange}>
              <option value="">Select Unit</option>
              {/* Add unit options here */}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="deliveryPersonName">Delivery Person Name :</label>
          <input type="text" id="deliveryPersonName" name="deliveryPersonName" value={formData.deliveryPersonName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number :</label>
          <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="reference">Reference :</label>
          <input type="text" id="reference" name="reference" value={formData.reference} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="remarks">Remarks :</label>
          <input type="text" id="remarks" name="remarks" value={formData.remarks} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default VangiForm;

