import React from "react";
// import "./FilterPanel.css";

const FilterPanel = ({
  selectedMode,
  onModeChange,
  selectedSpecialties,
  onSpecialtyChange,
  sortOption,
  onSortChange,
}) => {
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

  return (
    <div className="filter-panel">
      <div>
        <h3 data-testid="filter-header-moc">Consultation Mode</h3>
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
      </div>

      <div>
        <h3 data-testid="filter-header-speciality">Speciality</h3>
        {specialties.map((spec) => {
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

      <div>
        <h3 data-testid="filter-header-sort">Sort</h3>
        <label>
          <input
            type="radio"
            name="sort"
            value="fees"
            checked={sortOption === "fees"}
            onChange={() => onSortChange("fees")}
            data-testid="sort-fees"
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
            data-testid="sort-experience"
          />
          Experience (High to Low)
        </label>
      </div>
    </div>
  );
};

export default FilterPanel;
