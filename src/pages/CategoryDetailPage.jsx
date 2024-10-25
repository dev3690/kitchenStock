import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/CategoryDetailPage.css";
import { AuthContext } from "../context/AuthContext";
import AddItemPopup from "../components/AddItemPopup";
import PlusFormPopup from "../components/PlusFormPopup";
import MinusFormPopup from "../components/MinusFormPopup";

function CategoryDetailPage() {
  const { id } = useParams();
  const [currentLanguage, setCurrentLanguage] = useState("eng");
  const [isAddItemPopupOpen, setIsAddItemPopupOpen] = useState(false);
  const [categoryItems, setCategoryItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [grainCards, setGrainCards] = useState([
    { id: "grain1", nameEng: "Rice", nameGuj: "ચોખા", quantity: 0 },
    { id: "grain2", nameEng: "Wheat", nameGuj: "ઘઉં", quantity: 0 },
    { id: "grain6", nameEng: "ButterMilk", nameGuj: "છાશ", quantity: 0 },
    { id: "grain3", nameEng: "Millet", nameGuj: "બાજરી", quantity: 0 },
    { id: "grain4", nameEng: "Barley", nameGuj: "જવ", quantity: 0 },
    { id: "grain7", nameEng: "Corn", nameGuj: "મકાઈ", quantity: 0 },
    { id: "grain5", nameEng: "Oats", nameGuj: "ઓટ્સ", quantity: 0 },
    { id: "grain8", nameEng: "Potatoes", nameGuj: "બટાકા", quantity: 0 },
  ]);
  const [isPlusFormPopupOpen, setIsPlusFormPopupOpen] = useState(false);
  const [selectedGrainCard, setSelectedGrainCard] = useState(null);
  const [isMinusFormPopupOpen, setIsMinusFormPopupOpen] = useState(false);

  useEffect(() => {
    const mockCategories = [
    ];
    setCategories(mockCategories);
    const category = mockCategories.find((c) => c.id === parseInt(id));
    if (category) {
      setCategoryItems(category.items);
    }
  }, [id]);

  const handleOpenAddItemPopup = (itemId, itemName) => {
    setSelectedItem({ id: itemId, name: itemName });
    setIsAddItemPopupOpen(true);
  };

  const handleLanguageChange = () => {
    setCurrentLanguage((prev) => (prev === "eng" ? "guj" : "eng"));
  };

  const handleAddItem = (newItem) => {
    setCategoryItems((prevItems) => [
      ...prevItems,
      {
        id: Date.now(),
        nameEng: newItem.itemName,
        nameGuj: newItem.itemName,
        quantity: newItem.quantity,
        unit: newItem.unit,
      },
    ]);
  };

  const handleQuantityChange = (id, change) => {
    if (change > 0) {
      const selectedCard = grainCards.find((card) => card.id === id);
      setSelectedGrainCard(selectedCard);
      setIsPlusFormPopupOpen(true);
    } else {
      const selectedCard = grainCards.find((card) => card.id === id);
      setSelectedGrainCard(selectedCard);
      setIsMinusFormPopupOpen(true);
    }
  };

  const handlePlusFormSubmit = (newItem) => {
    setGrainCards((prevCards) =>
      prevCards.map((card) =>
        card.id === selectedGrainCard.id
          ? { ...card, quantity: card.quantity + newItem.quantity }
          : card
      )
    );
    setIsPlusFormPopupOpen(false);
  };

  const handleMinusFormSubmit = (newItem) => {
    setGrainCards((prevCards) =>
      prevCards.map((card) =>
        card.id === selectedGrainCard.id
          ? { ...card, quantity: Math.max(0, card.quantity - newItem.quantity) }
          : card
      )
    );
    setIsMinusFormPopupOpen(false);
  };

  return (
    <div className="category-detail-container">
      <div className="category-detail-header">
        <h1>
          {currentLanguage === "eng"
            ? // categories.find(c => c.id === parseInt(id))?.nameEng
              "Grains"
            : // categories.find(c => c.id === parseInt(id))?.nameGuj}
              "અનાજ"}
        </h1>
        <button className="icon-button" style={{}} onClick={handleLanguageChange}>
          <img
            src="/assets/languages.png"
            alt="Change Language"
            className="icon"
            style={{width: "50px", height: "50px"}} 
          />
        </button>
      </div>
      <div className="card-container">
        {grainCards.map((card) => (
          <div
            key={card.id}
            className="card"
            style={{ backgroundColor: "#FFFFFF66" }}
          >
            <div className="card-header">
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(card.id, 1)}
                style={{fontSize: "102px"}}
              >
                <img src="/assets/add.png" alt="Increase" className="icon"   />
              </button>
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(card.id, -1)}
              >
                <img
                  src="/assets/minus.png"
                  alt="Decrease"
                  className="icon"

                />
              </button>
            </div>
            <h2
              className="card-title"
              style={{
                color: "#333333",
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              {currentLanguage === "eng" ? card.nameEng : card.nameGuj}
            </h2>
            <p className="card-quantity">{card.quantity}</p>
          </div>
        ))}
      </div>
      <AddItemPopup
        isOpen={isAddItemPopupOpen}
        onClose={() => setIsAddItemPopupOpen(false)}
        onSubmit={handleAddItem}
        categoryId={id}
        categoryName={
          currentLanguage === "eng"
            ? categories.find((c) => c.id === parseInt(id))?.nameEng
            : categories.find((c) => c.id === parseInt(id))?.nameGuj
        }
        currentLanguage={currentLanguage}
      />
      <PlusFormPopup
        isOpen={isPlusFormPopupOpen}
        onClose={() => setIsPlusFormPopupOpen(false)}
        onSubmit={handlePlusFormSubmit}
        itemName={
          selectedGrainCard
            ? currentLanguage === "eng"
              ? selectedGrainCard.nameEng
              : selectedGrainCard.nameGuj
            : ""
        }
        defaultUnit="kg"
        currentLanguage={currentLanguage}
      />
      <MinusFormPopup
        isOpen={isMinusFormPopupOpen}
        onClose={() => setIsMinusFormPopupOpen(false)}
        onSubmit={handleMinusFormSubmit}
        itemName={
          selectedGrainCard
            ? currentLanguage === "eng"
              ? selectedGrainCard.nameEng
              : selectedGrainCard.nameGuj
            : ""
        }
        defaultUnit="kg"
        currentLanguage={currentLanguage}
      />
    </div>
  );
}

export default CategoryDetailPage;
