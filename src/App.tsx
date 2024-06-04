import { Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Covid from "./pages/covidProject/Covid";
import Patients from "./pages/covidProject/Patients";
import Vaccine from "./pages/covidProject/Vaccine";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/covid-project" element= {<Covid/>}/>
      <Route path="/covid-project/patients" element={<Patients/>}/>
      <Route path="/covid-project/vaccines" element={<Vaccine/>}/>
      <Route path="/pc-part-picker"/>
      <Route path="/tesla-stocks-project"/>
      <Route path="/linked-list"/>
      <Route path="/digikey-api"/>
    </Routes>
  );
}

export default App;

