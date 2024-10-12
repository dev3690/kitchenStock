import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardPage.css';

function DashboardPage({ logout, changeLanguage }) {
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const cardData = [
    { title: 'Harisumiran Pradesh', score: 7, contact: '9648264578' },
    { title: 'Harisumiran Pradesh', score: 7, contact: '9648264578' },
    { title: 'Harisumiran Pradesh', score: 7, contact: '9648264578' },
    { title: 'Harisumiran Pradesh', score: 7, contact: '9648264578' },
    { title: 'Harisumiran Pradesh', score: 7, contact: '9648264578' },
    { title: 'Harisumiran Pradesh', score: 7, contact: '9648264578' },
    { title: 'Harisumiran Pradesh', score: 7, contact: '9648264578' },
    { title: 'Harisumiran Pradesh', score: 7, contact: '9648264578' },
    { title: 'Harisumiran Pradesh', score: 7, contact: '9648264578' },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-header-name">Annakut Mahotsav 2024</h1>
        <div className="header-icons">
          <button className="icon-button" onClick={changeLanguage}>
            <img src="src\assets\languages.png" alt="Change Language" className="icon" />
          </button>
          <button className="icon-button" onClick={logout}>
            <img src="src\assets\logout.png" alt="Logout" className="icon" />
          </button>
        </div>
      </div>
      <div className="card-container">
        {cardData.map((card, index) => (
          <div key={index} className="card" onClick={() => navigate(`/detail/${index + 1}`)}>
            <h2 className="card-title">{card.title}</h2>
            <div className="circular-progress">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                  strokeDasharray={`${card.score * 10}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{card.score}/10</text>
              </svg>
            </div>
            <p className="card-details">Guruprasad swami<br />Contact no : {card.contact}</p>
          </div>
        ))}
      </div>
      <button className="floating-download-button">
        <img src="src\assets\downloads.png" alt="Download" className="download-icon" />
      </button>
    </div>
  );
}

export default DashboardPage;
