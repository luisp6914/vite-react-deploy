import Footer from "../../components/Footer";
import CovidNavbar from "./CovidNavbar";
import Widgets from "./Widgets";

function Vaccine() {
    return (
        <>
          <div>
              <CovidNavbar />
          </div>
          <div style={{marginTop: "5rem"}}>
              <Widgets></Widgets>
          </div>
          <div>
            <Footer></Footer>
          </div>
        </>
      );
}

export default Vaccine;
