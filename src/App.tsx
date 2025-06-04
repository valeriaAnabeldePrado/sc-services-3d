import { About } from "./components/About";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { Sponsors } from "./components/Sponsors";
//@ts-expect-error becouse is a jsx file
import Edificio from "./components/3d/Edificio";
//@ts-expect-error becouse is a jsx file
import Departamento from "./components/3d/Departamento";

import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Sponsors />
              <About />
              <HowItWorks />
              <Features />
              <Footer />
            </>
          }
        />
        <Route path="/edificio" element={<Edificio />} />
        <Route path="/departamento" element={<Departamento />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
