import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuth, handleClose }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post('https://jpmotorsgt.azurewebsites.net/auth/signin', { usuario, contrasena })
      .then(res => {
        // Almacenar la información en el localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('roles', JSON.stringify(res.data.roles));
        localStorage.setItem('userId', res.data.id);
        localStorage.setItem('nombre', res.data.nombre);
        localStorage.setItem('apellido', res.data.apellido);

        // Actualizar el estado de autenticación y cerrar el modal
        setAuth(true);
        handleClose();
        
        // Redirigir a la página de inicio después de iniciar sesión
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        setError('Usuario o contraseña incorrectos');
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Modal show={true} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group controlId="formUsuario">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ingrese su usuario" 
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)} 
                  />
                </Form.Group>
                <Form.Group controlId="formContrasena" className="mt-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Ingrese su contraseña" 
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)} 
                  />
                </Form.Group>
                <Button onClick={handleLogin} className="mt-4 w-100 custom-btn">
                  Iniciar Sesión
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
