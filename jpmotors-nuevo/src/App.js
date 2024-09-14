// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Home from "./components/Home";
import Nosotros from "./components/Nosotros";
import Usados from "./components/Usados";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer"; 
import AutoList from "./components/Autolist.js";
import AgVehiculo from "./components/AgregarVehiculo";
import Clientes from "./components/AgregarCliente.js";
import Empleados from "./components/AgregarEmpleado.js";
import Calendario from "./components/Calendario.js";
import Reportes from "./components/Reportes.js";
import ClienteEmpleadoProductoList from "./components/ClienteEmpleadoProductoList.js";
import MisReportes from "./components/misReportes.js";
import Login from "./components/Login";
import logo from "./img/Logo-12.png";
import "./App.css";
import "./js/custom.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [auth, setAuth] = useState(false);
  const [roles, setRoles] = useState([]);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRoles = localStorage.getItem('roles');
    if (token && storedRoles) {
      setAuth(true);
      try {
        const parsedRoles = JSON.parse(storedRoles);
        setRoles(parsedRoles);
      } catch (error) {
        console.error("Failed to parse roles from localStorage", error);
        setRoles([]);
      }
    }
  }, [auth]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    setAuth(false);
    setRoles([]);
  };

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  return (
    <div style={{ marginBottom: "60px" }}>
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
                  <Nav.Link as={Link} to="/contacto" className="nav-link">
                    Contacto
                  </Nav.Link>
                </Nav.Item>
                {auth && (
                  <>
                    {(roles.includes('Admin') || roles.includes('User')) && (
                      <>
                       <Nav.Item>
                          <Nav.Link as={Link} to="/calendario" className="nav-link">
                            Calendario
                          </Nav.Link>
                        </Nav.Item>
                        <NavDropdown title="Administrar" id="adminDropdown">
                        {roles.includes('Admin') && (
                          <NavDropdown.Item as={Link} to="/empleados">Empleados</NavDropdown.Item>
                        )}
                          <NavDropdown.Item as={Link} to="/clientes">Clientes</NavDropdown.Item>
                          {roles.includes('Admin') && (
                            <NavDropdown.Item as={Link} to="/agvehiculo">Agregar</NavDropdown.Item>
                          )} {roles.includes('Admin') && (
                            <NavDropdown.Item as={Link} to="/reportes">Reportes</NavDropdown.Item>
                          )}{(roles.includes('Admin') || roles.includes('User')) && (
                            <NavDropdown.Item as={Link} to="/misreportes">Mis Reportes</NavDropdown.Item>
                          )}
                          
                        </NavDropdown>
                        <NavDropdown title="Seguimientos" id="seguimientosDropdown">
                          <NavDropdown.Item as={Link} to="/cotizar">Cartera</NavDropdown.Item>
                        </NavDropdown>
                       
                      </>
                    )}
                    <Nav.Item>
                      <Nav.Link onClick={handleLogout} className="nav-link">
                        Logout
                      </Nav.Link>
                    </Nav.Item>
                  </>
                )}
                {!auth && (
                  <Nav.Item>
                    {/* <Nav.Link as={Link} to="/login" className="nav-link">
                      Login
                    </Nav.Link> */}
                  </Nav.Item>
                )}
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
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/misreportes" element={<MisReportes />} />
          
          {auth && (
            <>
              {roles.includes('Admin') && (
                <>
                  <Route path="/agvehiculo" element={<AgVehiculo />} />
                  <Route path="/empleados" element={<Empleados />} />
                </>
              )}
              {(roles.includes('Admin') || roles.includes('User')) && (
                <>
                  <Route path="/clientes" element={<Clientes />} />
                  <Route path="/cotizar" element={<ClienteEmpleadoProductoList />} />
                  <Route path="/calendario" element={<Calendario />} />
                  <Route path="/misreportes" element={<MisReportes />} />
                </>
              )}
            </>
          )}
          <Route path="/login" element={<Login setAuth={setAuth} handleClose={handleLoginClose} />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
