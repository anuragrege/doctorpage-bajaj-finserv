import React, { useState } from "react";
import "./FilterPanel.css";

const FilterPanel = ({
  selectedMode,
  onModeChange,
  selectedSpecialties,
  onSpecialtyChange,
  sortOption,
  onSortChange,
  clearFilters,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const specialties = [
    "General Physician",
    "Dentist",
    "Dermatologist",
    "Paediatrician",
    "Gynaecologist",
    "ENT",
    "Diabetologist",
    "Cardiologist",
    "Physiotherapist",
    "Endocrinologist",
    "Orthopaedic",
    "Ophthalmologist",
    "Gastroenterologist",
    "Pulmonologist",
    "Psychiatrist",
    "Urologist",
    "Dietitian/Nutritionist",
    "Psychologist",
    "Sexologist",
    "Nephrologist",
    "Neurologist",
    "Oncologist",
    "Ayurveda",
    "Homeopath",
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const filteredSpecialties = specialties.filter((spec) =>
    spec.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="filter-panel">
      <div className="sort-box">
        <div className="sort-header" onClick={toggleDropdown}>
          <h3>Sort</h3>
          <i
            className={`fa ${dropdownOpen ? "fa-arrow-up" : "fa-arrow-down"}`}
          ></i>
        </div>
        {dropdownOpen && (
          <div className="sort-options">
            <label>
              <input
                type="radio"
                name="sort"
                value="fees"
                checked={sortOption === "fees"}
                onChange={() => onSortChange("fees")}
              />
              Fees (Low to High)
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="experience"
                checked={sortOption === "experience"}
                onChange={() => onSortChange("experience")}
              />
              Experience (High to Low)
            </label>
          </div>
        )}
      </div>

      <div className="filter-box">
        <div className="filter-header">
          <h3>Speciality</h3>
          <button className="clear-filters" onClick={clearFilters}>
            Clear All
          </button>
        </div>
        <input
          type="text"
          className="specialty-search"
          placeholder="Search Specialities"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="scrollbar">
          {filteredSpecialties.map((spec) => {
            const id = spec.replace(/\s+|\/|-/g, "-");
            return (
              <label key={spec}>
                <input
                  type="checkbox"
                  checked={selectedSpecialties.includes(spec)}
                  onChange={() => onSpecialtyChange(spec)}
                  data-testid={`filter-specialty-${id}`}
                />
                {spec}
              </label>
            );
          })}
        </div>
      </div>

      <div className="mode-box">
        <h3>Consultation Mode</h3>
        <label>
          <input
            type="radio"
            name="mode"
            value="video"
            checked={selectedMode === "video"}
            onChange={() => onModeChange("video")}
            data-testid="filter-video-consult"
          />
          Video Consult
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="clinic"
            checked={selectedMode === "clinic"}
            onChange={() => onModeChange("clinic")}
            data-testid="filter-in-clinic"
          />
          In Clinic
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="all"
            checked={selectedMode === "all"}
            onChange={() => onModeChange("all")}
            data-testid="filter-all"
          />
          All
        </label>
      </div>
    </div>
  );
};

export default FilterPanel;
