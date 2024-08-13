import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfCotizar from "./PdfCotizar";

const ClienteEmpleadoProductoList = () => {
  const [clientes, setClientes] = useState([]);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [empleado, setEmpleado] = useState({
    nombre: "",
    apellido: "",
    id: ""
  });
  const [selectedCotizacion, setSelectedCotizacion] = useState(null);
  const [formCotizacion, setFormCotizacion] = useState({
    ClienteID: "",
    VehiculoID: "",
    EstadoCotizacion: "Media", // Valor por defecto "Media"
    FechaSeguimiento: ""
  });
  const [showCotizacionModal, setShowCotizacionModal] = useState(false);
  const [cotizacionData, setCotizacionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientesResponse = await axios.get("http://localhost:4000/clientes");
        setClientes(clientesResponse.data);

        const nombre = localStorage.getItem("nombre");
      const apellido = localStorage.getItem("apellido");
      const id = localStorage.getItem("userId");

      if (nombre && apellido && id) {
        setEmpleado({ nombre, apellido, id });
        fetchCotizaciones(id);
      } else {
        console.error("Datos del empleado no encontrados en el localStorage");
      }

      fetchVehiculos();
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };
  fetchData();
}, []);

  const fetchCotizaciones = async (empleadoId) => {
    try {
      const response = await axios.get(`http://localhost:4000/cotizaciones/byEmpleadoId/${empleadoId}`);
      setCotizaciones(response.data);
    } catch (error) {
      console.error("Error al obtener cotizaciones:", error);
    }
  };

  const fetchVehiculos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/vehiculos");
      setVehiculos(response.data);
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
    }
  };

  const handleCotizacionSelect = (cotizacion) => {
    setSelectedCotizacion(cotizacion);
    setFormCotizacion({
      ClienteID: cotizacion.ClienteID,
      VehiculoID: cotizacion.VehiculoID,
      EstadoCotizacion: cotizacion.EstadoCotizacion || "Media",  // Valor por defecto "Media"
      FechaSeguimiento: cotizacion.FechaSeguimiento
    });
    setShowCotizacionModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormCotizacion({ ...formCotizacion, [name]: value });
  };

  const handleAddEditCotizacion = async () => {
    try {
      if (selectedCotizacion) {
        await axios.put("http://localhost:4000/cotizaciones", {
          CotizacionID: selectedCotizacion.CotizacionID,
          ...formCotizacion,
          EmpleadoID: empleado.id
        });
      } else {
        await axios.post("http://localhost:4000/cotizaciones", {
          ...formCotizacion,
          EmpleadoID: empleado.id,
          FechaCotizacion: new Date().toISOString().slice(0, 10)
        });
      }
      fetchCotizaciones(empleado.id);
      setShowCotizacionModal(false);
      setSelectedCotizacion(null);
      setFormCotizacion({
        ClienteID: "",
        VehiculoID: "",
        EstadoCotizacion: "Media",  // Valor por defecto "Media"
        FechaSeguimiento: ""
      });
    } catch (error) {
      console.error("Error al guardar la cotización:", error);
    }
  };

  const handleGeneratePdf = async (cotizacion) => {
    try {
      const [
        imageRes,
        motorRes,
        seguridadRes,
        interiorRes,
        exteriorRes,
        dimensionesRes,
      ] = await Promise.all([
        fetch(`http://localhost:4000/vehiculos/${cotizacion.VehiculoID}`),
        fetch(`http://localhost:4000/vehiculos/motor/${cotizacion.VehiculoID}`),
        fetch(`http://localhost:4000/vehiculos/seguridad/${cotizacion.VehiculoID}`),
        fetch(`http://localhost:4000/vehiculos/interior/${cotizacion.VehiculoID}`),
        fetch(`http://localhost:4000/vehiculos/exterior/${cotizacion.VehiculoID}`),
        fetch(`http://localhost:4000/vehiculos/dimensiones/${cotizacion.VehiculoID}`),
      ]);

      const [
        imageData,
        motorData,
        seguridadData,
        interiorData,
        exteriorData,
        dimensionesData,
      ] = await Promise.all([
        imageRes.json(),
        motorRes.json(),
        seguridadRes.json(),
        interiorRes.json(),
        exteriorRes.json(),
        dimensionesRes.json(),
      ]);

      const blob = new Blob([new Uint8Array(imageData.Imagen.data)], {
        type: "image/jpeg",
      });
      const imageUrl = URL.createObjectURL(blob);

      setCotizacionData({
        auto: cotizacion,
        cliente: clientes.find(c => c.ClienteID === cotizacion.ClienteID),
        empleado,
        imageUrl,
        motorDetails: motorData,
        seguridadDetails: seguridadData,
        interiorDetails: interiorData,
        exteriorDetails: exteriorData,
        dimensionesDetails: dimensionesData,
      });
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return (
    <div className="container-xl">
      {empleado.nombre && (
        <div className="empleado-info">
          <h2>Ejecutivo/a</h2>
          <p>{empleado.nombre} {empleado.apellido}</p>
        </div>
      )}
      <h1 className="my-4">Cotizaciones del Empleado</h1>
      <Button variant="primary" onClick={() => setShowCotizacionModal(true)}>
        Agregar Cotización
      </Button>
      <Table striped bordered hover className="my-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Vehículo</th>
            <th>Fecha Cotización</th>
            <th>Estado</th>
            <th>Fecha Seguimiento</th>
            <th>Acciones</th>
            <th>Cotización</th> {/* Nueva columna para el botón de generar PDF */}
          </tr>
        </thead>
        <tbody>
          {cotizaciones.map((cotizacion, index) => (
            <tr key={cotizacion.CotizacionID}>
              <td>{index + 1}</td>
              <td>{cotizacion.NombreCliente}</td>
              <td>{cotizacion.VehiculoDescripcion}</td>
              <td>{cotizacion.FechaCotizacion}</td>
              <td>{cotizacion.EstadoCotizacion}</td>
              <td>{cotizacion.FechaSeguimiento}</td>
              <td>
                <Button variant="warning" onClick={() => handleCotizacionSelect(cotizacion)}>
                  Editar
                </Button>
              </td>
              <td>
                <Button variant="info" onClick={() => handleGeneratePdf(cotizacion)}>
                  Generar PDF
                </Button>
                {cotizacionData && cotizacionData.auto.CotizacionID === cotizacion.CotizacionID && (
                  <PDFDownloadLink
                  document={
                    <PdfCotizar
                      auto={cotizacionData.auto}
                      cliente={cotizacionData.cliente}
                      empleado={empleado}
                      imageUrl={cotizacionData.imageUrl}
                      motorDetails={cotizacionData.motorDetails}
                      seguridadDetails={cotizacionData.seguridadDetails}
                      interiorDetails={cotizacionData.interiorDetails}
                      exteriorDetails={cotizacionData.exteriorDetails}
                      dimensionesDetails={cotizacionData.dimensionesDetails}
                      precioWeb={cotizacion.PrecioWeb}
                      precioGerente={cotizacion.PrecioGerente}
                      precioLista={cotizacion.PrecioLista}
                    />
                  }
                  fileName={`Cotización_${cotizacion.Marca}_${cotizacion.Modelo}.pdf`}
                >
                  {({ loading }) => 
                    loading ? "Generando PDF..." : "Descargar PDF"
                  }
                </PDFDownloadLink>
                
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar/editar cotización */}
      <Modal show={showCotizacionModal} onHide={() => setShowCotizacionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCotizacion ? "Editar Cotización" : "Agregar Cotización"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCotizacionCliente">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                as="select"
                name="ClienteID"
                value={formCotizacion.ClienteID}
                onChange={handleFormChange}
              >
                <option value="">Seleccione un cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente.ClienteID} value={cliente.ClienteID}>
                    {cliente.Nombre} {cliente.Apellido}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCotizacionVehiculo">
              <Form.Label>Vehículo</Form.Label>
              <Form.Control
                as="select"
                name="VehiculoID"
                value={formCotizacion.VehiculoID}
                onChange={handleFormChange}
              >
                <option value="">Seleccione un vehículo</option>
                {vehiculos.map(vehiculo => (
                  <option key={vehiculo.VehiculoID} value={vehiculo.VehiculoID}>
                    {vehiculo.Modelo} {vehiculo.Marca} {vehiculo.Anio}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCotizacionEstado">
              <Form.Label>Estado de la Cotización</Form.Label>
              <Form.Control
                as="select"
                name="EstadoCotizacion"
                value={formCotizacion.EstadoCotizacion}
                onChange={handleFormChange}
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCotizacionSeguimiento">
              <Form.Label>Fecha de Seguimiento</Form.Label>
              <Form.Control
                type="date"
                name="FechaSeguimiento"
                value={formCotizacion.FechaSeguimiento}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCotizacionModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddEditCotizacion}>
            {selectedCotizacion ? "Guardar Cambios" : "Agregar Cotización"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClienteEmpleadoProductoList;
