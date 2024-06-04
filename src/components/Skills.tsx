import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCss3, faGithub, faHtml5, faJava, faNode, faPython, faReact, faJs,  } from "@fortawesome/free-brands-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
//PascalCasing for components
function Skills(){
    const skills = [
        {icon: faHtml5, color: '#E34F26', name: 'HTML', progress: 30, years: '3 Years'},
        {icon: faCss3, color: '#1572B6', name: 'CSS', progress: 20, years: '2 Years'},
        {icon: faJs, color: '#F0DB4F', name: 'JavaScript', progress: 10, years: '1 Year'},
        {icon: faJava, color: '#007396', name: 'Java', progress: 40, years: '4 Years'},
        {icon: faDatabase, color: '#00758F', name: 'SQL', progress: 20, years: '2 Years'},
        {icon: faPython, color: '#3776AB', name: 'Python', progress: 20, years: '2 Years'},
        {icon: faGithub, color: '#181717', name: 'GitHub', progress: 10, years: '1 Year'},
        {icon: faDatabase, color: '#47A248', name: 'MongoDb', progress: 5, years: '1/2 Year'},
        {icon: faReact, color: '#61DAFB', name: 'React', progress: 5, years: '1/2 Year'},
        {icon: faNode, color: '#339933', name: 'Node', progress: 10, years: '1 Year'}
    ];

    return (
      <div className="skills">
        <h3>Skills</h3>
        {skills.map((skill, index) => (
          <div key={index} className="skill">
            <FontAwesomeIcon icon={skill.icon} style={{ fontSize: "35px", color: skill.color }} />
            <div className='textAndBar'>
                <p>{skill.name}</p>
                <div className="progress">
                  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={skill.progress} aria-valuemin={0} aria-valuemax={100} style={{ width: `${skill.progress}%` }}>
                    {skill.years}
                  </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    );
}

export default Skills;

