import React from "react";
// import "./DoctorCard.css";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card" data-testid="doctor-card">
      <img src={doctor.photo} alt={doctor.name} className="doctor-photo" />

      <div className="doctor-info">
        <h2 data-testid="doctor-name">{doctor.name}</h2>

        <p data-testid="doctor-specialty">
          {doctor.specialities.map((s) => s.name).join(", ")}
        </p>

        <p data-testid="doctor-experience">{doctor.experience}</p>

        <p data-testid="doctor-fee">{doctor.fees}</p>

        <p className="clinic-name">{doctor.clinic?.name}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
