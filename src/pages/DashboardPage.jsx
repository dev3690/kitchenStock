import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardPage.css";
import { dashboardApi, callAxiosApi } from "../api_utils";
import { AuthContext } from '../context/AuthContext';

function DashboardPage({ changeLanguage, language }) {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);
  const { logout } = useContext(AuthContext);

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

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-header-name">Annakut Mahotsav 2024</h1>
        <div className="header-icons">
          <button className="icon-button" onClick={changeLanguage}>
            <img
              src="src\assets\languages.png"
              alt="Change Language"
              className="icon"
            />
          </button>
          <button className="icon-button" onClick={logout}>
            <img src="src\assets\logout.png" alt="Logout" className="icon" />
          </button>
        </div>
      </div>
      <div className="card-container">
        {cardData.map((pradesh, index) => (
          <div
            key={pradesh.pId || index}
            className="card"
            onClick={() => navigate(`/detail/${pradesh.pId}`)}
          >
            <h2 className="card-title">{pradesh.newNameEng || "Pradesh Name"}</h2>
            <p>{pradesh.pSantEng || "Pradesh Sant Name"}</p>
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
              Contact Person: {pradesh.contPerson || "N/A"}
              <br />
              Contact Number: {pradesh.contPersonNo || "N/A"}
            </p>
          </div>
        ))}
      </div>
      <button className="floating-download-button">
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
