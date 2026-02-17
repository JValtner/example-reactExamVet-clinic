import AxiosConfig from "../config/axios.config";

const REPORTS_RESOURCE = "api/reports";

// GET a appointment by id
export async function getReportmentById(id) {
  const response = await AxiosConfig.get(`${REPORTS_RESOURCE}/${id}`);
  return response.data;
}

// CREATE a new appointment
export async function createMedicalReport(reportsData) {
  const response = await AxiosConfig.post(`${REPORTS_RESOURCE}/new`, reportsData);
  return response.data;
}

// UPDATE a appointment
export async function updateMedicalReport(id, reportsData) {
  const response = await AxiosConfig.put(`${REPORTS_RESOURCE}/edit/${id}`, reportsData);
  return response.data;
}

