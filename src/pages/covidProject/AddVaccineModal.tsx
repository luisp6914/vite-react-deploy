import { useState } from "react";
import { addVaccine } from "../../apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddVaccineModal(){
    //State variables 
    const [name, setName] = useState("");
    const [doseIntervals, setDoseIntervals] = useState("");
    const [dosesReceived, setDosesReceived] = useState("");
    const [dosesRequired, setDosesRequired] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const doseIntervalsValue = Number(doseIntervals);
        const dosesReceivedValue = Number(dosesReceived);

        if (isNaN(doseIntervalsValue) || doseIntervalsValue < 0){
            setErrorMessage('Please enter a valid non-negative number for Dose Intervals.');
            return;
        }

        if (isNaN(dosesReceivedValue) || dosesReceivedValue < 0){
            setErrorMessage('Please enter a valid non-negative number for Doses Received.');
            return;
        }

        const newVaccine = {
            name,
            doseIntervals: doseIntervalsValue,
            dosesReceived: dosesReceivedValue,
            dosesRemaining: dosesReceivedValue,
            dosesRequired,
        };
        
        try {
            await addVaccine(newVaccine);
            setName(''); 
            setDoseIntervals(''); 
            setDosesReceived(''); 
            setDosesRequired(1); 
            setErrorMessage('');
        } catch (error) {
            console.error("Failed to add vaccine", error);
        }
    };

    const handleDoseIntervalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDoseIntervals(value);
    }

    const handleDosesReceivedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDosesReceived(value);
    }

    return (
        <>
            {/*Button to toggle the modal */}
            <button type="button" className="btn btn-primary add-vaccine-btn" data-bs-toggle="modal" data-bs-target="#addVaccineModal">
                <FontAwesomeIcon icon={faPlus} /> Add Vaccine
            </button>

            <div className="modal fade" id="addVaccineModal" tabIndex={-1} aria-labelledby="addVaccineModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    {/*The container of the modal */}
                    <div className="modal-content">
                        {/*The header of the modal */}
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addVaccineModalLabel">New Vaccine</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {/*The body of the modal, this case the form */}
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                {/*The floating label for vaccine name */}
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="vaccine-name" placeholder="Vaccine Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                    <label htmlFor="vaccine-name" className="col-form-label floatingInput">Vaccine Name</label>
                                </div>
                                {/*The floating label for dose intervals */}
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="dose-intervals" placeholder="Dose Interval Ex: 21" value={doseIntervals} onChange={handleDoseIntervalsChange} required />
                                    <label htmlFor="dose-intervals" className="col-form-label floatingInput">Dose Interval Ex: 21</label>
                                </div>
                                {/*The floating label for Doses Received */}
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="doses-received" placeholder="Doses Received" value={dosesReceived} onChange={handleDosesReceivedChange} required />
                                    <label htmlFor="doses-received" className="col-form-label floatingInput">Doses Received:</label>
                                </div>

                                <label className="col-form-label" htmlFor="">Doses Required:</label>
                                {/*Label for doses required button */}
                                <div className="mb-3">
                                    
                                    {/*First Option */}
                                    <div className="form-check form-check-inline">
                                        <input type="radio" className="form-check-input" id="one-dose" name="dosesRequired" value={1} checked={dosesRequired === 1} onChange={(e) => setDosesRequired(Number(e.target.value))} />
                                        <label htmlFor="one-dose">1</label>
                                    </div>
                                    {/*Second Option */}
                                    <div className="form-check form-check-inline">
                                        <input type="radio" className="form-check-input" id="two-doses" name="dosesRequired" value={2} checked={dosesRequired === 2} onChange={(e) => setDosesRequired(Number(e.target.value))} />
                                        <label htmlFor="two-doses">2</label>
                                    </div>
                                </div>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                {/*Footer of the modal*/}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary " data-bs-dismiss="modal">Add Vaccine</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddVaccineModal;