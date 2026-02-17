import React from "react";

const PatientsFilterSection = ({ filter, setFilter, animalTypes, veterinarians }) => {
  const handleChange = (field, value) => {
    setFilter(prev => ({
      ...prev,
      [field]: value || null
    }));
  };

  return (
    <div className="book-filter-section">
      <div className="filter-row">
        <label>
          Pet name:
          <input type="text" value={filter.PetName || ""} onChange={(e) => handleChange("PetName", e.target.value)} />
        </label>

        <label>
          Veterinarian:
          <select
            value={filter.VeterinarianId ?? ""}
            onChange={(e) =>
              setFilter(prev => ({
                ...prev,
                VeterinarianId: e.target.value || null
              }))
            }
          >
            <option value="">-- Select Veterinarian --</option>
            {veterinarians.map(v => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>

        </label>

        <label>
          Animal type:
          <select
            value={filter.AnimalTypeId ?? ""}
            onChange={(e) =>
              handleChange(
                "AnimalTypeId",
                e.target.value ? Number(e.target.value) : null
              )
            }
          >
            <option value="">-- Select Animal Type --</option>
            {animalTypes.map(animalType => (
              <option key={animalType.id} value={animalType.id}>
                {animalType.name}
              </option>
            ))}
          </select>
        </label>

        <div className="filter-row">
          <label> Age from:
            <input type="number" value={filter.ageFrom || ""} onChange={(e) => handleChange("AgeFrom", e.target.value)} />
          </label>
          <label>
            Age to:
            <input type="number" value={filter.ageTo || ""} onChange={(e) => handleChange("AgeTo", e.target.value)} />
          </label>
        </div>

      </div>
    </div>
  );
};

export default PatientsFilterSection;
