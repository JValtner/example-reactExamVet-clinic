import React, { useEffect, useState } from "react";
import "../../styles/style.scss";
import { useUser } from "../../context/contextUser";
import {
  getAllAppointmentsbyVet,
  createAppointment,
  updateAppointment,
  cancelAppointment
} from "../../service/appointmentService";
import { getAllVeterenerians } from "../../service/patientsService";
import NewAppointmentForm from "../form/NewAppointmentFom";

const Appointment = () => {
  const { user, roles } = useUser();

  const [appointments, setAppointments] = useState([]);
  const [veterinarians, setVeterinarians] = useState([]);
  const [selectedVet, setSelectedVet] = useState("");
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);

  useEffect(() => {
    getAllVeterenerians("Veterinarian").then(setVeterinarians);
  }, []);

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

  const handleCreateAppointment = async (payload) => {
    await createAppointment(payload);
    await refresh();
  };

  const handleUpdateAppointment = async (payload) => {
    await updateAppointment(appointmentToEdit.id, payload);
    setAppointmentToEdit(null);
    await refresh();
  };

  const handleCancelAppointment = async (id) => {
    await cancelAppointment(id, "Cancelled by vet");
    await refresh();
  };

  return (
    <div className="page home">
      <h1>Appointments</h1>

      <section className="filter-section">
        <label>
          Select Veterinarian:
          <select
            value={selectedVet}
            onChange={(e) => {
              setSelectedVet(e.target.value);
              setAppointmentToEdit(null);
            }}
          >
            <option value="">Choose a Veterinarian</option>
            {veterinarians.map(vet => (
              <option key={vet.id} value={vet.id}>
                {vet.name} {vet.surname}
              </option>
            ))}
          </select>
        </label>
      </section>

      {selectedVet && (
        <NewAppointmentForm
          selectedVet={selectedVet}
          appointment={appointmentToEdit}
          onSubmit={
            appointmentToEdit
              ? handleUpdateAppointment
              : handleCreateAppointment
          }
          onCancelEdit={() => setAppointmentToEdit(null)}
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
                <th>Cancellation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(a => (
                <tr
                  key={a.id}
                  style={{
                    background:
                      appointmentToEdit?.id === a.id ? "#f3f3f3" : "transparent"
                  }}
                >
                  <td>{a.date}</td>
                  <td>{a.startTime?.slice(0, 5)}</td>
                  <td>{a.endTime?.slice(0, 5)}</td>
                  <td>{a.patientName ?? "-"}</td>
                  <td>{a.ownerName ?? "-"}</td>

                  <td>
                    {a.status === 0 && "Scheduled"}
                    {a.status === 1 && "Cancelled"}
                    {a.status === 2 && "Completed"}
                  </td>
                  <td>{a.cancelationReason ?? "-"}</td>
                  <td>
                    <button onClick={() => setAppointmentToEdit(a)}>Edit</button>
                    <button onClick={() => handleCancelAppointment(a.id)}>
                      Cancel
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

export default Appointment;
