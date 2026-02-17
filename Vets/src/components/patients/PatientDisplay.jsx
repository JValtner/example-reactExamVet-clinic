import React, { useState, useEffect} from "react";
import "../../styles/style.scss";
import { useUser } from "../../context/contextUser";
import { deletePatient, getAllPatients, updatePatient } from "../../service/patientsService";
import { set } from "react-hook-form";

const PatientDisplay = ({ patient, onDelete, onEdit }) => {
    
    return (
        <tr>
            <td data-label="Pet Name">{patient.petName}</td>
            <td data-label="Owner Name">{patient.ownerName}</td>
            <td data-label="Animal Type">{patient.anymalType}</td>
            <td data-label="Veterinarian">{patient.veterinarianName}</td>
            <td data-label="Date of Birth">{new Date(patient.dateOfBirth).toLocaleDateString()}</td>

            <td data-label="Akcije" className="actions-cell">
                <div className="actions">
                    <button className="btn btn-edit" onClick={() => onEdit(patient.id)}>Edit</button>
                    <button className="btn btn-delete" onClick={() => onDelete(patient.id)}>Delete</button>
                </div>
            </td>
        </tr>
    );
};

export default PatientDisplay;
