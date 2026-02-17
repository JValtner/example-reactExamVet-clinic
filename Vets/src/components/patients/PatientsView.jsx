import React, { useState, useEffect } from "react";
import "../../styles/style.scss";
import { useUser } from "../../context/contextUser";
import PatientDisplay from "./PatientDisplay";
import PatientForm from "../form/PatientForm";
import { deletePatient, getAllFilteredPatients, getAllVeterenerians, getAllAnimalTypes } from "../../service/patientsService";
import { useNavigate } from "react-router-dom";
import PatientsFilterSection from "../../utils/PatientsFilterSection";
const PatientsView = () => {

  const navigate = useNavigate();
  const { user, roles } = useUser();
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filter, setFilter] = useState({
  PetName: "",
  VeterinarianId: null,  
  AnimalTypeId: null,     
  AgeFrom: null,
  AgeTo: null
});

  const [animalTypes, setAnimalTypes] = useState([]);
  const [veterinarians, setVeterinarians] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const patientsData = await getAllFilteredPatients(filter);
        setPatients(patientsData);
      } catch (error) {
        setErrorMsg("Failed to fetch patients");
      } finally {
        setLoading(false);
      }
    };
    const fetchAnimalTypes = async () => {
      try {
        const response = await getAllAnimalTypes();
        setAnimalTypes(response);
      }
      catch (error) {
        setErrorMsg("Failed to fetch animal types");
      }
    }

    const fetchVeterinarians = async () => {
      try {
        const response = await getAllVeterenerians("Veterinarian");
        setVeterinarians(response);
      }
      catch (error) {
        setErrorMsg("Failed to fetch animal types");
      }

    }

    fetchAnimalTypes();
    fetchVeterinarians();
    fetchPatients();
  }, [filter]);

  const handleEdit = (id) => {
   
      navigate(`/PatientsForm/${id}`);
    
  };

  const handleDelete = (id) => {
    const deletePatientById = async (id) => {
      try {
        await deletePatient(id);
        setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
      } catch (error) {
        setErrorMsg("Failed to delete patient");
      } finally {
        setLoadingDelete(false);
      }
    }
    setLoadingDelete(true);
    setTimeout(() => {
      setLoadingDelete(false);
      deletePatientById(id);
    }, 1000);
  };

  return (
    <>
      <section className="page form">
        <PatientForm />
      </section>
      <section className="filter-section">
        <PatientsFilterSection
        veterinarians={veterinarians}
        animalTypes={animalTypes}
        filter={filter}
        setFilter={setFilter}
        />
      </section>
      <section className="page list">
        <table className="table books">
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Owner Name</th>
              <th>Animal Type</th>
              <th>Veterenerian</th>
              <th>Date of Birth</th>
              <th>Akcije</th>
            </tr>
          </thead>

          {!loading && !errorMsg && (
            <tbody>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <PatientDisplay
                    key={patient.id}
                    patient={patient}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    Nema dostupnih pacijenata
                  </td>
                </tr>
              )}
            </tbody>
          )}

        </table>

      </section>
    </>
  )
}

export default PatientsView
