import { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getVaccineById } from "../../apiService";

interface Vaccine {
  id: number;
  name: string;
  dosesReceived: number;
  dosesRemaining: number;
  doseIntervals: number;
  dosesRequired: number;
}

interface FindVaccineModalProps {
  onVaccineFound: (vaccine: Vaccine) => void;
}

function FindVaccineModal({ onVaccineFound }: FindVaccineModalProps) {
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<Vaccine | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!searchId || isNaN(Number(searchId))){
      alert("Please enter a valid ID number.");
      return;
    }

    try {
      const result = await getVaccineById(searchId);
      if(result) {
        setSearchResult(result);
        onVaccineFound(result);
        setShowModal(true);
      }
      else{
        alert("Vaccine Not Found");
      }
    } catch (error) {
      alert("Error Fetching Vaccine");
      console.error(
        "Error Fetching Vaccine by ID [FindVaccineModal.tsx file]",
        error
      );
    }
  };

  return (
    <>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            className="form-control"
            type="search"
            placeholder="Vaccine ID"
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
        aria-labelledby="findVaccineModalLabel"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="findVaccineModalLabel">
                Vaccine Information
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
                    />
                    <label htmlFor="floatingPlaintextInputNam">Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingPlaintextInputIntervals"
                      placeholder={`${searchResult.doseIntervals}`}
                      name="intervals"
                      value={`${searchResult.doseIntervals}`}
                    />
                    <label htmlFor="floatingPlaintextInputIntervals">
                      Dose Intervals
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingPlaintextInputReceived"
                      placeholder={`${searchResult.dosesReceived}`}
                      name="received"
                      value={`${searchResult.dosesReceived}`}
                    />
                    <label htmlFor="floatingPlaintextInputReceived">
                      Doses Received
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingPlaintextInputRemaining"
                      placeholder={`${searchResult.dosesRemaining}`}
                      name="remaining"
                      value={`${searchResult.dosesRemaining}`}
                    />
                    <label htmlFor="floatingPlaintextInputRemaining">
                      Doses Remaining
                    </label>
                  </div>

                  <label className="col-form-label">Doses Required:</label>
                  <div className="mb-3">
                    <div className="form-check form-check-inline">
                      <input
                        checked= {true}
                        type="radio"
                        className="form-check-input"
                        id="required"
                        name="dosesRequired"
                        value={searchResult.dosesRequired}
                      />
                      <label htmlFor="required">{searchResult.dosesRequired}</label>
                    </div>
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

export default FindVaccineModal;
