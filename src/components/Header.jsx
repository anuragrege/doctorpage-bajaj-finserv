import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = ({ doctors, onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (inputValue.trim()) {
      const matches = doctors
        .filter((doc) =>
          doc.name.toLowerCase().includes(inputValue.toLowerCase())
        )
        .slice(0, 3);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, doctors]);

  const handleSelect = (name) => {
    setInputValue(name);
    setShowSuggestions(false);
    onSearch(name);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
      setShowSuggestions(false);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(inputValue);
          }}
        >
          <input
            type="text"
            className="search-input"
            placeholder="Search Symptoms, Doctors, Specialists, Clinics"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            data-testid="autocomplete-input"
          />
          <button
            type="submit"
            className="search-button"
            data-testid="search-button"
          >
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((doc) => (
            <li
              key={doc.id}
              onClick={() => handleSelect(doc.name)}
              data-testid="suggestion-item"
            >
              <div className="suggestion-item">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="suggestion-photo"
                />
                <div className="suggestion-info">
                  <div className="suggestion-name">{doc.name}</div>
                  <div className="suggestion-specialty">
                    {doc.specialities[0].name.toUpperCase()}
                  </div>
                </div>
                <i className="fa fa-arrow-right suggestion-arrow"></i>
              </div>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
