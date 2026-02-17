import AxiosConfig from "../config/axios.config";

const APPOINTMENTS_RESOURCE = "api/appointments";

// GET all appointments
export async function getAllAppointments() {
  const response = await AxiosConfig.get(APPOINTMENTS_RESOURCE);
  return response.data;
}
//Get appointments by vet id
export async function getAllAppointmentsbyVet(vetId) {
  const response = await AxiosConfig.get(`${APPOINTMENTS_RESOURCE}/byVet/${vetId}`);
  return response.data;
}


// GET a appointment by id
export async function getAppointmentById(id) {
  const response = await AxiosConfig.get(`${APPOINTMENTS_RESOURCE}/${id}`);
  return response.data;
}

// CREATE a new appointment
export async function createAppointment(appointmentData) {
  const response = await AxiosConfig.post(APPOINTMENTS_RESOURCE, appointmentData);
  return response.data;
}

// UPDATE a appointment
export async function updateAppointment(id, appointmentData) {
  const response = await AxiosConfig.put(`${APPOINTMENTS_RESOURCE}/edit/${id}`, appointmentData);
  return response.data;
}

// Cancel an appointment
export async function cancelAppointment(id, cancellationReason) {
  const response = await AxiosConfig.put(
    `${APPOINTMENTS_RESOURCE}/cancel/${id}`,
    cancellationReason,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
}

