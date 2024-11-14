import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Cotizaciones = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [showReasignarModal, setShowReasignarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [cotizacionSeleccionada, setCotizacionSeleccionada] = useState(null);
  const [empleados, setEmpleados] = useState([]);
  const [nuevoEmpleadoId, setNuevoEmpleadoId] = useState('');
  const [nuevoEstado, setNuevoEstado] = useState('');

  useEffect(() => {
    // Llamar a la API de cotizaciones
    axios.get('https://jpmotorsgt.azurewebsites.net/cotizaciones')
      .then(response => {
        setCotizaciones(response.data);
      })
      .catch(error => {
        console.error('Error fetching cotizaciones:', error);
      });

    // Llamar a la API de empleados
    axios.get('https://jpmotorsgt.azurewebsites.net/empleados')
      .then(response => {
        setEmpleados(response.data);
      })
      .catch(error => {
        console.error('Error fetching empleados:', error);
      });
  }, []);

  // Manejar el modal de reasignación
  const handleShowReasignarModal = (cotizacion) => {
    setCotizacionSeleccionada(cotizacion);
    setShowReasignarModal(true);
    console.log('Cotización seleccionada para reasignar:', cotizacion.CotizacionID);
  };

  const handleCloseReasignarModal = () => {
    setShowReasignarModal(false);
    setCotizacionSeleccionada(null);
    setNuevoEmpleadoId('');
  };

  const handleReasignar = () => {
    if (cotizacionSeleccionada && nuevoEmpleadoId) {
      console.log('Cotización a reasignar:', cotizacionSeleccionada.CotizacionID);
      console.log('Nuevo EmpleadoID:', nuevoEmpleadoId);

      const empleadoSeleccionado = empleados.find(emp => emp.EmpleadoID === parseInt(nuevoEmpleadoId));

      if (!empleadoSeleccionado) {
        console.error('No se encontró el empleado seleccionado.');
        return;
      }

      // Llamada a la API para reasignar
      axios.put(`https://jpmotorsgt.azurewebsites.net/cotizaciones/reasignarEmpleado/${cotizacionSeleccionada.CotizacionID}`, {
        EmpleadoID: nuevoEmpleadoId
      })
      .then(response => {
        console.log('Reasignación exitosa:', response.data);

        // Actualizar la lista de cotizaciones
        setCotizaciones(prevCotizaciones =>
          prevCotizaciones.map(cot =>
            cot.CotizacionID === cotizacionSeleccionada.CotizacionID
              ? { 
                  ...cot, 
                  EmpleadoID: nuevoEmpleadoId, 
                  NombreEmpleado: `${empleadoSeleccionado.Nombre} ${empleadoSeleccionado.Apellido}` 
                }
              : cot
          )
        );
        handleCloseReasignarModal();
      })
      .catch(error => {
        console.error('Error reasignando cotización:', error);
      });
    }
  };

  // Manejar el modal de edición
  const handleShowEditarModal = (cotizacion) => {
    setCotizacionSeleccionada(cotizacion);
    setNuevoEmpleadoId(cotizacion.EmpleadoID);
    setNuevoEstado(cotizacion.EstadoCotizacion);
    setShowEditarModal(true);
    console.log('Cotización seleccionada para editar:', cotizacion.CotizacionID);
  };

  const handleCloseEditarModal = () => {
    setShowEditarModal(false);
    setCotizacionSeleccionada(null);
    setNuevoEmpleadoId('');
    setNuevoEstado('');
  };

  const handleEditar = () => {
    if (cotizacionSeleccionada && nuevoEmpleadoId && nuevoEstado) {
      console.log('Cotización a editar:', cotizacionSeleccionada.CotizacionID);
      console.log('Nuevo EmpleadoID:', nuevoEmpleadoId);
      console.log('Nuevo Estado:', nuevoEstado);

      const empleadoSeleccionado = empleados.find(emp => emp.EmpleadoID === parseInt(nuevoEmpleadoId));

      if (!empleadoSeleccionado) {
        console.error('No se encontró el empleado seleccionado.');
        return;
      }

      // Llamada a la API para editar la cotización
      axios.put(`https://jpmotorsgt.azurewebsites.net/cotizaciones/modificarseparado/${cotizacionSeleccionada.CotizacionID}`, {
        EmpleadoID: nuevoEmpleadoId,
        EstadoCotizacion: nuevoEstado
      })
      .then(response => {
        console.log('Edición exitosa:', response.data);

        // Actualizar la lista de cotizaciones
        setCotizaciones(prevCotizaciones =>
          prevCotizaciones.map(cot =>
            cot.CotizacionID === cotizacionSeleccionada.CotizacionID
              ? { 
                  ...cot, 
                  EmpleadoID: nuevoEmpleadoId, 
                  EstadoCotizacion: nuevoEstado, 
                  NombreEmpleado: `${empleadoSeleccionado.Nombre} ${empleadoSeleccionado.Apellido}` 
                }
              : cot
          )
        );
        handleCloseEditarModal();
      })
      .catch(error => {
        console.error('Error editando cotización:', error);
      });
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">Lista de Cotizaciones</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th># Cotización</th>
            <th>Fecha Cotización</th>
            <th>Estado</th>
            <th>Cliente</th>
            <th>Vehículo</th>
            <th>Empleado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cotizaciones.map(cotizacion => (
            <tr key={cotizacion.CotizacionID}>
              <td>{cotizacion.CotizacionID}</td>
              <td>{cotizacion.FechaCotizacion}</td>
              <td>{cotizacion.EstadoCotizacion}</td>
              <td>{cotizacion.NombreCliente}</td>
              <td>{cotizacion.VehiculoDescripcion}</td>
              <td>{cotizacion.NombreEmpleado}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowReasignarModal(cotizacion)}>
                  Reasignar
                </Button>
                <Button variant="warning" onClick={() => handleShowEditarModal(cotizacion)} className="ml-2">
                  Cambiar Estado
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de reasignación */}
      <Modal show={showReasignarModal} onHide={handleCloseReasignarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reasignar Cotización</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cotizacionSeleccionada && (
            <Form>
              <Form.Group controlId="formEmpleadoReasignar">
                <Form.Label>Seleccionar Empleado</Form.Label>
                <Form.Control
                  as="select"
                  value={nuevoEmpleadoId}
                  onChange={(e) => setNuevoEmpleadoId(e.target.value)}
                >
                  <option value="">Selecciona un empleado</option>
                  {empleados.map(empleado => (
                    <option key={empleado.EmpleadoID} value={empleado.EmpleadoID}>
                      {empleado.Nombre} {empleado.Apellido}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReasignarModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleReasignar}>
            Reasignar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de edición */}
      <Modal show={showEditarModal} onHide={handleCloseEditarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cotización</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cotizacionSeleccionada && (
            <Form>
              <Form.Group controlId="formEmpleadoEditar">
                {/* <Form.Label>Seleccionar Empleado</Form.Label>
                <Form.Control
                  as="select"
                  value={nuevoEmpleadoId}
                  onChange={(e) => setNuevoEmpleadoId(e.target.value)}
                >
                  <option value="">Selecciona un empleado</option>
                  {empleados.map(empleado => (
                    <option key={empleado.EmpleadoID} value={empleado.EmpleadoID}>
                      {empleado.Nombre} {empleado.Apellido}
                    </option>
                  ))}
                </Form.Control> */}
              </Form.Group>
              <Form.Group controlId="formEstadoEditar">
                <Form.Label>Estado de Cotización</Form.Label>
                <Form.Control
                  as="select"
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                >
                  <option value="">Selecciona el estado</option>
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                  <option value="Finalizada">Finalizada</option>

                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditarModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleEditar}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cotizaciones;
