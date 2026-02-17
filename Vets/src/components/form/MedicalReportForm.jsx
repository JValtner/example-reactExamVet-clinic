import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const MedicalReportForm = ({
    appointment,
    onSubmit,
    onCancel
}) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue
    } = useForm();

    // if later you allow editing an existing report
    useEffect(() => {
        if (!appointment) {
            reset();
            return;
        }
    }, [appointment]);

    const submitHandler = (data) => {
        onSubmit({
            weight: Number(data.weight),
            anamneza: data.anamneza
        });

        reset();
    };

    return (
        <form className="medical-report-form" onSubmit={handleSubmit(submitHandler)}>
            <h2>Medical Report</h2>

            <label>
                Weight (kg):
                <input
                    type="number"
                    step="0.1"
                    {...register("weight", { required: true })}
                />
            </label>

            <label>
                Anamneza:
                <textarea
                    rows="4"
                    {...register("anamneza", { required: true })}
                />
            </label>

            <button type="submit">
                {appointment?.report ? "Update Medical Report" : "Create Medical Report"}
            </button>


            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
};

export default MedicalReportForm;
