import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardPage.css";
import { AuthContext } from '../context/AuthContext';
import AddItemPopup from '../components/AddItemPopup';
import { FaSearch } from 'react-icons/fa';
import Header from '../components/Header';

function DashboardPage({ changeLanguage, language }) {
  const navigate = useNavigate();
  // const { logout, userRole } = useContext(AuthContext);
  const [currentLanguage, setCurrentLanguage] = useState('eng');
  const [isAddItemPopupOpen, setIsAddItemPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  const categories = [
    { id: 1, nameEng: "Grains", nameGuj: "અનાજ" },
    { id: 2, nameEng: "Dairy Products", nameGuj: "દૂધની વસ્તુઓ" },
    { id: 3, nameEng: "Vegetables", nameGuj: "શાકભાજી" },
    { id: 4, nameEng: "Fruits", nameGuj: "ફળો" },
    { id: 5, nameEng: "Spices", nameGuj: "મસાલા" },
    { id: 6, nameEng: "Oils", nameGuj: "તેલ" },
    { id: 7, nameEng: "Snacks", nameGuj: "નાસ્તો" },
    { id: 8, nameEng: "Miscellaneous", nameGuj: "વિવિધ" },
  ];
  const [filteredCategories, setFilteredCategories] = useState(categories);
  
  const handleOpenAddItemPopup = (categoryId, categoryName) => {
    setSelectedCategory({ id: categoryId, name: categoryName });
    setIsAddItemPopupOpen(true);
  };

  const handleCardClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };
  const handlelogout = () => {
    navigate(`/login`);
  };

  const handleLanguageChange = () => {  
    setCurrentLanguage(prev => prev === 'eng' ? 'guj' : 'eng');
  };

  const handleFilter = () => {
    const filtered = categories.filter(category => {
      const matchesSearch = 
        category.nameEng.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.nameGuj.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterType === 'all') return matchesSearch;
      if (filterType === 'category') return matchesSearch;
      if (filterType === 'item') {
        // Assuming each category has an 'items' array. If not, you'll need to adjust this logic.
        return category.items && category.items.some(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return false;
    });
    setFilteredCategories(filtered);
  };

    useEffect(() => {
      handleFilter();
    }, [searchTerm, filterType]);

  return (
    <div className="dashboard-container">
      <Header 
        currentLanguage={currentLanguage} 
        handleLanguageChange={handleLanguageChange}
      />
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder={currentLanguage === 'eng' ? "Search..." : "     શોધો..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
      </div>
      <div className="card-container">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="card"
            onClick={() => handleCardClick(category.id)}
            style={{ backgroundColor: '#ffffff' }}
          >
            <div className="card-header">
              {/* {userRole === true && ( */}
                <button className="assign-button" onClick={(e) => {
                  e.stopPropagation();    
                  handleOpenAddItemPopup(category.id, currentLanguage === 'eng' ? category.nameEng : category.nameGuj);
                }}> 
                  <img src="/assets/new1.png" alt="Add Items" className="icon"  style={{ width: "35px", height: "35px"}} />
                </button>
              {/* )} */}
            </div>
            <h2 className="card-title" style={{ color: '#333333', fontSize: '1.5rem', textAlign: 'center' }}>
              {currentLanguage === 'eng' ? category.nameEng : category.nameGuj}
            </h2>
          </div>
        ))}
      </div>
      <AddItemPopup
        isOpen={isAddItemPopupOpen}
        onClose={() => setIsAddItemPopupOpen(false)}
        onSubmit={(newItem) => {
          console.log('New item added:', newItem);
          setIsAddItemPopupOpen(false);
          // You may want to refresh the data or update the state here
        }}
        categoryId={selectedCategory?.id}
        categoryName={selectedCategory?.name}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}

export default DashboardPage;
