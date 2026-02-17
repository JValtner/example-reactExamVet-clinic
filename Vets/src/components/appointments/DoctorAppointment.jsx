import React, { useEffect, useState } from "react";
import "../../styles/style.scss";
import { useUser } from "../../context/contextUser";
import {
  getAllAppointmentsbyVet,
  cancelAppointment
} from "../../service/appointmentService";
import {
  createMedicalReport,
  updateMedicalReport
} from "../../service/reportService";
import MedicalReportForm from "../form/MedicalReportForm";

const DoctorAppointment = () => {
  const { user, roles } = useUser();

  const [appointments, setAppointments] = useState([]);
  const [selectedVet, setSelectedVet] = useState("");
  const [appointmentToReport, setAppointmentToReport] = useState(null);

  // auto-select vet from logged-in user
  useEffect(() => {
    if (user && roles?.includes("Veterinarian")) {
      setSelectedVet(user.id);
    }
  }, [user, roles]);

  // load appointments
  useEffect(() => {
    if (!selectedVet) {
      setAppointments([]);
      return;
    }

    getAllAppointmentsbyVet(selectedVet).then(setAppointments);
  }, [selectedVet]);

  const refresh = async () => {
    const data = await getAllAppointmentsbyVet(selectedVet);
    setAppointments(data);
  };

  // CREATE report
  const handleCreateReport = async (formData) => {
    const payload = {
      ...formData,
      appointmentId: appointmentToReport.id,
      vetId: selectedVet
    };

    await createMedicalReport(payload);
    setAppointmentToReport(null);
    await refresh();
  };

  // UPDATE report
  const handleUpdateReport = async (formData) => {
    const payload = {
      ...formData,
      appointmentId: appointmentToReport.id,
      vetId: selectedVet
    };

    await updateMedicalReport(
      appointmentToReport.report.id,
      payload
    );

    setAppointmentToReport(null);
    await refresh();
  };

  const handleCancelAppointment = async (id) => {
    await cancelAppointment(id, "Cancelled by vet");
    await refresh();
  };

  return (
    <div className="page home">
      <h1>Doctor's Appointments</h1>

      <section className="filter-section">
        <h2>
          Welcome {user?.name} {user?.surname}
        </h2>
      </section>

      {/* Medical report form */}
      {appointmentToReport && (
        <MedicalReportForm
          appointment={appointmentToReport}
          onSubmit={
            appointmentToReport.report
              ? handleUpdateReport
              : handleCreateReport
          }
          onCancel={() => setAppointmentToReport(null)}
        />
      )}

      <section className="appointments-list">
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
                <th>Pet</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Report</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td>{new Date(a.startDate).toLocaleDateString()}</td>
                  <td>{new Date(a.startDate).toLocaleTimeString()}</td>
                  <td>{new Date(a.endDate).toLocaleTimeString()}</td>
                  <td>{a.patient?.petName ?? "-"}</td>
                  <td>
                    {a.patient?.owner
                      ? `${a.patient.owner.firstName} ${a.patient.owner.lastName}`
                      : "-"}
                  </td>
                  <td>
                    {a.status === 0 && "Scheduled"}
                    {a.status === 1 && "Cancelled"}
                    {a.status === 2 && "Completed"}
                  </td>
                  <td>{a.report ? "Yes" : "No"}</td>
                  <td>
                    <button onClick={() => setAppointmentToReport(a)}>
                      {a.report ? "Edit Report" : "Create Report"}
                    </button>

                    <button onClick={() => handleCancelAppointment(a.id)}>
                      Cancel Appointment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default DoctorAppointment;
