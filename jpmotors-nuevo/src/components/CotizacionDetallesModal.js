import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import axios from "axios";

const CotizacionDetallesModal = ({ cotizacion, show, onHide }) => {
  const [seguimientos, setSeguimientos] = useState([]);
  const [imageBlob, setImageBlob] = useState(null); // Nuevo estado para la imagen del vehículo
  const [formSeguimiento, setFormSeguimiento] = useState({
    CotizacionID: cotizacion?.CotizacionID || "",
    Comentario: "",
    FechaSeguimiento: "",
    SeguimientoTipoID: 1,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (show) {
      setSeguimientos([]);
      setImageBlob(null); // Resetear la imagen cuando se muestra el modal
      setFormSeguimiento({
        CotizacionID: cotizacion?.CotizacionID || "",
        Comentario: "",
        FechaSeguimiento: "",
        SeguimientoTipoID: 1,
      });
      setIsEditing(false);
      setEditingId(null);

      const fetchSeguimientos = async () => {
        if (cotizacion) {
          try {
            const response = await axios.get(`http://localhost:4000/seguimientos/${cotizacion.CotizacionID}`);
            setSeguimientos(response.data);
          } catch (error) {
            console.error("Error al obtener seguimientos:", error);
          }
        }
      };

      const fetchVehicleImage = async () => {
        if (cotizacion) {
          try {
            const imageRes = await fetch(`http://localhost:4000/vehiculos/${cotizacion.VehiculoID}`);
            const imageData = await imageRes.json();
            const blob = new Blob([new Uint8Array(imageData.Imagen.data)], {
              type: "image/jpeg",
            });
            setImageBlob(blob);
          } catch (error) {
            console.error("Error al obtener la imagen del vehículo:", error);
          }
        }
      };

      fetchSeguimientos();
      fetchVehicleImage();
    }
  }, [show, cotizacion]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormSeguimiento({ ...formSeguimiento, [name]: value });
  };

  const handleAddSeguimiento = async () => {
    try {
      await axios.post("http://localhost:4000/seguimientos", {
        ...formSeguimiento,
        CotizacionID: cotizacion.CotizacionID,
      });
      const updatedSeguimientos = await axios.get(`http://localhost:4000/seguimientos/${cotizacion.CotizacionID}`);
      setSeguimientos(updatedSeguimientos.data);
      setFormSeguimiento({
        Comentario: "",
        FechaSeguimiento: "",
        SeguimientoTipoID: 1,
      });
    } catch (error) {
      console.error("Error al agregar seguimiento:", error);
    }
  };

  const handleEditSeguimiento = (seguimiento) => {
    setIsEditing(true);
    setEditingId(seguimiento.SeguimientoID);
    setFormSeguimiento({
      Comentario: seguimiento.Comentario,
      FechaSeguimiento: seguimiento.FechaSeguimiento,
      SeguimientoTipoID: seguimiento.SeguimientoTipoID,
    });
  };

  const handleUpdateSeguimiento = async () => {
    try {
      await axios.put("http://localhost:4000/seguimientos", {
        SeguimientoID: editingId,
        CotizacionID: cotizacion.CotizacionID,
        ...formSeguimiento,
      });
      const updatedSeguimientos = await axios.get(`http://localhost:4000/seguimientos/${cotizacion.CotizacionID}`);
      setSeguimientos(updatedSeguimientos.data);
      setIsEditing(false);
      setEditingId(null);
      setFormSeguimiento({
        Comentario: "",
        FechaSeguimiento: "",
        SeguimientoTipoID: 1,
      });
    } catch (error) {
      console.error("Error al actualizar seguimiento:", error);
    }
  };

  const handleDeleteSeguimiento = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/seguimientos/${id}`);
      const updatedSeguimientos = await axios.get(`http://localhost:4000/seguimientos/${cotizacion.CotizacionID}`);
      setSeguimientos(updatedSeguimientos.data);
    } catch (error) {
      console.error("Error al eliminar seguimiento:", error);
    }
  };

  const imageUrl = imageBlob ? URL.createObjectURL(imageBlob) : null;

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Cotización</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Cliente: {cotizacion?.NombreCliente}</h5>
        <h5>Vehículo: {cotizacion?.VehiculoDescripcion}</h5>
        <h5>Fecha de Cotización: {cotizacion?.FechaCotizacion}</h5>
        <h5>Estado: {cotizacion?.EstadoCotizacion}</h5>
        <h5>Precio: {cotizacion?.PrecioLista}</h5>
       
        {imageUrl && (
          <div className="text-center mb-4">
            <img
              src={imageUrl}
              alt={`Imagen de ${cotizacion?.VehiculoDescripcion}`}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}
        <h5>Seguimientos:</h5>
        {seguimientos.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Descripción</th>
                <th>Comentario</th>
                <th>Fecha Seguimiento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {seguimientos.map((seguimiento, index) => (
                <tr key={seguimiento.SeguimientoID}>
                  <td>{index + 1}</td>
                  <td>{seguimiento.Descripcion}</td>
                  <td>{seguimiento.Comentario}</td>
                  <td>{seguimiento.FechaSeguimiento}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEditSeguimiento(seguimiento)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="ml-2"
                      onClick={() => handleDeleteSeguimiento(seguimiento.SeguimientoID)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No hay seguimientos para esta cotización.</p>
        )}

        <Form className="mt-4">
          <Form.Group controlId="formSeguimientoTipoID">
            <Form.Label>Tipo de Seguimiento</Form.Label>
            <Form.Control
              as="select"
              name="SeguimientoTipoID"
              value={formSeguimiento.SeguimientoTipoID}
              onChange={handleFormChange}
            >
              <option value={1}>Correo Electrónico</option>
              <option value={2}>Llamada Telefónica</option>
              <option value={3}>Visita del cliente a la Agencia</option>
              <option value={4}>Whatsapp</option>
              <option value={5}>Facebook</option>
              {/* Agrega más opciones según tu base de datos */}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formSeguimientoComentario">
            <Form.Label>Comentario</Form.Label>
            <Form.Control
              type="text"
              name="Comentario"
              value={formSeguimiento.Comentario}
              onChange={handleFormChange}
            />
          </Form.Group>
          <Form.Group controlId="formSeguimientoFecha">
            <Form.Label>Fecha de Seguimiento</Form.Label>
            <Form.Control
              type="date"
              name="FechaSeguimiento"
              value={formSeguimiento.FechaSeguimiento}
              onChange={handleFormChange}
            />
          </Form.Group>
          {isEditing ? (
            <Button variant="primary" onClick={handleUpdateSeguimiento}>
              Actualizar Seguimiento
            </Button>
          ) : (
            <Button variant="success" onClick={handleAddSeguimiento}>
              Agregar Seguimiento
            </Button>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CotizacionDetallesModal;
