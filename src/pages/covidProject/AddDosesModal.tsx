import { useState, useEffect } from "react";
import { addDoses, getVaccines } from "../../apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Vaccine {
    id: number;
    name: string;
}

function AddDosesModal() {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [selectedVaccine, setSelectedVaccine] = useState("");
  const [doses, setDoses] = useState("");

  /*Fetching the vaccines*/
  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = async () => {
    try {
        const response = await getVaccines();
        setVaccines(response);
    } catch (error) {
        console.error("Error fetching vaccines", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /**Validating that doses is not negative and that it is a number */
    const dosesNum = Number(doses);
    if (isNaN(dosesNum) || dosesNum < 0){
        alert("Please enter a valid non-negative numeric value for doses.");
        return;
    }

    try {
        await addDoses(selectedVaccine, dosesNum);
        setSelectedVaccine("");
        setDoses("");
    } catch (error) {
        console.error("Failed to add doses", error);
    }
  };
  
  const handleDosesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDoses(value);
  }

  return (
    <>
      <button type="button" className="btn add-dose-btn" data-bs-toggle="modal" data-bs-target="#addDosesModal" style={{background: "orange", color: "#fff"}}>
        <FontAwesomeIcon icon={faPlus} /> Dose
      </button>

      <div className="modal fade" id="addDosesModal" tabIndex={-1} aria-labelledby="addDosesModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
            {/*The container of the modal */}
            <div className="modal-content">
                {/*The header of the modal */}
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="addDosesModalLabel">Add Dose</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {/*The body of the modal, this case the form */}
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        {/*Label for selecting vaccine*/}
                        <div className="mb-3">
                            <label htmlFor="vaccine-select" className="col-form-label"> Select Vaccine: </label>
                            <select className="form-select" id="vaccine-select" value={selectedVaccine} onChange={(e) => setSelectedVaccine(e.target.value)} required >
                                <option >--Select--</option>
                                {vaccines.map((vaccine) => (
                                    <option key={vaccine.id} value={vaccine.id}>
                                        {vaccine.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/*Label for getting Doses from user*/}
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="doses" placeholder="Add Doses" value={doses} onChange={handleDosesChange} required />
                            <label htmlFor="doses" className="col-form-label floatingInput">Add Doses</label>
                        </div>
                        {/*Footer of the modal*/}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Add Doses</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>

    </>
  );
}

export default AddDosesModal;
