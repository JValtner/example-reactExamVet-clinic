import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  getAllVeterenerians, 
  getAllAnimalTypes,
  getAllOwners,
  getPatientById, 
  createPatient, 
  updatePatient } 
  from "../../service/patientsService";
import BlankForm from "./BlankForm";
import { useForm } from "react-hook-form";
import "../../styles/style.scss";
import{useUser} from"../../context/contextUser";

const PatientForm = () => {
  const { user, roles } = useUser();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [owners, setOwners] = useState([]);
  const [veterenerians, setVeterenerians] = useState([]);
  const [animalTypes, setAnimalTypes] = useState([]);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({ mode: "onChange" });

  useEffect(() => {
    const fetchMeta = async () => {
      const ownersRes = await getAllOwners("Owner");
      const vetereneriansRes = await getAllVeterenerians("Veterinarian");
      const animalTypesRes = await getAllAnimalTypes();
      setAnimalTypes(animalTypesRes);
      setOwners(ownersRes);
      setVeterenerians(vetereneriansRes);
      
      
      if (isEditMode) {
        const patient = await getPatientById(id);
        setValue("petName", patient.petName);
        setValue("ownerName", patient.ownerId);
        setValue("animalType", patient.animalTypeId);
        setValue("veterinarian", patient.veterinarianId);
        setValue("dateOfBirth", patient.dateOfBirth);
      }
    };
    fetchMeta();
  }, [id, isEditMode, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      id: isEditMode ? Number(id) : undefined,
      petName: data.petName,
      dateOfBirth: data.dateOfBirth,
      animalTypeId: Number(data.animalType),
      ownerId: data.ownerName,              
      veterinarianId: data.veterinarian, 
    };

    try {
      if (isEditMode) {
        await updatePatient(id, payload);
        navigate("/patients", { state: { message: "Pacijent uspešno izmenjen." } });
      } else {
        await createPatient(payload);
        navigate("/patients", { state: { message: "Pacijent uspešno dodat." } });
      }
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  return (
    <BlankForm
      register={register}
      errors={errors}
      reset={reset}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      animalTypes={animalTypes}
      owners={owners}
      veterenerians={veterenerians}
    />
  );
};

export default PatientForm;