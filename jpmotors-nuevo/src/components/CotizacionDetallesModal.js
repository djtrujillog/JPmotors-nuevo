import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const tipoSeguimientoMap = {
  1: "Correo Electrónico",
  2: "Llamada Telefónica",
  3: "Visita del cliente a la Agencia",
  4: "Whatsapp",
  5: "Facebook",
};

const CotizacionDetallesModal = ({ cotizacion, show, onHide }) => {
  const [seguimientos, setSeguimientos] = useState([]);
  const [imageBase64, setImageBase64] = useState(null);
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
      setImageBase64(null);
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
            const response = await axios.get(`https://cotizaciones-jpmotors.onrender.com/seguimientos/${cotizacion.CotizacionID}`);
            setSeguimientos(response.data);
          } catch (error) {
            console.error("Error al obtener seguimientos:", error);
          }
        }
      };

      const fetchVehicleImage = async () => {
        if (cotizacion) {
          try {
            const imageRes = await fetch(`https://cotizaciones-jpmotors.onrender.com/vehiculos/${cotizacion.VehiculoID}`);
            const imageData = await imageRes.json();
            
            // Asegurar que la imagen tenga el prefijo adecuado
            const base64Image = imageData.ImagenBase64.startsWith("data:image")
              ? imageData.ImagenBase64
              : `data:image/jpeg;base64,${imageData.ImagenBase64}`;

            setImageBase64(base64Image);
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
      await axios.post("https://cotizaciones-jpmotors.onrender.com/seguimientos", {
        ...formSeguimiento,
        CotizacionID: cotizacion.CotizacionID,
      });
      const updatedSeguimientos = await axios.get(`https://cotizaciones-jpmotors.onrender.com/seguimientos/${cotizacion.CotizacionID}`);
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
      await axios.put("https://cotizaciones-jpmotors.onrender.com/seguimientos", {
        SeguimientoID: editingId,
        CotizacionID: cotizacion.CotizacionID,
        ...formSeguimiento,
      });
      const updatedSeguimientos = await axios.get(`https://cotizaciones-jpmotors.onrender.com/seguimientos/${cotizacion.CotizacionID}`);
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
      await axios.delete(`https://cotizaciones-jpmotors.onrender.com/seguimientos/${id}`);
      const updatedSeguimientos = await axios.get(`https://cotizaciones-jpmotors.onrender.com/seguimientos/${cotizacion.CotizacionID}`);
      setSeguimientos(updatedSeguimientos.data);
    } catch (error) {
      console.error("Error al eliminar seguimiento:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Detalles de la Cotización", 10, 10);
    doc.text(`Cliente: ${cotizacion?.NombreCliente}`, 10, 20);
    doc.text(`Vehículo: ${cotizacion?.VehiculoDescripcion}`, 10, 30);
    doc.text(`Fecha de Cotización: ${cotizacion?.FechaCotizacion}`, 10, 40);
    doc.text(`Estado: ${cotizacion?.EstadoCotizacion}`, 10, 50);
    doc.text(`Precio: ${cotizacion?.PrecioLista}`, 10, 60);

    if (seguimientos.length > 0) {
      const tableColumn = ["#", "Tipo", "Comentario", "Fecha"];
      const tableRows = [];

      seguimientos.forEach((seguimiento, index) => {
        const seguimientoData = [
          index + 1,
          tipoSeguimientoMap[seguimiento.SeguimientoTipoID] || "N/A",
          seguimiento.Comentario,
          seguimiento.FechaSeguimiento,
        ];
        tableRows.push(seguimientoData);
      });

      doc.autoTable(tableColumn, tableRows, { startY: 70 });
    }
    doc.save(`cotizacion_${cotizacion?.CotizacionID}.pdf`);
  };

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
       
        {imageBase64 && (
          <div className="text-center mb-4">
            <img
              src={imageBase64}
              alt={`Imagen de ${cotizacion?.VehiculoDescripcion}`}
              style={{ maxWidth: "50%", height: "auto" }}
            />
          </div>
        )}

        <h5>Seguimientos:</h5>
        {seguimientos.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tipo</th>
                <th>Comentario</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {seguimientos.map((seguimiento, index) => (
                <tr key={seguimiento.SeguimientoID}>
                  <td>{index + 1}</td>
                  <td>{tipoSeguimientoMap[seguimiento.SeguimientoTipoID] || "N/A"}</td>
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
              {Object.entries(tipoSeguimientoMap).map(([id, label]) => (
                <option key={id} value={id}>{label}</option>
              ))}
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
        <Button variant="primary" onClick={generatePDF}>
          Descargar PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CotizacionDetallesModal;
