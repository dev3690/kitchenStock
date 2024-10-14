import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/DetailPradeshPage.css';
import addIcon from '../assets/add.png';
import infoIcon from '../assets/information-button.png';
import languageIcon from '../assets/languages.png';
import AddItemPopup from '../components/AddItemPopup';
import { callAxiosApi, getPradeshItemsDetails } from '../api_utils';
import InfoPopup from '../components/InfoPopup';

function DetailPradeshPage() {
  const { id } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pradeshData, setPradeshData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('eng');
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
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
  const handleLanguageChange = () => {
    setCurrentLanguage(prev => prev === 'eng' ? 'guj' : 'eng');
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
        <h1>{currentLanguage === 'eng' ? pradeshData.newNameEng : pradeshData.newNameGuj}</h1>
        <div className="header-icons">
          <button className="icon-button" onClick={() => setIsPopupOpen(true)}>
            <img src={addIcon} alt="Plus" className="icon" height={20} width={20} />
          </button>
          <button className="icon-button" onClick={() => setIsInfoPopupOpen(true)}>
            <img src={infoIcon} alt="Info" className="icon" />
          </button>
          <button className="icon-button" onClick={handleLanguageChange}>
            <img src={languageIcon} alt="Language" className="icon" />
          </button>
        </div>
      </div>
      <div className="pradesh-info">
        <p>{currentLanguage === 'eng' ? pradeshData.pSantEng : pradeshData.pSantGuj}</p>
        <p>{currentLanguage === 'eng' ? 'Contact No : ' : 'સંપર્ક નંબર : '}{pradeshData.contPersonNo || 'N/A'}</p>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>{currentLanguage === 'eng' ? 'Sr No' : 'ક્રમ સંખ્યા'}</th>
              <th>{currentLanguage === 'eng' ? 'Item List' : 'વસ્તુ સૂચિ'}</th>
              <th>{currentLanguage === 'eng' ? 'Receive/Assign' : 'પ્રાપ્ત/સોંપણી'}</th>
              <th>{currentLanguage === 'eng' ? 'Unit ▼' : 'એકમ ▼'}</th>
            </tr>
          </thead>
          <tbody>
            {pradeshData.items.map((item, index) => (
              <tr key={item.itemId}>
                <td>{index + 1}</td>
                <td>{currentLanguage === 'eng' ? item.nameEng : item.nameGuj}</td>
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
      <InfoPopup
        isOpen={isInfoPopupOpen}
        onClose={() => setIsInfoPopupOpen(false)}
        pradeshData={{
          ...pradeshData,
          totalAssigned: pradeshData.items.reduce((sum, item) => sum + parseInt(item.totalAssigned), 0),
          totalReceived: pradeshData.items.reduce((sum, item) => sum + parseInt(item.totalReceived), 0)
        }}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}

export default DetailPradeshPage;
