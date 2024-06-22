import { useLocation } from "react-router-dom";
import AddVaccineModal from "./AddVaccineModal";
import AddDosesModal from "./AddDosesModal";
import FetchedVaccinesTable from "./FetchedVaccinesTable";
import { useState, useEffect } from "react";
import { getVaccines } from "../../apiService";
import FindVaccineModal from "./FindVaccineModal";
import AddPatientModal from "./AddPatientModal";
import FindPatientModal from "./FindPatientModal";

function Widgets(){
    const location = useLocation();
    const currentPath = location.pathname;
    const [vaccines, setVaccines] = useState([]);

    //Getting the list of vaccines
    const fetchVaccines = async () => {
        try {
            const response = await getVaccines();
            setVaccines(response);
        } catch (error) {
            console.error("Error fetching vaccines [Widgets.tsx file line 18]", error);
        }
    }

    useEffect(() =>{
        fetchVaccines();
    }, []);

    const vaccineButtons = [
        <AddVaccineModal key="addVacineModal" onVaccineAdded={fetchVaccines}/>,
        <AddDosesModal key="addDoseModal" fetchVaccines={fetchVaccines} vaccines={vaccines}/>,
        <FindVaccineModal key="findVaccineModal"/>
    ];

    const patientButton = [
        <AddPatientModal key="addPatientModal"/>,
        <FindPatientModal key="findPatientModal"/>
    ];

    return(
        <>
            <div className="portal-content-largeScreen">
                <div className="widget-largeScreen">
                    {currentPath === "/covid-project/patients" ?  patientButton  : vaccineButtons}
                </div>

                <div className="patient-vaccine-table">
                    {currentPath === "/covid-project/patients" ?  <h1>patients</h1>  : <FetchedVaccinesTable vaccines={vaccines} fetchVaccines={fetchVaccines}/>}
                </div>

            </div>
            {/* <div className="portal-content-mediumScreen">
                <h3>test</h3>
            </div> */}
        </>
    );
}

export default Widgets;