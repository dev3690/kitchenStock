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
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <form onSubmit={handleSubmit} className="vangi-form">
          <div className="form-group">
            <label htmlFor="pradeshId">Pradesh Name :</label>
            <select
              id="pradeshId"
              name="pradeshId"
              value={formData.pradeshId}
              onChange={handleChange}
              required
            >
              <option value="">Select Pradesh</option>
              {pradeshData.map((pradesh) => (
                <option key={pradesh.pId} value={pradesh.pId}>
                  {pradesh.newNameEng}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="itemId">Item :</label>
            <select
              id="itemId"
              name="itemId"
              value={formData.itemId}
              onChange={handleChange}
              required
            >
              <option value="">Select Item</option>
              {itemData.map((item) => (
                <option key={item.itemId} value={item.itemId}>
                  {item.nameEng}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">Quantity :</label>
              <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="unit">Unit :</label>
              <select id="unit" name="unit" value={formData.unit} onChange={handleChange} required>
                <option value="">Select Unit</option>
                <option value="Kg">Kg</option>
                <option value="Box">Box</option>
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
      )}
    </div>
  );
}

export default VangiForm;
