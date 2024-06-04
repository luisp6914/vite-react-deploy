import { faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

function CovidNavbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
  
  
    const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (currentPath !== "/") {
        navigate("/#projects", { replace: true });
        setTimeout(() => {
          const element = document.getElementById("projects");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } 
    };

  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top">
      <div className="container-fluid">
        {/*Logo */}
        <Link className="navbar-brand" to="/">
          <span className="logo">
            <FontAwesomeIcon icon={faL} />
          </span>
        </Link>

        {/**Nav button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                {/*Dashboard Tab */}
                <Link className="nav-link" to="/covid-project" aria-current="page">
                    Dashboard
                </Link>

                {/*Project Tab */}
                <NavLink className="nav-link" to="/" onClick={handleProjectsClick}>
                    Projects
                </NavLink>

                {/*Dynamic Tab */}
                <Link className="nav-link" to={currentPath === "/covid-project/patients" ? "/covid-project/vaccines" : "/covid-project/patients"}>
                    {currentPath === "/covid-project/patients" ? "Vaccines" : "Patients"}
                </Link>
            </div>
        </div>

      </div>
    </nav>
  );
}

export default CovidNavbar;
