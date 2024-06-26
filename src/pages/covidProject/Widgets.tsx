import { useLocation } from "react-router-dom";
import AddVaccineModal from "./AddVaccineModal";
import AddDosesModal from "./AddDosesModal";
import FetchedVaccinesTable from "./FetchedVaccinesTable";
import { useState, useEffect } from "react";
import { getPatients, getVaccines } from "../../apiService";
import FindVaccineModal from "./FindVaccineModal";
import AddPatientModal from "./AddPatientModal";
import FindPatientModal from "./FindPatientModal";
import FetchedPatientsTable from "./FetchedPatientsTable";

const useFetchData = () => {
    //Fetched Data
    const [vaccines, setVaccines] = useState([]);
    const [patients, setPatients] = useState([]);

    //Getting the list of vaccines
    const fetchVaccines = async () => {
        try {
            const response = await getVaccines();
            setVaccines(response);
        } catch (error) {
            console.error("Error fetching vaccines [Widgets.tsx file line 18]", error);
        }
    };

    //Getting the list of patients
    const fetchPatients = async () => {
        try {
            const response = await getPatients();
            setPatients(response);
        } catch (error) {
            console.error("Error fetching Patients [Widgets.tsx file line 30]", error);
        }
    };
    
    //Using the effect
    useEffect(() =>{
        fetchVaccines();
        fetchPatients();
    }, []);

    //returning lists and the functions
    return { vaccines, fetchVaccines, patients, fetchPatients };
};



function Widgets(){
    const location = useLocation();
    const currentPath = location.pathname;
    const {vaccines, fetchVaccines, patients, fetchPatients} = useFetchData();

    const vaccineButtons = [
        <AddVaccineModal key="addVacineModal" onVaccineAdded={fetchVaccines}/>,
        <AddDosesModal key="addDoseModal" fetchVaccines={fetchVaccines} vaccines={vaccines}/>,
        <FindVaccineModal key="findVaccineModal" onVaccineFound={(vaccine) => console.log("[Widget.tsx file line 33]",vaccine)}/>
    ];

    const patientButton = [
        <AddPatientModal key="addPatientModal" fetchPatients={fetchPatients} vaccines={vaccines}/>,
        <FindPatientModal key="findPatientModal" onPatientFound={(patient) => console.log("[Widget.tsx file]", patient)}/>
    ];

    return(
        <>
            <div className="portal-content-largeScreen">
                <div className="widget-largeScreen">
                    {currentPath === "/covid-project/patients" ?  patientButton  : vaccineButtons}
                </div>

                <div className="patient-vaccine-table">
                    {currentPath === "/covid-project/patients" ?  <FetchedPatientsTable fetchPatients={fetchPatients} patients={patients}/>  : <FetchedVaccinesTable vaccines={vaccines} fetchVaccines={fetchVaccines}/>}
                </div>

            </div>
            {/* <div className="portal-content-mediumScreen">
                <h3>test</h3>
            </div> */}
        </>
    );
}

export default Widgets;