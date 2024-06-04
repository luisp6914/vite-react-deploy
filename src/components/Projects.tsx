import { faHospital } from '@fortawesome/free-regular-svg-icons';
import { faCloud, faComputer, faMoneyBillTrendUp, faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
//PascalCasing for components 
function Projects(){
    useEffect(() => {
      const handleScroll = () => {
        const elements = document.querySelectorAll(".fade-in");
        elements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom >= 0) {
            element.classList.add("visible");
          } else {
            element.classList.remove("visible");
          }
        });
      };

      window.addEventListener("scroll", handleScroll);

      // Trigger the scroll handler to check the initial position
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);


    const projects = [
        {class: 'covidProject', icon: faHospital, name: 'Covid Project', discription: 'Developed an online system to help a hypothetical local hospital for its COVID vaccination effort. The system will keep track of both patient and vaccine information for the hospital', path: '/covid-project'},
        {class: 'pcPartPicker', icon: faComputer, name: 'PC Part Picker', discription: 'Developed an interface where users can select different PC parts from a given list. The price for the selected PC components are then displayed at checkout.', path: '/pc-part-picker'},
        {class: 'teslaStockProject', icon: faMoneyBillTrendUp, name: 'Tesla Stocks Project', discription: 'Developed a program that reads and processes historic stock data for the Tesla Company. The data is extracted from a .csv file and then processed to display the information.', path: '/tesla-stocks-project'},
        {class: 'linkedList', icon: faVectorSquare, name: '2D Liked List Project', discription: 'Developed a generic program that accepts an array list of information and turns it into 2D Linked List data structure.', path: '/linked-list'},
        {class: 'dijiKeyAPI', icon: faCloud, name: 'DijiKey API', discription: 'Developed an Express.js Server Application. The Server Application interacts with DijiKey API and stores data on a Mongo Atlas Cloud Database.', path: '/digikey-api'}
    ]

    return(
        <div className="container">
            <h1>Projects</h1>
            <div className="projects row">
                {projects.map((project, index) => (
                    <div key={index} className="card project col-md-4 fade-in" style={{width: '400px', height: '350px'}}>
                        <div className={`icon-container ${project.class}`}>
                            <FontAwesomeIcon icon={project.icon} className='fa-icon'></FontAwesomeIcon>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">{project.name}</h3>
                            <p className="card-text">{project.discription}</p>
                            <Link className="btn btn-primary rounded-pill try-it" to={project.path}>Try It</Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Projects;