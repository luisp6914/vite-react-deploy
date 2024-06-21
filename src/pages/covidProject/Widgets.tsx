import { faMagnifyingGlass, faPlus, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import AddVaccineModal from "./AddVaccineModal";
import AddDosesModal from "./AddDosesModal";
import FetchedVaccinesTable from "./FetchedVaccinesTable";
import { useState, useEffect } from "react";
import { getVaccines } from "../../apiService";

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
        <AddDosesModal key="addDoseModal"/>
    ];

    let patientButton = (
      <button className="btn btn-primary add-patient-btn">
        <FontAwesomeIcon icon={faPlus} /> Patients
      </button>
    );

    return(
        <>
            <div className="portal-content-largeScreen">
                <div className="widget-largeScreen">
                    {currentPath === "/covid-project/patients" ?  patientButton  : vaccineButtons}
                    <form className="d-flex" role="search" action="">
                        <div className="input-group">
                            <input className="form-control"  type="search" placeholder="Name | ID#" aria-label="Search"/>
                            <button className="btn btn-primary" type="submit">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </form>
                </div>

                <div className="patient-vaccine-table">
                    {currentPath === "/covid-project/patients" ?  <h1>patients</h1>  : <FetchedVaccinesTable vaccines={vaccines}/>}
                </div>

            </div>
            <div className="portal-content-mediumScreen">
                <h3>test</h3>
            </div>
        </>
    );
}

export default Widgets;