import AxiosConfig from "../config/axios.config";

const PATIENTS_RESOURCE = "api/patients";

// GET all patients
export async function getAllPatients() {
  const response = await AxiosConfig.get(PATIENTS_RESOURCE);
  return response.data;
}
// GET all patients
export async function getAllFilteredPatients(filter) {
  const response = await AxiosConfig.get(`${PATIENTS_RESOURCE}/filtered`, { params: filter });
  return response.data;
}

// GET a patient by id
export async function getPatientById(id) {
  const response = await AxiosConfig.get(`${PATIENTS_RESOURCE}/${id}`);
  return response.data;
}
// GET a veterinarian by id
export async function getVeterinarianById(id) {
  const response = await AxiosConfig.get(`api/users/${id}`);
  return response.data;
}

// CREATE a new patient
export async function createPatient(patientData) {
  const response = await AxiosConfig.post(PATIENTS_RESOURCE, patientData);
  return response.data;
}

// UPDATE a patient
export async function updatePatient(id, patientData) {
  const response = await AxiosConfig.put(`${PATIENTS_RESOURCE}/${id}`, patientData);
  return response.data;
}

// DELETE a patient
export async function deletePatient(id) {
  const response = await AxiosConfig.delete(`${PATIENTS_RESOURCE}/${id}`);
  return response.data;
}
// Get all owners
export async function getAllOwners(role) {
  const response = await AxiosConfig.get(`api/users/by-role/${role}`);
  return response.data;
}

// Get all veterinarians
export async function getAllVeterenerians(role) {
  const response = await AxiosConfig.get(`api/users/by-role/${role}`);
  return response.data;
}

  //Get all animal types
export async function getAllAnimalTypes() {
    const response = await AxiosConfig.get("api/animals");
    return response.data;
  }

