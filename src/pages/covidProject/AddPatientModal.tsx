import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddPatientModal(){
    return(
        <>
            <button type="button" className="btn btn-primary add-patient-btn" data-bs-toggle="modal" data-bs-target="#addPatientModal">
                <FontAwesomeIcon icon={faPlus} /> Patients
            </button>
        </>
    );
}

export default AddPatientModal;