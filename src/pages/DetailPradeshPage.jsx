import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/DetailPradeshPage.css';
import addIcon from '../assets/add.png';
import infoIcon from '../assets/information-button.png';
import languageIcon from '../assets/languages.png';
import AddItemPopup from '../components/AddItemPopup';

function DetailPradeshPage() {
  const { id } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Mock data - replace with actual data fetching logic
  const pradeshData = {
    title: 'Harisumiran Pradesh',
    guruprasad: 'Guruprasad swami',
    contact: '9648264578',
    items: [
      { srNo: 1, itemList: 'samosa', receiveAssign: '7/12', unit: 'Kg' },
      { srNo: 2, itemList: 'Thepla', receiveAssign: '8/15', unit: 'Box' },
      { srNo: 3, itemList: 'Masala Puri', receiveAssign: '7/16', unit: 'Kg' },
      { srNo: 4, itemList: 'Bhel', receiveAssign: '8/56', unit: 'Box' },
      { srNo: 5, itemList: 'samosa', receiveAssign: '7/12', unit: 'Kg' },
      { srNo: 6, itemList: 'Thepla', receiveAssign: '8/15', unit: 'Box' },
      { srNo: 7, itemList: 'Masala Puri', receiveAssign: '7/16', unit: 'Kg' },
      { srNo: 8, itemList: 'Bhel', receiveAssign: '8/56', unit: 'Box' },
    ]
  };

  const handleAddItem = (newItem) => {
    // Handle adding the new item to the list
    console.log('New item:', newItem);
  };

  return (
    <div className="detail-pradesh-container">
      <div className="detail-pradesh-header">
        <h1>{pradeshData.title}</h1>
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
        <p>{pradeshData.guruprasad}</p>
        <p>Contact No : {pradeshData.contact}</p>
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
            {pradeshData.items.map((item) => (
              <tr key={item.srNo}>
                <td>{item.srNo}</td>
                <td>{item.itemList}</td>
                <td>{item.receiveAssign}</td>
                <td>{item.unit}</td>
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
