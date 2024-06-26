import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const DetallesVehiculoExteriorModal = ({ show, handleClose, vehiculo }) => {
  const [existingDetalles, setExistingDetalles] = useState([]);
  const [editDetalle, setEditDetalle] = useState(null);
  const [originalDetalle, setOriginalDetalle] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newDetalle, setNewDetalle] = useState('');

  useEffect(() => {
    if (vehiculo && vehiculo.VehiculoID) {
      fetchExistingDetalles(vehiculo.VehiculoID);
    }
  }, [vehiculo]);

  const fetchExistingDetalles = async (VehiculoID) => {
    try {
      const response = await axios.get(`http://localhost:4000/vehiculos/detalleExterior/${VehiculoID}`);
      if (response.data) {
        setExistingDetalles(response.data.filter(detalle => detalle.Descripcion.trim() !== ''));
      } else {
        setExistingDetalles([]);
      }
    } catch (error) {
      console.error('Error al obtener los detalles existentes de exterior:', error);
    }
  };

  const eliminarDetalle = async (descripcion) => {
    try {
      const body = {
        VehiculoID: vehiculo.VehiculoID,
        descripcion: descripcion
      };
      await axios.post('http://localhost:4000/vehiculos/eliminarExterior', body);
      const updatedDetalles = existingDetalles.filter(detalle => detalle.Descripcion !== descripcion);
      setExistingDetalles(updatedDetalles);
      alert('Detalle de exterior eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el detalle de exterior:', error);
      alert('Error al eliminar el detalle de exterior');
    }
  };

  const openEditModal = (descripcion) => {
    setEditDetalle(descripcion);
    setOriginalDetalle(descripcion);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditDetalle(null);
    setOriginalDetalle(null);
  };

  const handleEditDetalle = async () => {
    try {
      const body = {
        VehiculoID: vehiculo.VehiculoID,
        Descripcion: editDetalle,
        originalDescripcion: originalDetalle
      };
      await axios.put(`http://localhost:4000/vehiculos/detalleExterior/${encodeURIComponent(originalDetalle)}`, body);
      const updatedDetalles = existingDetalles.map(detalle => detalle.Descripcion === originalDetalle ? { ...detalle, Descripcion: editDetalle } : detalle);
      setExistingDetalles(updatedDetalles);
      alert('Detalle de exterior editado correctamente');
    } catch (error) {
      console.error('Error al editar el detalle de exterior:', error);
      alert('Error al editar el detalle de exterior');
    } finally {
      handleCloseEditModal();
    }
  };

  const handleAgregarDetalle = async () => {
    try {
      const body = {
        VehiculoID: vehiculo.VehiculoID,
        Descripcion: newDetalle
      };
      const response = await axios.post('http://localhost:4000/vehiculos/detalleExterior', body);
      setExistingDetalles([...existingDetalles, response.data.detalleExterior]);
      setNewDetalle('');
      alert('Detalle de exterior agregado correctamente');
    } catch (error) {
      console.error('Error al agregar el detalle de exterior:', error);
      alert('Error al agregar el detalle de exterior');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Detalles de Exterior del Vehículo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {vehiculo ? (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ flex: '1 1 30%' }}><strong>Modelo:</strong> {vehiculo.Modelo}</div>
              <div style={{ flex: '1 1 30%' }}><strong>Marca:</strong> {vehiculo.Marca}</div>
              <div style={{ flex: '1 1 30%' }}><strong>Año:</strong> {vehiculo.Anio}</div>
            </div>
            <h3>Detalles de Exterior</h3>
            <ListGroup>
              {existingDetalles.length > 0 ? (
                existingDetalles.map((detalle, index) => (
                  <ListGroup.Item key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{detalle.Descripcion}</span>
                      <div>
                        <Button variant="outline-primary" size="sm" style={{ marginRight: '5px' }} onClick={() => openEditModal(detalle.Descripcion)}>Editar</Button>
                        <Button variant="outline-danger" size="sm" onClick={() => eliminarDetalle(detalle.Descripcion)}>Eliminar</Button>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <p>No hay detalles de exterior existentes para este vehículo.</p>
              )}
            </ListGroup>
            <h3>Agregar nuevos detalles de Exterior</h3>
            <Form inline>
              <Form.Control 
                type="text" 
                value={newDetalle} 
                onChange={(e) => setNewDetalle(e.target.value)} 
                placeholder="Descripción de Exterior"
              />
              <Button 
                variant="primary" 
                onClick={handleAgregarDetalle} 
                style={{ marginLeft: '10px' }}
              >
                Agregar
              </Button>
            </Form>
          </>
        ) : (
          <p>Selecciona un vehículo para ver los detalles.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        {/* Modal para editar detalle */}
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Detalle de Exterior</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control type="text" value={editDetalle || ''} onChange={(e) => setEditDetalle(e.target.value)} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleEditDetalle}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </Modal.Footer>
    </Modal>
  );
};

export default DetallesVehiculoExteriorModal;
