import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardPage.css";
import { dashboardApi, callAxiosApi, getPradeshItemsDetails, downloadPradeshReceivedItems } from "../api_utils";
import { AuthContext } from '../context/AuthContext';
import AddItemPopup from '../components/AddItemPopup';

function DashboardPage({ changeLanguage, language }) {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);
  const { logout, userRole } = useContext(AuthContext);
  const [currentLanguage, setCurrentLanguage] = useState('eng');
  const [isAddItemPopupOpen, setIsAddItemPopupOpen] = useState(false);
  const [selectedPradeshId, setSelectedPradeshId] = useState(null);
  const [selectedPradeshName, setSelectedPradeshName] = useState(null);

  const handleOpenAddItemPopup = (pradeshId, pradeshName) => {
    setSelectedPradeshId(pradeshId);
    setSelectedPradeshName(pradeshName);
    setIsAddItemPopupOpen(true);
  };
  useEffect(() => {
    const fetchPradeshData = async () => {
      try {
        const response = await callAxiosApi(dashboardApi);
        const pradeshData = response.data.data;
        setCardData(pradeshData);
        console.log(pradeshData);
      } catch (error) {
        console.error("Error fetching pradesh data:", error);
      }
    };
    fetchPradeshData();
  }, []);

  const handleDownload = async () => {
    try {
      console.log('Download button clicked');
      const response = await callAxiosApi(downloadPradeshReceivedItems(), {}, 'arraybuffer');

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'pradesh_received_items.xlsx';
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading Pradesh received items:", error);
    }
  };

  const handleCardClick = (pradeshId) => {
    navigate(`/detail/${pradeshId}`);
  };
  const handleLanguageChange = () => {
    setCurrentLanguage(prev => prev === 'eng' ? 'guj' : 'eng');
  };

  const refreshDashboardData = async () => {
    try {
      const response = await callAxiosApi(dashboardApi);
      if (response.data && response.data.data) {
        setCardData(response.data.data);
      }
    } catch (error) {
      console.error("Error refreshing dashboard data:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-icons left-icons">
        </div>
        <h1 className="dashboard-header-name">Annakut Mahotsav 2024</h1>
        <div className="header-icons right-icons">
          <button className="icon-button" onClick={handleLanguageChange}>
            <img
              src="/assets/languages.png"
              alt="Change Language"
              style={{ backgroundColor: '#F0D1AF' }}
              className="icon"
            />
          </button>
          <button className="icon-button" onClick={logout}>
            {/* <img src="/assets/logout.png" alt="Logout" className="icon" style={{ backgroundColor: '#F0D1AF' }} /> */}
            <img src="/assets/logout.png" alt="Logout" className="icon" style={{ backgroundColor: '#F0D1AF' }} />
          </button>
        </div>
      </div>
      <div className="card-container">
        {cardData.map((pradesh, index) => (
          <div
            key={pradesh.pId || index}
            className="card"
            onClick={() => handleCardClick(pradesh.pId)}
            style={{ backgroundColor: '#FFFFFF66' }}
          >
            <div className="card-header">
              {userRole === true && (
                <button className="assign-button" onClick={(e) => {
                  e.stopPropagation();    
                  handleOpenAddItemPopup(pradesh.pId, currentLanguage === 'eng' ? pradesh.lastNameEng : pradesh.lastNameGuj);
                }}>
                  <img src="/assets/add1.png" alt="Assign Items" className="icon" />
                </button>
              )}
            </div>
            <h2 className="card-title" style={{ color: '#333333' }}>
              {currentLanguage === 'eng' ? (pradesh.lastNameEng || "Pradesh Name") : (pradesh.lastNameGuj || "પ્રદેશ નામ")}
            </h2>
            <div className="circular-progress">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray={`${Math.min(pradesh.receivedPercentage, 100)}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="18" className="percentage-text" style={{ fill: '#333333' }}>
                  <tspan x="18" dy="-0.2em" className="percentage-value">
                    {Math.round(pradesh.receivedPercentage)}%
                  </tspan>
                  <tspan x="18" dy="1.6em" className="quantity-text">
                    {pradesh.totalReceivedQty}/{pradesh.totalAssignedQty}
                  </tspan>
                </text>
              </svg>
            </div>
            <p className="card-title-sant" style={{ color: '#333333' }}>
              {currentLanguage === 'eng' ? (pradesh.pSantEng || "Pradesh Sant Name") : (pradesh.pSantGuj || "પ્રદેશ સંત નામ")}
            </p>
          </div>
        ))}
      </div>
      <button className="floating-download-button" onClick={handleDownload}>
        <img
          src="/assets/download.png"
          alt="Download"
          className="download-icon"
        />
      </button>
      <AddItemPopup
        isOpen={isAddItemPopupOpen}
        onClose={() => setIsAddItemPopupOpen(false)}
        onSubmit={(newItem) => {
          console.log('New item assigned:', newItem);
          setCardData(prevCardData => {
            return prevCardData.map(card => {
              if (card.pId === selectedPradeshId) {
                return {
                  ...card,
                  ...newItem.updatedData
                };
              }
              return card;
            });
          });
          setIsAddItemPopupOpen(false);
          refreshDashboardData();
        }}
        pradeshId={selectedPradeshId}
        pradeshName={selectedPradeshName}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}

export default DashboardPage;
