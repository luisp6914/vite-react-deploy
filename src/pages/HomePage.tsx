import NavBar from "../components/NavBar";
import Home from "../components/Home";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <div>
        <NavBar></NavBar>
      </div>
      <div id="home">
        <Home></Home>
      </div>
      <div id="about">
        <About></About>
      </div>
      <div id="projects">
        <Projects></Projects>
      </div>
      <div id="contact">
        <Contact></Contact>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default HomePage;
