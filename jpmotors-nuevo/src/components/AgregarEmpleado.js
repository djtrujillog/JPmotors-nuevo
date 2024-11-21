import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AgregarEmpleado = () => {
  const [empleados, setEmpleados] = useState([]);
  const [rolesDisponibles, setRolesDisponibles] = useState([]);
  const [form, setForm] = useState({
    Usuario: '',
    Contrasena: '',
    Nombre: '',
    Apellido: '',
    Cargo: '',
    Telefono: '',
    CorreoElectronico: '',
    Estado: '',
    RolID: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmpleadoId, setCurrentEmpleadoId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEmpleados();
    fetchRolesDisponibles();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get('https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/empleados');
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  const fetchRolesDisponibles = async () => {
    try {
      const response = await axios.get('https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/empleados/roles');
      setRolesDisponibles(response.data);
    } catch (error) {
      console.error('Error al obtener roles:', error);
    }
  };

  const fetchRolesDeEmpleado = async (empleadoId) => {
    try {
      const response = await axios.get(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/empleados/${empleadoId}/roles`);
      return response.data.length > 0 ? response.data[0].RolID : '';
    } catch (error) {
      console.error('Error al obtener roles del empleado:', error);
      return '';
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
    try {
      if (isEditing) {
        await updateEmpleado();
      } else {
        await addEmpleado();
      }
      resetForm();
      fetchEmpleados();
      setShowModal(false);
    } catch (error) {
      console.error('Error al procesar formulario:', error);
    }
  };

  const addEmpleado = async () => {
    try {
      const response = await axios.post('https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/empleados', form);
      if (form.RolID) {
        await asignarRol(response.data.results.insertId, form.RolID);
      }
    } catch (error) {
      console.error('Error al agregar empleado:', error);
    }
  };

  const updateEmpleado = async () => {
    try {
      await axios.put(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/empleados/${currentEmpleadoId}`, form);
      await asignarRol(currentEmpleadoId, form.RolID);
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
    }
  };

  const asignarRol = async (EmpleadoID, RolID) => {
    try {
      await axios.post('https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/empleados/asignar-rol', { EmpleadoID, RolID });
    } catch (error) {
      console.error('Error al asignar rol:', error);
    }
  };



  const editEmpleado = async (empleado) => {
    const rolID = await fetchRolesDeEmpleado(empleado.EmpleadoID);
    setForm({ ...empleado, RolID: rolID });
    setIsEditing(true);
    setCurrentEmpleadoId(empleado.EmpleadoID);
    setShowModal(true);
  };

  const deleteEmpleado = async (id) => {
    try {
      await axios.delete(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/empleados/${id}`);
      fetchEmpleados();
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  const handleShow = () => setShowModal(true);

  const resetForm = () => {
    setForm({
      Usuario: '',
      Contrasena: '',
      Nombre: '',
      Apellido: '',
      Cargo: '',
      Telefono: '',
      CorreoElectronico: '',
      Estado: '',
      RolID: ''
    });
    setIsEditing(false);
    setCurrentEmpleadoId(null);
  };

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
              <Form.Control as="select" name="Estado" value={form.Estado} onChange={handleInputChange}>
                <option value="">Seleccionar Estado</option>
                <option value="1">Activo</option>
                <option value="2">Inactivo</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Rol</Form.Label>
              <Form.Control as="select" name="RolID" value={form.RolID} onChange={handleInputChange}>
                <option value="">Seleccionar Rol</option>
                {rolesDisponibles.map(rol => (
                  <option key={rol.RolID} value={rol.RolID}>{rol.Nombre}</option>
                ))}
              </Form.Control>
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

export default AgregarEmpleado;
