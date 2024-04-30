import "./App.css";

//tema
// import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";

//núcleo
import "primereact/resources/primereact.min.css";

//iconos
import "primeicons/primeicons.css";

import Navigation from "./components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
       
        minHeight: "100vh",
      }}
    >
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
