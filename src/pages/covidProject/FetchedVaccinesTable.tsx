import { useEffect, useState } from "react";
import { getVaccines } from "../../apiService";
import EditVaccineModal from "./EditVaccineModal";
interface Vaccine{
    id: number; 
    name: string;
    dosesReceived: number;
    dosesRemaining: number;
    doseIntervals: number;
    dosesRequired: number;
}

function FetchedVaccinesTable (){
    const [vaccines, setVaccines] = useState<Vaccine[]>([]);

    useEffect(() =>{
        fetchVaccines();
    }, []);
    //Fetching the vaccines
    const fetchVaccines = async () => {
        try {
            const response = await getVaccines();
            setVaccines(response);
        } catch (error) {
            console.error("Error fetching vaccines", error);
        }
    }
    return(
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vaccine Name</th>
                        <th>Dose Intervals</th>
                        <th>Doses Recieved</th>
                        <th>Doses Remaining</th>
                        <th>Doses Required</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody className="table-group-divider">
                    {vaccines.map((vaccine) => (
                        <tr key={vaccine.id}>
                            <td>{vaccine.id}</td>
                            <td>{vaccine.name}</td>
                            <td>{vaccine.doseIntervals}</td>
                            <td>{vaccine.dosesReceived}</td>
                            <td>{vaccine.dosesRemaining}</td>
                            <td>{vaccine.dosesRequired}</td>
                            <td>
                                <EditVaccineModal vaccine={{
                                    id: vaccine.id,
                                    name: vaccine.name,
                                    doseIntervals: vaccine.doseIntervals
                                }} onUpdate={function (): void {
                                    throw new Error("Function not implemented.");
                                } } />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default FetchedVaccinesTable;