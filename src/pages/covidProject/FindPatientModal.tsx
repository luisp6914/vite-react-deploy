import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FindPatientModal() {
  return (
    <>
      <form className="d-flex" role="search" action="">
        <div className="input-group">
          <input
            className="form-control"
            type="search"
            placeholder="Name | ID#"
            aria-label="Search"
          />
          <button className="btn btn-primary" type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
    </>
  );
}

export default FindPatientModal;
