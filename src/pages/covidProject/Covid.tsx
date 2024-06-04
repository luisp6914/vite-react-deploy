import "./covid-project.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospitalUser, faVialVirus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Covid() {
  return (
    <div className="covidDashboard">
      <div className="patientOption">
        <h1> <FontAwesomeIcon icon={faHospitalUser}/> </h1>
        <Link className="portalButton btn" to="/covid-project/patients">Patient Portal</Link>
        <p>Manage all your patient information</p>
      </div>
      <div className="divider"></div>
      <div className="vaccineOption">
        <h1> <FontAwesomeIcon icon={faVialVirus}/> </h1>
        <Link className="portalButton btn" to="/covid-project/vaccines">Vaccine Portal</Link>
        <p>Manage all your Vaccine information</p>
      </div>
    </div>
  );
}

export default Covid;
