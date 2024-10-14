import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/DetailPradeshPage.css';
import addIcon from '../assets/add.png';
import infoIcon from '../assets/information-button.png';
import languageIcon from '../assets/languages.png';
import AddItemPopup from '../components/AddItemPopup';
import { callAxiosApi, getPradeshItemsDetails } from '../api_utils';

function DetailPradeshPage() {
  const { id } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pradeshData, setPradeshData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPradeshData = async () => {
    try {
      const response = await callAxiosApi(getPradeshItemsDetails(id), { pradeshId: id });
      setPradeshData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching pradesh item details:", error);
      setError("Failed to load pradesh details. Please try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPradeshData();
  }, [id]);

  const handleAddItem = (newItem) => {
    setPradeshData(prevData => {
      const formattedNewItem = {
        itemId: newItem.itemId,
        nameEng: newItem.nameEng || 'Unknown Item',
        totalReceived: 0,
        totalAssigned: newItem.qty,
        unit: newItem.unit
      };
  
      const updatedItems = prevData.items.map(item => 
        item.itemId === formattedNewItem.itemId 
          ? { ...item, totalAssigned: parseInt(item.totalAssigned) + parseInt(formattedNewItem.totalAssigned) }
          : item
      );
  
      if (!updatedItems.some(item => item.itemId === formattedNewItem.itemId)) {
        updatedItems.push(formattedNewItem);
      }
  
      return { ...prevData, items: updatedItems };
    });
    fetchPradeshData(); // Refetch data after adding new item
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="detail-pradesh-container">
      <div className="detail-pradesh-header">
        <h1>{pradeshData.newNameEng}</h1>
        <div className="header-icons">
          <button className="icon-button" onClick={() => setIsPopupOpen(true)}>
            <img src={addIcon} alt="Plus" className="icon" height={20} width={20} />
          </button>
          <button className="icon-button">
            <img src={infoIcon} alt="Info" className="icon" />
          </button>
          <button className="icon-button">
            <img src={languageIcon} alt="Language" className="icon" />
          </button>
        </div>
      </div>
      <div className="pradesh-info">
        <p>{pradeshData.pSantEng}</p>
        <p>Contact No : {pradeshData.contPersonNo || 'N/A'}</p>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Item List</th>
              <th>Receive/Assign</th>
              <th>Unit ▼</th>
            </tr>
          </thead>
          <tbody>
            {pradeshData.items.map((item, index) => (
              <tr key={item.itemId}>
                <td>{index + 1}</td>
                <td>{item.nameEng}</td>
                <td>{`${item.totalReceived}/${item.totalAssigned}`}</td>
                <td>{item.unit || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddItemPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleAddItem}
      />
    </div>
  );
}

export default DetailPradeshPage;
