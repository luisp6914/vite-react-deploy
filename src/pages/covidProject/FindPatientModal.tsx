import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getPatientById } from "../../apiService";

interface Patient {
  id: number;
  name: string;
  vaccineName: string;
  dose1Date: string;
  dose2Date: any;
}

interface FindPatientModalProps{
  onPatientFound: (patient: Patient) => void;
}

function FindPatientModal({onPatientFound}: FindPatientModalProps) {
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<Patient | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!searchId || isNaN(Number(searchId))){
      alert("Please enter a valid ID number.");
      return;
    }

    try {
      const result = await getPatientById(searchId);
      if(result) {
        setSearchResult(result);
        onPatientFound(result);
        setShowModal(true);
      }
      else{
        alert("Patient Not Found");
      }
    } catch (error) {
      alert("Error Finding Patient");
      console.error(
        "Error Fetching Patient by ID [FindPatientModal.tsx file]",
        error
      );
    }


  }

  return (
    <>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            className="form-control"
            type="search"
            placeholder="Patient ID"
            aria-label="Search"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>

      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        tabIndex={-1}
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
        aria-labelledby="findPatientModalLabel"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="findPatientModalLabel">
                Patient Information
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              {searchResult && (
                <>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingPlaintextInputID"
                      placeholder={`${searchResult.id}`}
                      name="id"
                      value={`${searchResult.id}`}
                      readOnly
                    />
                    <label htmlFor="floatingPlaintextInputID">ID</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingPlaintextInputName"
                      placeholder={`${searchResult.name}`}
                      name="name"
                      value={`${searchResult.name}`}
                      readOnly
                    />
                    <label htmlFor="floatingPlaintextInputName">Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingPlaintextInputVaccineName"
                      placeholder={`${searchResult.vaccineName}`}
                      name="intervals"
                      value={`${searchResult.vaccineName}`}
                      readOnly
                    />
                    <label htmlFor="floatingPlaintextInputVaccineName">
                      Vaccine Name
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingPlaintextInputDose1Date"
                      placeholder={`${searchResult.dose1Date}`}
                      name="received"
                      value={`${searchResult.dose1Date}`}
                      readOnly
                    />
                    <label htmlFor="floatingPlaintextInputDose1Date">
                      First Dose Date
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingPlaintextInputDose2Date"
                      placeholder={`${searchResult.dose2Date}`}
                      name="remaining"
                      value={searchResult.dose2Date === null ? "" : `${searchResult.dose2Date}`}
                      disabled={searchResult.dose2Date === null}
                      readOnly
                    />
                    <label htmlFor="floatingPlaintextInputDose2Date">
                      Second Dose Date
                    </label>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

export default FindPatientModal;
