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

    try {
      const result = await getVaccineById(searchId);
      setSearchResult(result);
      onVaccineFound(result);
      setShowModal(true);
    } catch (error) {
      alert("Vaccine Not Found");
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
                  <p>ID: {searchResult.id}</p>
                  <p>Name: {searchResult.name}</p>
                  <p>Dose Intervals: {searchResult.doseIntervals}</p>
                  <p>Doses Received: {searchResult.dosesReceived}</p>
                  <p>Doses Remaining: {searchResult.dosesRemaining}</p>
                  <p>Doses Required: {searchResult.dosesRequired}</p>
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
