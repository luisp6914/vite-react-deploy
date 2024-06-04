import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import smoothScroll from "../hooks/smoothScroll";


//PascalCasing for components
function NavBar() {

  const {activeLink, handleScroll} = smoothScroll();

  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top">
      <div className="container-fluid">
        {/*Logo */}
        <NavLink className="navbar-brand" to="/#home" onClick={(e) => handleScroll(e, 'home')}>
          <span className="logo">
            <FontAwesomeIcon icon={faL} />
          </span>
        </NavLink>

        {/**Nav button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {/*Home Tab */}
            <NavLink className={`nav-link ${activeLink === '#home' ? 'active' : ''}`}aria-current="page"  to="/#home" onClick={(e) => handleScroll(e, 'home')}>
              Home
            </NavLink>

            {/*About Tab */}
            <NavLink className={`nav-link ${activeLink === '#about' ? 'active' : ''}`} to="/#about" onClick={(e) => handleScroll(e, 'about')}>
              About
            </NavLink>

            {/*Project Tab */}
            <NavLink className={`nav-link ${activeLink === '#projects' ? 'active' : ''}`} to="/#projects" onClick={(e) => handleScroll(e, 'projects')}>
              Projects
            </NavLink>

            {/*Resume Tab */}
            {/* <a className="nav-link" href="#resume">
              Resume
            </a> */}

            {/*Contact Tab */}
            <NavLink className={`nav-link ${activeLink === '#contact' ? 'active' : ''}`} to="/#contact" onClick={(e) => handleScroll(e, 'contact')}>
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
