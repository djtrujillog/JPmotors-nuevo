import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    Nombre: '',
    Apellido: '',
    Direccion: '',
    Telefono: '',
    CorreoElectronico: '',
    Estado: '',
    Documento: '',
    Nit: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentClienteId, setCurrentClienteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
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
      await updateCliente();
    } else {
      await addCliente();
    }
    setForm({
      Nombre: '',
      Apellido: '',
      Direccion: '',
      Telefono: '',
      CorreoElectronico: '',
      Estado: '',
      Documento: '',
      Nit: ''
    });
    setIsEditing(false);
    setCurrentClienteId(null);
    fetchClientes();
    setShowModal(false);
  };

  const addCliente = async () => {
    try {
      await axios.post('http://localhost:4000/clientes', form);
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  };

  const updateCliente = async () => {
    try {
      await axios.put(`http://localhost:4000/clientes/${currentClienteId}`, form);
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
    }
  };

  const editCliente = (cliente) => {
    setForm(cliente);
    setIsEditing(true);
    setCurrentClienteId(cliente.ClienteID);
    setShowModal(true);
  };

  const deleteCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/clientes/${id}`);
      fetchClientes();
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentClienteId(null);
    setForm({
      Nombre: '',
      Apellido: '',
      Direccion: '',
      Telefono: '',
      CorreoElectronico: '',
      Estado: '',
      Documento: '',
      Nit: ''
    });
  };

  const handleShow = () => setShowModal(true);

  return (
    <div className="container">
      <h1 className="my-4">Gestión de Clientes</h1>
      <Button variant="primary" onClick={handleShow}>
        Agregar Cliente
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Cliente' : 'Agregar Cliente'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="Nombre" value={form.Nombre} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" name="Apellido" value={form.Apellido} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" name="Direccion" value={form.Direccion} onChange={handleInputChange} />
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
            <Form.Group>
              <Form.Label>Documento</Form.Label>
              <Form.Control type="text" name="Documento" value={form.Documento} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nit</Form.Label>
              <Form.Control type="text" name="Nit" value={form.Nit} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditing ? 'Actualizar' : 'Agregar'} Cliente
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ul className="list-group mt-4">
        {clientes.map(cliente => (
          <li key={cliente.ClienteID} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{cliente.Nombre} {cliente.Apellido} - {cliente.CorreoElectronico}</span>
            <div>
              <Button variant="secondary" size="sm" className="mr-2" onClick={() => editCliente(cliente)}>Editar</Button>
              <Button variant="danger" size="sm" onClick={() => deleteCliente(cliente.ClienteID)}>Eliminar</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clientes;
