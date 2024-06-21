import { useState } from "react";
import EditVaccineModal from "./EditVaccineModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface Vaccine {
    id: number;
    name: string;
    dosesReceived: number;
    dosesRemaining: number;
    doseIntervals: number;
    dosesRequired: number;
}

interface FetchedVaccinesTableProps {
    vaccines: Vaccine[];
}

function FetchedVaccinesTable({ vaccines }: FetchedVaccinesTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const vaccinesPerPage = 15;

    // Calculate total pages
    const totalPages = Math.ceil(vaccines.length / vaccinesPerPage);

    // Get current vaccines
    const indexOfLastVaccine = currentPage * vaccinesPerPage;
    const indexOfFirstVaccine = indexOfLastVaccine - vaccinesPerPage;
    const currentVaccines = vaccines.slice(indexOfFirstVaccine, indexOfLastVaccine);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vaccine Name</th>
                        <th>Dose Intervals</th>
                        <th>Doses Received</th>
                        <th>Doses Remaining</th>
                        <th>Doses Required</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {currentVaccines.map((vaccine) => (
                        <tr key={vaccine.id}>
                            <td>{vaccine.id}</td>
                            <td>{vaccine.name}</td>
                            <td>{vaccine.doseIntervals}</td>
                            <td>{vaccine.dosesReceived}</td>
                            <td>{vaccine.dosesRemaining}</td>
                            <td>{vaccine.dosesRequired}</td>
                            <td>
                                <EditVaccineModal
                                    vaccine={{
                                        id: vaccine.id,
                                        name: vaccine.name,
                                        doseIntervals: vaccine.doseIntervals,
                                    }}
                                    onUpdate={function (): void {
                                        throw new Error("Function not implemented.");
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => paginate(currentPage - 1)}> <FontAwesomeIcon icon={faChevronLeft} /> </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button onClick={() => paginate(index + 1)} className="page-link">
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => paginate(currentPage + 1)}> <FontAwesomeIcon icon={faChevronRight} /> </button>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default FetchedVaccinesTable;
