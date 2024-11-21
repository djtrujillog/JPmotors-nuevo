import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const DetallesVehiculoModal = ({ show, handleClose, vehiculo }) => {
  const [existingDetalles, setExistingDetalles] = useState([]); // Estado para almacenar los detalles existentes
  const [editDetalle, setEditDetalle] = useState(null); // Estado para el detalle que se está editando
  const [originalDetalle, setOriginalDetalle] = useState(null); // Estado para almacenar el valor original del detalle
  const [showEditModal, setShowEditModal] = useState(false); // Estado para mostrar/ocultar el modal de edición
  const [newDetalle, setNewDetalle] = useState(''); // Estado para el nuevo detalle a agregar

  // useEffect para obtener los detalles existentes cuando se selecciona un vehículo
  useEffect(() => {
    if (vehiculo && vehiculo.VehiculoID) {
      fetchExistingDetalles(vehiculo.VehiculoID);
    } else {
      setExistingDetalles([]); // Resetea los detalles si no hay un vehículo
    }
  }, [vehiculo]);
  

  // Función para obtener los detalles existentes desde el servidor
  const fetchExistingDetalles = async (VehiculoID) => {
    try {
      const response = await axios.get(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/vehiculos/detalleDimensiones/${VehiculoID}`);
      if (response.data && response.data.Dimensiones) {
        setExistingDetalles(response.data.Dimensiones.filter(detalle => detalle.trim() !== ''));
      } else {
        setExistingDetalles([]);
      }
    } catch (error) {
      console.error('Error al obtener los detalles existentes:', error);
    }
  };

  // Función para eliminar un detalle
  const eliminarDetalle = async (descripcion) => {
    try {
      const body = {
        VehiculoID: vehiculo.VehiculoID,
        descripcion: descripcion
      };
      await axios.post('https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/vehiculos/borrarDimensiones', body);
      const updatedDetalles = existingDetalles.filter(detalle => detalle !== descripcion);
      setExistingDetalles(updatedDetalles);
      alert('Detalle eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el detalle:', error);
      alert('Error al eliminar el detalle');
    }
  };

  // Función para abrir el modal de edición
  const openEditModal = (descripcion) => {
    setEditDetalle(descripcion);
    setOriginalDetalle(descripcion); // Guardar el valor original
    setShowEditModal(true);
  };

  // Función para cerrar el modal de edición
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditDetalle(null);
    setOriginalDetalle(null); // Limpiar el valor original
  };

  // Función para manejar la edición de un detalle
  const handleEditDetalle = async () => {
    try {
      const body = {
        VehiculoID: vehiculo.VehiculoID,
        Descripcion: editDetalle,
        originalDescripcion: originalDetalle // Enviar el valor original
      };
      await axios.put(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/vehiculos/detalleDimensiones/${encodeURIComponent(originalDetalle)}`, body);
      const updatedDetalles = existingDetalles.map(detalle => detalle === originalDetalle ? editDetalle : detalle);
      setExistingDetalles(updatedDetalles);
      alert('Detalle editado correctamente');
    } catch (error) {
      console.error('Error al editar el detalle:', error);
      alert('Error al editar el detalle');
    } finally {
      handleCloseEditModal();
    }
  };

  // Función para manejar la adición de un nuevo detalle
  const handleAgregarDetalle = async () => {
    try {
      const body = {
        VehiculoID: vehiculo.VehiculoID,
        Descripcion: newDetalle
      };
      const response = await axios.post('https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/vehiculos/detalleDimensiones', body);
      setExistingDetalles([...existingDetalles, response.data.detalleDimensiones.Descripcion]);
      setNewDetalle('');
      alert('Detalle agregado correctamente');
    } catch (error) {
      console.error('Error al agregar el detalle:', error);
      alert('Error al agregar el detalle');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Vehículo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {vehiculo ? (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ flex: '1 1 30%' }}><strong>Modelo:</strong> {vehiculo.Modelo}</div>
              <div style={{ flex: '1 1 30%' }}><strong>Marca:</strong> {vehiculo.Marca}</div>
              <div style={{ flex: '1 1 30%' }}><strong>Año:</strong> {vehiculo.Anio}</div>
            </div>
            <h3>Dimensiones del Vehiculo</h3>
            <ListGroup>
              {existingDetalles.length > 0 ? (
                existingDetalles.map((detalle, index) => (
                  <ListGroup.Item key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{detalle}</span>
                      <div>
                        <Button variant="outline-primary" size="sm" style={{ marginRight: '5px' }} onClick={() => openEditModal(detalle)}>Editar</Button>
                        <Button variant="outline-danger" size="sm" onClick={() => eliminarDetalle(detalle)}>Eliminar</Button>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <p>No hay detalles existentes para este vehículo.</p>
              )}
            </ListGroup>
            <h3>Agregar nuevos detalles Dimensiones</h3>
            <Form inline>
              <Form.Control 
                type="text" 
                value={newDetalle} 
                onChange={(e) => setNewDetalle(e.target.value)} 
                placeholder="Dimension"
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
            <Modal.Title>Editar Detalle</Modal.Title>
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

//detalle del motor



export default DetallesVehiculoModal;
