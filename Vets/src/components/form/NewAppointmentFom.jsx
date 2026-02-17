import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAllPatients } from "../../service/patientsService";

const NewAppointmentForm = ({
    selectedVet,
    appointment,
    onSubmit,
    onCancelEdit
}) => {
    const [pets, setPets] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        setValue
    } = useForm();

    useEffect(() => {
        getAllPatients().then(setPets);
    }, []);

    useEffect(() => {
        if (!appointment) {
            reset();
            return;
        }

        const start = new Date(appointment.startDate);
        const end = new Date(appointment.endDate);

        setValue("date", start.toISOString().split("T")[0]);
        setValue("startTime", start.toTimeString().slice(0, 5));
        setValue("endTime", end.toTimeString().slice(0, 5));
        setValue("petId", String(appointment.patientId));
    }, [appointment]);

    const handleStartTimeChange = (e) => {
        const [h, m] = e.target.value.split(":").map(Number);
        const d = new Date();
        d.setHours(h, m + 20);
        setValue("endTime", d.toTimeString().slice(0, 5));
    };

    const submitHandler = (data) => {
        const payload = {
            id: appointment?.id,
            vetId: selectedVet,
            patientId: Number(data.petId),
            startDate: new Date(`${data.date}T${data.startTime}`).toISOString(),
            endDate: new Date(`${data.date}T${data.endTime}`).toISOString()
        };

        onSubmit(payload);
        reset();
    };

    return (
        <form className="new-appointment-form" onSubmit={handleSubmit(submitHandler)}>
            <h2>{appointment ? "Edit Appointment" : "New Appointment"}</h2>

            <label>
                Date:
                <input type="date" {...register("date", { required: true })} />
            </label>

            <label>
                Start Time:
                <input
                    type="time"
                    step={1200}
                    {...register("startTime", {
                        required: true,
                        onChange: handleStartTimeChange
                    })}
                />
            </label>

            <label>
                End Time:
                <input
                    type="time"
                    step={1200}
                    {...register("endTime", { required: true })}
                    disabled
                />
            </label>

            <label>
                Choose pet:
                <select {...register("petId", { required: true })}>
                    <option value="">-- Choose pet --</option>
                    {pets.map(p => (
                        <option key={p.id} value={p.id}>
                            {p.petName}
                        </option>
                    ))}
                </select>
            </label>

            <button type="submit">
                {appointment ? "Update Appointment" : "Create Appointment"}
            </button>

            {appointment && (
                <button type="button" onClick={onCancelEdit}>
                    Cancel edit
                </button>
            )}
        </form>
    );
};

export default NewAppointmentForm;
