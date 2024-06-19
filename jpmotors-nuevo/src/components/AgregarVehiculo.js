import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Container, Form, Button, ListGroup, Modal } from 'react-bootstrap';

const AgregarVehiculo = () => {
  const { register, handleSubmit, reset } = useForm();
  const [vehiculos, setVehiculos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVehiculo, setEditingVehiculo] = useState(null);

  // Obtener la lista de vehículos al cargar el componente
  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await axios.get('http://localhost:4000/vehiculos');
        setVehiculos(response.data);
      } catch (error) {
        console.error('Error al obtener vehículos:', error);
      }
    };

    fetchVehiculos();
  }, []);

  // Manejar cambio de archivo seleccionado
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Abrir modal para editar vehículo
  const openEditModal = (vehiculo) => {
    setEditingVehiculo(vehiculo);
    setShowEditModal(true);
  };

  // Cerrar modal de edición
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingVehiculo(null);
  };

  // Abrir modal para agregar vehículo
  const openAddModal = () => {
    setShowAddModal(true);
  };

  // Cerrar modal de agregar vehículo
  const closeAddModal = () => {
    setShowAddModal(false);
    reset(); // Limpiar formulario al cerrar modal
  };

  // Manejar envío del formulario para agregar un nuevo vehículo
  const onSubmitAdd = async (data) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    try {
      const response = await axios.post('http://localhost:4000/vehiculos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Agregar el nuevo vehículo a la lista después de crearlo
      setVehiculos([...vehiculos, response.data.vehiculo]);
      // Cerrar modal y limpiar formulario después de agregar
      closeAddModal();
    } catch (error) {
      console.error('Error al agregar vehículo:', error);
    }
  };

  // Manejar envío del formulario para editar un vehículo
  const onSubmitEdit = async (data) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    try {
      const response = await axios.put(`http://localhost:4000/vehiculos/${editingVehiculo.VehiculoID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Actualizar la lista de vehículos después de editar uno
      const updatedVehiculos = vehiculos.map(v => (v.VehiculoID === editingVehiculo.VehiculoID ? response.data : v));
      setVehiculos(updatedVehiculos);
      // Cerrar modal y limpiar formulario después de editar
      closeEditModal();
    } catch (error) {
      console.error('Error al editar vehículo:', error);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Agregar y Editar Vehículos</h2>

      {/* Botón para agregar nuevo vehículo */}
      <Button variant="primary" className="mb-3" onClick={openAddModal}>
        Agregar Vehículo
      </Button>

      {/* Listado de Vehículos */}
      <ListGroup className="mb-4">
        {vehiculos.map((vehiculo) => (
          <ListGroup.Item key={vehiculo.VehiculoID} className="d-flex justify-content-between align-items-center">
            {vehiculo.Modelo} - {vehiculo.Marca}
            <Button variant="outline-primary" size="sm" onClick={() => openEditModal(vehiculo)}>Editar</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal para Editar Vehículo */}
      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Vehículo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmitEdit)}>
            {/* Campos del formulario de edición (ya mostrado en la respuesta anterior) */}
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para Agregar Vehículo */}
      <Modal show={showAddModal} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Vehículo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmitAdd)}>
            <Form.Group>
              <Form.Label>Modelo:</Form.Label>
              <Form.Control type="text" {...register('Modelo', { required: true })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Marca:</Form.Label>
              <Form.Control type="text" {...register('Marca', { required: true })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Año:</Form.Label>
              <Form.Control type="text" {...register('Anio', { required: true })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Precio Gerente:</Form.Label>
              <Form.Control type="text" {...register('PrecioGerente', { required: true })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Precio Web:</Form.Label>
              <Form.Control type="text" {...register('PrecioWeb', { required: true })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Precio Lista:</Form.Label>
              <Form.Control type="text" {...register('PrecioLista', { required: true })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Marca ID:</Form.Label>
              <Form.Control type="text" {...register('MarcaID', { required: true })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Condición:</Form.Label>
              <Form.Control type="text" {...register('Condicion', { required: true })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Imagen:</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>

            <Button variant="primary" type="submit">Agregar Vehículo</Button>
          </Form>
        </Modal.Body>
      </Modal>

    </Container>
  );
};

export default AgregarVehiculo;
