import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [form, setForm] = useState({
    Usuario: '',
    Contrasena: '',
    Nombre: '',
    Apellido: '',
    Cargo: '',
    Telefono: '',
    CorreoElectronico: '',
    Estado: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmpleadoId, setCurrentEmpleadoId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get('http://localhost:4000/empleados');
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateEmpleado();
    } else {
      await addEmpleado();
    }
    setForm({
      Usuario: '',
      Contrasena: '',
      Nombre: '',
      Apellido: '',
      Cargo: '',
      Telefono: '',
      CorreoElectronico: '',
      Estado: ''
    });
    setIsEditing(false);
    setCurrentEmpleadoId(null);
    fetchEmpleados();
    setShowModal(false);
  };

  const addEmpleado = async () => {
    try {
      await axios.post('http://localhost:4000/empleados', form);
    } catch (error) {
      console.error('Error al agregar empleado:', error);
    }
  };

  const updateEmpleado = async () => {
    try {
      await axios.put(`http://localhost:4000/empleados/${currentEmpleadoId}`, form);
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
    }
  };

  const editEmpleado = (empleado) => {
    setForm(empleado);
    setIsEditing(true);
    setCurrentEmpleadoId(empleado.EmpleadoID);
    setShowModal(true);
  };

  const deleteEmpleado = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/empleados/${id}`);
      fetchEmpleados();
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentEmpleadoId(null);
    setForm({
      Usuario: '',
      Contrasena: '',
      Nombre: '',
      Apellido: '',
      Cargo: '',
      Telefono: '',
      CorreoElectronico: '',
      Estado: ''
    });
  };

  const handleShow = () => setShowModal(true);

  return (
    <div className="container">
      <h1 className="my-4">Gestión de Empleados</h1>
      <Button variant="primary" onClick={handleShow}>
        Agregar Empleado
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Empleado' : 'Agregar Empleado'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" name="Usuario" value={form.Usuario} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="Contrasena" value={form.Contrasena} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="Nombre" value={form.Nombre} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" name="Apellido" value={form.Apellido} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cargo</Form.Label>
              <Form.Control type="text" name="Cargo" value={form.Cargo} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" name="Telefono" value={form.Telefono} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" name="CorreoElectronico" value={form.CorreoElectronico} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Control type="text" name="Estado" value={form.Estado} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditing ? 'Actualizar' : 'Agregar'} Empleado
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ul className="list-group mt-4">
        {empleados.map(empleado => (
          <li key={empleado.EmpleadoID} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{empleado.Nombre} {empleado.Apellido} - {empleado.CorreoElectronico}</span>
            <div>
              <Button variant="secondary" size="sm" className="mr-2" onClick={() => editEmpleado(empleado)}>Editar</Button>
              <Button variant="danger" size="sm" onClick={() => deleteEmpleado(empleado.EmpleadoID)}>Eliminar</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Empleados;
