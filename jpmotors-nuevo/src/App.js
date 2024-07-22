// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Home from "./components/Home";
import Nosotros from "./components/Nosotros";
// import Nuevos from "./components/Nuevos";
import Usados from "./components/Usados";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer"; // Asegúrate de que esta ruta sea correcta
import AutoList from "./components/Autolist.js";
import AgVehiculo from "./components/AgregarVehiculo";
import Clientes from "./components/AgregarCliente.js";
import Empleados from "./components/AgregarEmpleado.js";
import ClienteEmpleadoProductoList from "./components/ClienteEmpleadoProductoList.js"
// import Preloader from "./components/Preloader";
import logo from "./img/Logo-12.png";
import "./App.css";
import "./js/custom.js";


function App() {
  return (
    <div style={{ marginBottom: "60px" }}> 
      {/* <Preloader /> */}
      <br />
      <br />
      <br />
      <Router>
        <Navbar expand="lg" variant="light" bg="light">
          <div className="container-fluid fixed-top bg-light">
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
              <img src={logo} alt="Logo" width="20%" height="20%" className="mr-2" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />
            <Navbar.Collapse id="navbarSupportedContent">
              <Nav className="ms-auto mb-2 mb-lg-0">
                <Nav.Item>
                  <Nav.Link as={Link} to="/" className="nav-link active">
                    Inicio
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/nosotros" className="nav-link">
                    Nosotros
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/nuevos" className="nav-link">
                    Nuevos
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/agvehiculo" className="nav-link">
                    Agregar
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/contacto" className="nav-link">
                    Contacto
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/clientes" className="nav-link">
                    Clientes
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/empleados" className="nav-link">
                    Empleados
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/cotizar" className="nav-link">
                    Cotizar
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link as={Link} to="/nuevos" className="nav-link">
                    {Contacto.name}
                  </Nav.Link>
                </Nav.Item> */}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>

        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/nuevos" element={<AutoList />} />
          <Route path="/usados" element={<Usados />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/agvehiculo" element={<AgVehiculo/>}/>
          <Route path="/clientes" element={<Clientes/>}/>
          <Route path="/empleados" element={<Empleados/>}/>
          <Route path="/cotizar" element={<ClienteEmpleadoProductoList/>}/>
          
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
