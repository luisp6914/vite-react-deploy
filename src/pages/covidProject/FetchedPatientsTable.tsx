import { faCheck, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { addSecondDose } from "../../apiService";

interface Patient{
    id: number;
    name: string;
    vaccineName: string;
    vaccineDosesRequired: number;
    dose1Date: string;
    dose2Date: string;
}

interface FetchedPatientsTableProps{
    patients: Patient[];
    fetchPatients: () => void;
}

function FetchedPatientsTable({ patients, fetchPatients }: FetchedPatientsTableProps){
    const [currentPage, setCurrentPage] = useState(1);
    const patientsPerPage = 15;

    //Calculate total pages
    const totalPages = Math.ceil(patients.length / patientsPerPage);

    //Get current patients
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

    //Change page 
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const addingSecondDose = async (patient : Patient) => {
        try {
            await addSecondDose(patient);
            fetchPatients();
        } catch (error) {
            console.error("Error Adding Second Dose", error )
        }
    }

    return (
        <>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Patient</th>
                            <th>Vaccine</th>
                            <th>Dose 1</th>
                            <th>Dose 2</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {currentPatients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.name}</td>
                                <td>{patient.vaccineName}</td>
                                <td>{patient.dose1Date}</td>
                                {patient.dose2Date !== null && patient.vaccineDosesRequired === 2 ? (
                                    <td>{patient.dose2Date}</td>
                                ) : patient.dose2Date === null && patient.vaccineDosesRequired === 2 ? (
                                    <td>
                                        <button className="btn addSecondDoseBtn" style={{background: "orange", color: "#fff"}} onClick={() => addingSecondDose(patient)}>
                                            <FontAwesomeIcon icon={faPlus} /> Add Next Dose
                                        </button>
                                    </td>
                                ) : (
                                    <td> <FontAwesomeIcon icon={faCheck} style={{color: "#1eff00",}} size="xl" title="Vaccine Completed"/> </td>
                                )}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => paginate(currentPage - 1)}> <FontAwesomeIcon icon={faChevronLeft} /> </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' :  ''}`}>
                            <button onClick={() => paginate(index + 1)} className="page-link">
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ''}`}>
                        <button className="page-link" onClick={() => paginate(currentPage + 1)}> <FontAwesomeIcon icon={faChevronRight} /> </button>
                    </li>
                </ul>
            </nav>
        </>
    );

}

export default FetchedPatientsTable;