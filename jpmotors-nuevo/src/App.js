// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Home from "./components/Home";
import Nosotros from "./components/Nosotros";
import AutolistUsados from "./components/AutolistUsados";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer"; 
import AutoList from "./components/Autolist.js";
import AgVehiculo from "./components/AgregarVehiculo";
import Clientes from "./components/AgregarCliente.js";
import Empleados from "./components/AgregarEmpleado.js";
import Calendario from "./components/Calendario.js";
import Reportes from "./components/Reportes.js";
import Reasignar from "./components/Reasignacion.js";
import ClienteEmpleadoProductoList from "./components/ClienteEmpleadoProductoList.js";
import MisReportes from "./components/misReportes.js";
import Marcas from "./components/marcas.js";
import Login from "./components/Login";
import logo from "./img/Logo-12.png";
import "./App.css";
import "./js/custom.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [auth, setAuth] = useState(false);
  const [roles, setRoles] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [showLogin, setShowLogin] = useState(false);
  const [expanded, setExpanded] = useState(false); // Estado para el control del menú


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
  // eslint-disable-next-line no-unused-vars
  const handleLoginShow = () => setShowLogin(true);

  const handleNavClick = () => {
    setExpanded(false); // Cierra el menú al hacer clic en una opción
  };

  return (
    <div style={{ marginBottom: "60px" }}>
      <br />
      <br />
      <br />

      {/* Botón flotante de WhatsApp */}
      <a 
  href="https://api.whatsapp.com/send?phone=50250601959&text=%C2%A1Hola%21%2C%20me%20gustar%C3%ADa%20consultar%20informaci%C3%B3n%20acerca%20de%20un%20veh%C3%ADculo." 
  target="_blank" 
  rel="noopener noreferrer" 
  className="whatsapp-btn"
>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-whatsapp" viewBox="0 0 16 16">
  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
</svg>
</a>

      <Router>
      <Navbar expand="lg" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
      <div className="container-fluid fixed-top bg-light">
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
              <img src={logo} alt="Logo" width="20%" height="20%" className="mr-2" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />
            <Navbar.Collapse id="navbarSupportedContent">
              <Nav className="ms-auto mb-2 mb-lg-0">
                <Nav.Item>
                  <Nav.Link as={Link} to="/" className="nav-link active" onClick={handleNavClick}>
                    Inicio
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/nosotros" className="nav-link" onClick={handleNavClick}>
                    Nosotros
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/nuevos" className="nav-link" onClick={handleNavClick}>
                    Nuevos
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/usados" className="nav-link" onClick={handleNavClick}>
                    Usados
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/contacto" className="nav-link" onClick={handleNavClick}>
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
                          <NavDropdown.Item as={Link} to="/empleados" onClick={handleNavClick}>Administrar Empleados</NavDropdown.Item>
                        )}
                          <NavDropdown.Item as={Link} to="/clientes"onClick={handleNavClick}>Administrar Clientes</NavDropdown.Item>
                          {roles.includes('Admin') && (
                            <NavDropdown.Item as={Link} to="/agvehiculo"onClick={handleNavClick}>Agregar Vehiculo</NavDropdown.Item>
                          )} {roles.includes('Admin') && (
                            <NavDropdown.Item as={Link} to="/reportes"onClick={handleNavClick}>Reportes de Seguimientos</NavDropdown.Item>
                          )} {roles.includes('Admin') && (
                            <NavDropdown.Item as={Link} to="/marcas" onClick={handleNavClick}>Marcas</NavDropdown.Item>
                          )}{(roles.includes('Admin') || roles.includes('User')) && (
                            <NavDropdown.Item as={Link} to="/misreportes" onClick={handleNavClick}>Mis Reportes de Seguimiento</NavDropdown.Item>
                          )}
                          
                        </NavDropdown>
                        <NavDropdown title="Seguimientos" id="seguimientosDropdown">
                          <NavDropdown.Item as={Link} to="/cotizar" onClick={handleNavClick}>Cartera</NavDropdown.Item>
                          {roles.includes('Admin') && (
                          <NavDropdown.Item as={Link} to="/reasignar" onClick={handleNavClick}>Reasingar</NavDropdown.Item>
                          )}
                        </NavDropdown>
                       
                      </>
                    )}
                    <Nav.Item>
                      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
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
          <Route path="/usados" element={<AutolistUsados />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/misreportes" element={<MisReportes />} />
          
          
          {auth && (
            <>
              {roles.includes('Admin') && (
                <>
                  <Route path="/agvehiculo" element={<AgVehiculo />} />
                  <Route path="/empleados" element={<Empleados />} />
                  <Route path="/reasignar" element={<Reasignar />} />
                  <Route path="/marcas" element={<Marcas />} />
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
