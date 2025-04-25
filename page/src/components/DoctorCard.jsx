import React from "react";
import "./DoctorCard.css";

const DoctorCard = ({ doctor }) => {
  if (!doctor) {
    return null;
  }

  const { photo, name, specialities, experience, fees, clinic } = doctor;

  return (
    <div className="doctor-card" data-testid="doctor-card">
      <img src={photo} alt={name} className="doctor-photo" />

      <div className="doctor-info">
        <h2 data-testid="doctor-name">{name}</h2>

        <p data-testid="doctor-specialty">
          {specialities ? specialities.map((s) => s.name).join(", ") : "N/A"}
        </p>

        <p data-testid="doctor-experience">{experience}</p>

        <p data-testid="doctor-fee">{fees}</p>

        {clinic && <p className="clinic-name">{clinic.name}</p>}
      </div>
    </div>
  );
};

export default DoctorCard;
