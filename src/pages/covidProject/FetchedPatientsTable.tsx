import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface Patient{
    id: number;
    name: string;
    vaccineName: string;
    dose1Date: string;
    dose2Date: string;
}

interface FetchedPatientsTableProps{
    patients: Patient[];
}

function FetchedPatientsTable({ patients }: FetchedPatientsTableProps){
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

    return (
        <>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Vaccine</th>
                        <th>Dose 1</th>
                        <th>Dose 2</th>
                    </thead>
                    <tbody className="table-group-divider">
                        {currentPatients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.name}</td>
                                <td>{patient.vaccineName}</td>
                                <td>{patient.dose1Date}</td>
                                <td>{patient.dose2Date}</td>
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