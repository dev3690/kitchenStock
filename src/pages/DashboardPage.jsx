import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardPage.css";
import { dashboardApi, callAxiosApi, getPradeshItemsDetails, downloadPradeshReceivedItems } from "../api_utils";
import { AuthContext } from '../context/AuthContext';

function DashboardPage({ changeLanguage, language }) {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);
  const { logout } = useContext(AuthContext);
  const [currentLanguage, setCurrentLanguage] = useState('eng');

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
      // You may want to show an error message to the user here
    }
  };

  const handleCardClick = async (pradeshId) => {
    try {
      const response = await callAxiosApi(getPradeshItemsDetails(pradeshId), { pradeshId });
      console.log('Pradesh Item Details:', response.data);
      navigate(`/detail/${pradeshId}`);
    } catch (error) {
      console.error("Error fetching pradesh item details:", error);
    }
  };
  const handleLanguageChange = () => {
    setCurrentLanguage(prev => prev === 'eng' ? 'guj' : 'eng');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-header-name">Annakut Mahotsav 2024</h1>
        <div className="header-icons">
          <button className="icon-button" onClick={handleLanguageChange}>
            <img
              src="/assets/languages.png"
              alt="Change Language"
              className="icon"
            />
          </button>
          <button className="icon-button" onClick={logout}>
            <img src="/assets/logout.png" alt="Logout" className="icon" />
          </button>
        </div>
      </div>
      <div className="card-container">
        {cardData.map((pradesh, index) => (
          <div
            key={pradesh.pId || index}
            className="card"
            onClick={() => handleCardClick(pradesh.pId)}
          >
            <h2 className="card-title">
              {currentLanguage === 'eng' ? (pradesh.newNameEng || "Pradesh Name") : (pradesh.newNameGuj || "પ્રદેશ નામ")}
            </h2>
            <p>{currentLanguage === 'eng' ? (pradesh.pSantEng || "Pradesh Sant Name") : (pradesh.pSantGuj || "પ્રદેશ સંત નામ")}</p>
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
                  strokeDasharray={`${(pradesh.totalReceived / pradesh.totalAssigned) * 100 || 0}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">
                  {pradesh.totalReceived}/{pradesh.totalAssigned}
                </text>
              </svg>
            </div>
            <p className="card-details">
              {currentLanguage === 'eng' ? 'Contact Person: ' : 'સંપર્ક વ્યક્તિ: '}{pradesh.contPerson || "N/A"}
              <br />
              {currentLanguage === 'eng' ? 'Contact Number: ' : 'સંપર્ક નંબર: '}{pradesh.contPersonNo || "N/A"}
            </p>
          </div>
        ))}
      </div>
     <button className="floating-download-button" onClick={handleDownload}>
  <img
    src="src\assets\downloads.png"
    alt="Download"
    className="download-icon"
  />
</button>
    </div>
  );
}

export default DashboardPage;
