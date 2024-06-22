import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//PascalCasing for component
function Footer() {
  return (
    <footer className="pb-3 mb-4">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <a href="https://www.linkedin.com/in/luis-perez-5941b91a5/" className="nav-link px-2">
          <FontAwesomeIcon icon={faLinkedin} style={{width: '40px', height: '40px', color: "#1387fa"}}></FontAwesomeIcon>
          </a>
        </li>
        <li className="nav-item repoLink">
          <a href="https://github.com/luisp6914" className="nav-link px-2 ">
            <FontAwesomeIcon icon={faGithubSquare} style={{width: '40px', height: '40px', color: '#8a63d2'}}></FontAwesomeIcon>
          </a>
        </li>
      </ul>
      <p className="text-center text-body-secondary" style={{fontFamily: "time"}}>By Luis Perez</p>
    </footer>
  );
}

export default Footer;
