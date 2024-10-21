import React from 'react';
import '../styles/InfoPopup.css';

function InfoPopup({ isOpen, onClose, pradeshData, currentLanguage }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.className === 'info-popup-overlay') {
      onClose();
    }
  };

  const detailsToShow = [
    // { label: { eng: 'Old Name', guj: 'જૂનું નામ' }, value: { eng: 'lastNameEng', guj: 'lastNameGuj' } },
    { label: { eng: 'New Name', guj: 'નવું નામ' }, value: { eng: 'newNameEng', guj: 'newNameGuj' } },
    { label: { eng: 'Sant', guj: 'સંત' }, value: { eng: 'pSantEng', guj: 'pSantGuj' } },
    // { label: { eng: 'Contact Person', guj: 'સંપર્ક વ્યક્તિ' }, value: { eng: 'contPerson', guj: 'contPerson' } },
    // { label: { eng: 'Contact Number', guj: 'સંપર્ક નંબર' }, value: { eng: 'contPersonNo', guj: 'contPersonNo' } },
    { label: { eng: 'Total Assigned', guj: 'કુલ સોંપાયેલ' }, value: { eng: 'totalAssigned', guj: 'totalAssigned' } },
    { label: { eng: 'Total Received', guj: 'કુલ પ્રાપ્ત' }, value: { eng: 'totalReceived', guj: 'totalReceived' } },
  ];

  return (
    <div className="info-popup-overlay" onClick={handleOverlayClick}>
      <div className="info-popup-content">
        {/* <button className="close-button" onClick={onClose}>&times;</button> */}
        <h2>{currentLanguage === 'eng' ? 'Pradesh Information' : 'પ્રદેશ માહિતી'}</h2>
        {detailsToShow.map((detail, index) => (
          <div key={index} className="info-item">
            <span className="info-label">{detail.label[currentLanguage]}:</span>
            <span className="info-value">{pradeshData[detail.value[currentLanguage]] || 'N/A'}</span>
          </div>
        ))}
        <button className="cancel-button" style={{marginLeft: "25%"}} onClick={onClose}>
          {currentLanguage === 'eng' ? 'Close' : 'બંધ કરો'}
        </button>
      </div>
    </div>
  );
}

export default InfoPopup;
