import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importar el plugin de autoTable

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
  const [search, setSearch] = useState(''); // Estado para el filtro de búsqueda

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/clientes');
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
    if (!form.Nombre || !form.Apellido) {
      alert('Nombre y Apellido son obligatorios');
      return;
    }
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
      await axios.post('https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/clientes', form);
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  };

  const updateCliente = async () => {
    try {
      await axios.put(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/clientes/${currentClienteId}`, form);
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
      await axios.delete(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/clientes/${id}`);
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

  // Filtrar clientes basado en el valor del filtro
  const filteredClientes = clientes.filter((cliente) => 
    cliente.Nombre.toLowerCase().includes(search.toLowerCase()) || 
    cliente.Apellido.toLowerCase().includes(search.toLowerCase()) || 
    cliente.CorreoElectronico.toLowerCase().includes(search.toLowerCase())
  );

  // Generar el reporte en PDF con los clientes filtrados
  const generateReport = () => {
    const doc = new jsPDF();

    // Título del reporte
    doc.setFontSize(18);
    doc.text('Clientes JP Motors GT', 10, 10);

    // Crear la tabla de clientes usando autoTable
    const tableColumn = ["Nombre", "Apellido", "Dirección", "Teléfono", "Correo", "Estado", "Documento", "Nit"];
    const tableRows = [];

    filteredClientes.forEach(cliente => {
      const clienteData = [
        cliente.Nombre,
        cliente.Apellido,
        cliente.Direccion || "N/A",     // Mostrar "N/A" si no hay valor
        cliente.Telefono || "N/A",
        cliente.CorreoElectronico || "N/A",
        cliente.Estado || "N/A",
        cliente.Documento || "N/A",
        cliente.Nit || "N/A"
      ];
      tableRows.push(clienteData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 }); // Generar la tabla

    doc.save('reporte_clientes.pdf'); // Descarga el archivo PDF
  };

  return (
    <div className="container">
      <h1 className="my-4">Gestión de Clientes</h1>
      
      {/* Input de búsqueda */}
      <Form.Control 
        type="text" 
        placeholder="Buscar cliente por nombre, apellido o correo" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="mb-3"
      />

      <Button variant="primary" onClick={handleShow}>
        Agregar Cliente
      </Button>
      <Button variant="info" className="ml-3" onClick={generateReport}>
        Generar Reporte PDF
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
              <Form.Select name="Estado" value={form.Estado} onChange={handleInputChange}>
                <option value="">Selecciona un estado</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Select>
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

      {/* Listado de clientes filtrados */}
      <ul className="list-group mt-4">
        {filteredClientes.map(cliente => (
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
