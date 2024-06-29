import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addPatient } from "../../apiService";
import { useState } from "react";

interface Vaccine {
    id: number;
    name: string;
}

interface AddPatientModalProps{
    vaccines: Vaccine[]
    fetchPatients: () => void;
}

function AddPatientModal({vaccines, fetchPatients}: AddPatientModalProps){
    const [patientName, setPatientName] = useState("");
    const [selectedVaccine, setSelectedVaccine] = useState("");
    
    

    //Handling the submitted new patient
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        //new patient
        const newPatient = {
            name: patientName,
            vaccineName: selectedVaccine
        }
        //Viewing the new patient:
        //console.table(newPatient);
        try {
            await addPatient(newPatient);
            setPatientName("");
            setSelectedVaccine("");
            fetchPatients();
        } catch (error) {
            console.error("Failed to add patient [AddPatientModal.tsx file]", error)
        }
    }
    
    return(
        <>
            <button type="button" className="btn btn-primary add-patient-btn" data-bs-toggle="modal" data-bs-target="#addPatientModal">
                <FontAwesomeIcon icon={faPlus} /> Patients
            </button>

            <div className="modal fade" id="addPatientModal" tabIndex={-1} aria-labelledby="addPatientModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addPatientModalLabel">New Patient</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleSubmit} >
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="patient-name" placeholder="Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
                                    <label htmlFor="patient-name" className="col-form-label floatingInput">Patient Name</label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="vaccine-select" className="col-form-label"> Select Vaccine: </label>
                                    <select className="form-select" id="vaccine-select" value={selectedVaccine} onChange={(e) => setSelectedVaccine(e.target.value)} required >
                                        <option>--Select--</option>
                                        {vaccines.map((vaccine) => (
                                            <option key={vaccine.id} value={vaccine.name}>
                                                {vaccine.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add Patient</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddPatientModal;