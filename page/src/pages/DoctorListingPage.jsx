// src/pages/DoctorListingPage.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import FilterPanel from "../components/FilterPanel";
import DoctorCard from "../components/DoctorCard";

const DoctorListingPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      });
  }, []);

  // Load filters from URL on mount
  useEffect(() => {
    const mode = searchParams.get("mode") || "";
    const specialties = searchParams.get("specialties")?.split(",") || [];
    const sort = searchParams.get("sort") || "";
    const search = searchParams.get("search") || "";

    setSelectedMode(mode);
    setSelectedSpecialties(specialties.filter(Boolean));
    setSortOption(sort);
    setSearchTerm(search);
  }, []);

  // Apply filters whenever something changes
  useEffect(() => {
    let filtered = [...doctors];

    if (searchTerm) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedMode) {
      filtered = filtered.filter((doc) =>
        selectedMode === "video" ? doc.video_consult : doc.in_clinic
      );
    }

    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter((doc) =>
        selectedSpecialties.every((spec) =>
          doc.specialities.some((d) => d.name.includes(spec))
        )
      );
    }

    if (sortOption === "fees") {
      filtered.sort(
        (a, b) =>
          parseInt(a.fees.replace(/[^\d]/g, "")) -
          parseInt(b.fees.replace(/[^\d]/g, ""))
      );
    }

    if (sortOption === "experience") {
      filtered.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
    }

    setFilteredDoctors(filtered);

    const params = {};
    if (selectedMode) params.mode = selectedMode;
    if (selectedSpecialties.length > 0)
      params.specialties = selectedSpecialties.join(",");
    if (sortOption) params.sort = sortOption;
    if (searchTerm) params.search = searchTerm;
    setSearchParams(params);
  }, [doctors, searchTerm, selectedMode, selectedSpecialties, sortOption]);

  const handleSearch = (value) => setSearchTerm(value);
  const handleModeChange = (mode) => setSelectedMode(mode);
  const handleSpecialtyChange = (spec) => {
    setSelectedSpecialties((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };
  const handleSortChange = (sort) => setSortOption(sort);

  return (
    <div>
      <Header doctors={doctors} onSearch={handleSearch} />
      <FilterPanel
        selectedMode={selectedMode}
        onModeChange={handleModeChange}
        selectedSpecialties={selectedSpecialties}
        onSpecialtyChange={handleSpecialtyChange}
        sortOption={sortOption}
        onSortChange={handleSortChange}
      />

      <div>
        {filteredDoctors.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </div>
  );
};

export default DoctorListingPage;
