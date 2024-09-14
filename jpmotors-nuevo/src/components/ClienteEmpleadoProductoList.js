import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { PDFDocument, pdf } from "@react-pdf/renderer";
import Select from "react-select";  // Importa react-select
import PdfCotizar from "./PdfCotizar";
import CotizacionDetallesModal from "./CotizacionDetallesModal";

const ClienteEmpleadoProductoList = () => {
  const [clientes, setClientes] = useState([]);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [empleado, setEmpleado] = useState({
    nombre: "",
    apellido: "",
    id: "",
    rol: "",
  });
  const [selectedCotizacion, setSelectedCotizacion] = useState(null);
  const [formCotizacion, setFormCotizacion] = useState({
    ClienteID: "",
    VehiculoID: "",
    EstadoCotizacion: "",
    FechaSeguimiento: "",
  });
  const [showCotizacionModal, setShowCotizacionModal] = useState(false);
  const [showDetallesModal, setShowDetallesModal] = useState(false);
  const [vehiculosLoaded, setVehiculosLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchVehiculos();
        const clientesResponse = await axios.get(
          "http://localhost:4000/clientes"
        );
        setClientes(clientesResponse.data);

        const nombre = localStorage.getItem("nombre");
        const apellido = localStorage.getItem("apellido");
        const id = localStorage.getItem("userId");
        const roles = JSON.parse(localStorage.getItem("roles"));

        if (nombre && apellido && id && roles) {
          const rol = roles.includes("Admin") ? "Admin" : "User";
          setEmpleado({ nombre, apellido, id, rol });

          if (vehiculosLoaded) {
            fetchCotizaciones(id, rol);
          }
        } else {
          console.error("Datos del empleado no encontrados en el localStorage");
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, [vehiculosLoaded]);

  const fetchCotizaciones = async (empleadoId, rol) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/cotizaciones/byEmpleadoId/${empleadoId}`
      );
      let cotizacionesData = response.data;

      if (rol === "User" || rol === "Admin") {
        cotizacionesData = cotizacionesData.filter(
          (cotizacion) => cotizacion.EstadoCotizacion !== "Anulada" & cotizacion.EstadoCotizacion !== "Finalizada"
        );
      }

      cotizacionesData = cotizacionesData.map((cotizacion) => {
        const vehiculo = vehiculos.find(
          (v) => v.VehiculoID === cotizacion.VehiculoID
        );
        return {
          ...cotizacion,
          PrecioWeb: vehiculo?.PrecioWeb,
          PrecioGerente: vehiculo?.PrecioGerente,
          PrecioLista: vehiculo?.PrecioLista,
          Anio: vehiculo?.Anio,
          VehiculoDescripcion: `${vehiculo?.Modelo} ${vehiculo?.Marca} ${vehiculo?.Anio}`,
        };
      });

      setCotizaciones(cotizacionesData);
    } catch (error) {
      console.error("Error al obtener cotizaciones:", error);
    }
  };

  const fetchVehiculos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/vehiculos/pornombre");
      setVehiculos(response.data);
      setVehiculosLoaded(true);
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
    }
  };

  const handleAddEditCotizacion = async () => {
    try {
      if (selectedCotizacion) {
        await axios.put("http://localhost:4000/cotizaciones", {
          CotizacionID: selectedCotizacion.CotizacionID,
          ...formCotizacion,
          EmpleadoID: empleado.id,
        });
      } else {
        await axios.post("http://localhost:4000/cotizaciones", {
          ...formCotizacion,
          EmpleadoID: empleado.id,
          FechaCotizacion: new Date().toISOString().slice(0, 10),
        });
      }
      await fetchCotizaciones(empleado.id, empleado.rol);
      setShowCotizacionModal(false);
      setSelectedCotizacion(null);
      setFormCotizacion({
        ClienteID: "",
        VehiculoID: "",
        EstadoCotizacion: "",
        FechaSeguimiento: "",
      });
    } catch (error) {
      console.error("Error al guardar la cotización:", error);
    }
  };
//Creacion de pdf
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
        fetch(
          `http://localhost:4000/vehiculos/seguridad/${cotizacion.VehiculoID}`
        ),
        fetch(
          `http://localhost:4000/vehiculos/interior/${cotizacion.VehiculoID}`
        ),
        fetch(
          `http://localhost:4000/vehiculos/exterior/${cotizacion.VehiculoID}`
        ),
        fetch(
          `http://localhost:4000/vehiculos/dimensiones/${cotizacion.VehiculoID}`
        ),
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

      const cliente = clientes.find(
        (c) => c.ClienteID === cotizacion.ClienteID
      );
      const vehiculo = cotizacion.VehiculoDescripcion;

      const pdfDoc = (
        <PdfCotizar
          auto={cotizacion}
          cliente={cliente}
          empleado={empleado}
          imageUrl={imageUrl}
          motorDetails={motorData}
          seguridadDetails={seguridadData}
          interiorDetails={interiorData}
          exteriorDetails={exteriorData}
          dimensionesDetails={dimensionesData}
          precioWeb={cotizacion.PrecioWeb}
          precioGerente={cotizacion.PrecioGerente}
          precioLista={cotizacion.PrecioLista}
        />
      );

      const asPdf = pdf([]);
      asPdf.updateContainer(pdfDoc);
      const blobPdf = await asPdf.toBlob();

      const fileName = `Cotización_${cliente?.Nombre || "Cliente"}_${
        cliente?.Apellido || ""
      }_${vehiculo || "Vehículo"}.pdf`;

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blobPdf);
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  const handleShowDetalles = (cotizacion) => {
    setSelectedCotizacion(cotizacion);
    setShowDetallesModal(true);
  };

  const handleFormChange = (selectedOption, actionMeta) => {
    setFormCotizacion({
      ...formCotizacion,
      [actionMeta.name]: selectedOption ? selectedOption.value : "",
    });
  };

  return (
    <div className="container-xl">
      {empleado.nombre && (
        <div className="empleado-info">
          <h6>Ejecutivo/a</h6>
          <h2>
            {empleado.nombre} {empleado.apellido}
          </h2>
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
            <th>Cotización</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {cotizaciones.map((cotizacion, index) => {
            const cliente = clientes.find(
              (c) => c.ClienteID === cotizacion.ClienteID
            );
            return (
              <tr key={cotizacion.CotizacionID}>
                <td>{index + 1}</td>
                <td>
                  {cliente?.Nombre} {cliente?.Apellido}
                  <br />
                  {cliente.Telefono && (
                    <span>Teléfono: {cliente.Telefono}</span>
                  )}
                  <br />
                  {cliente.CorreoElectronico && (
                    <span>Correo: {cliente.CorreoElectronico}</span>
                  )}
                </td>
                <td>
                  {cotizacion.VehiculoDescripcion}
                  <br />
                  {cotizacion.PrecioLista && (
                    <span>
                      Precio: {cotizacion.PrecioLista}
                      <br />
                      Año: {cotizacion.Anio}
                    </span>
                  )}
                </td>
                <td>{cotizacion.FechaCotizacion}</td>
                <td>{cotizacion.EstadoCotizacion}</td>
                <td>{cotizacion.FechaSeguimiento}</td>
                <td>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                      variant="warning"
                      onClick={() => {
                        setSelectedCotizacion(cotizacion);
                        setFormCotizacion({
                          ClienteID: cotizacion.ClienteID,
                          VehiculoID: cotizacion.VehiculoID,
                          EstadoCotizacion: cotizacion.EstadoCotizacion,
                          FechaSeguimiento: cotizacion.FechaSeguimiento,
                        });
                        setShowCotizacionModal(true);
                      }}
                    >
                      Editar
                    </Button>

                    <Button
                      variant="danger"
                      onClick={async () => {
                        if (
                          window.confirm(
                            "¿Estás seguro de que deseas eliminar esta cotización?"
                          )
                        ) {
                          try {
                            await axios.delete(
                              `http://localhost:4000/cotizaciones/${cotizacion.CotizacionID}`
                            );
                            await fetchCotizaciones(empleado.id, empleado.rol);
                          } catch (error) {
                            console.error(
                              "Error al eliminar la cotización:",
                              error
                            );
                          }
                        }
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleGeneratePdf(cotizacion)}
                  >
                    Generar PDF
                  </Button>
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleShowDetalles(cotizacion)}
                  >
                    Detalles
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={showCotizacionModal} onHide={() => setShowCotizacionModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>
      {selectedCotizacion ? "Editar" : "Agregar"} Cotización
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formClienteID">
        <Form.Label>Cliente</Form.Label>
        <Select
          name="ClienteID"
          value={
            formCotizacion.ClienteID
              ? {
                  value: formCotizacion.ClienteID,
                  label: clientes.find(
                    (cliente) => cliente.ClienteID === formCotizacion.ClienteID
                  )?.Nombre + " " + clientes.find(
                    (cliente) => cliente.ClienteID === formCotizacion.ClienteID
                  )?.Apellido,
                }
              : null
          }
          onChange={(selectedOption) =>
            setFormCotizacion({
              ...formCotizacion,
              ClienteID: selectedOption ? selectedOption.value : null,
            })
          }
          options={clientes.map((cliente) => ({
            value: cliente.ClienteID,
            label: `${cliente.Nombre} ${cliente.Apellido}`,
          }))}
          isClearable
        />
      </Form.Group>
      
      <Form.Group controlId="formVehiculoID">
        <Form.Label>Vehículo</Form.Label>
        <Select
          name="VehiculoID"
          value={
            formCotizacion.VehiculoID
              ? {
                  value: formCotizacion.VehiculoID,
                  label: vehiculos.find(
                    (vehiculo) =>
                      vehiculo.VehiculoID === formCotizacion.VehiculoID
                  )?.Modelo + " " + vehiculos.find(
                    (vehiculo) =>
                      vehiculo.VehiculoID === formCotizacion.VehiculoID
                  )?.Marca + " " + vehiculos.find(
                    (vehiculo) =>
                      vehiculo.VehiculoID === formCotizacion.VehiculoID
                  )?.Anio,
                }
              : null
          }
          onChange={(selectedOption) =>
            setFormCotizacion({
              ...formCotizacion,
              VehiculoID: selectedOption ? selectedOption.value : null,
            })
          }
          options={vehiculos.map((vehiculo) => ({
            value: vehiculo.VehiculoID,
            label: `${vehiculo.Modelo} ${vehiculo.Marca} ${vehiculo.Anio}`,
          }))}
          isClearable
        />
      </Form.Group>

      <Form.Group controlId="formEstadoCotizacion">
        <Form.Label>Estado de Cotización</Form.Label>
        <Select
          name="EstadoCotizacion"
          value={{
            value: formCotizacion.EstadoCotizacion,
            label: formCotizacion.EstadoCotizacion,
          }}
          onChange={(selectedOption) =>
            setFormCotizacion({
              ...formCotizacion,
              EstadoCotizacion: selectedOption ? selectedOption.value : "",
            })
          }
          options={[
            { value: "Alta", label: "Alta" },
            { value: "Media", label: "Media" },
            { value: "Baja", label: "Baja" },
            { value: "Finalizada", label: "Finalizada" },
          ]}
          isClearable
        />
      </Form.Group>

      <Form.Group controlId="formFechaSeguimiento">
        <Form.Label>Fecha de Seguimiento</Form.Label>
        <Form.Control
          type="date"
          name="FechaSeguimiento"
          value={formCotizacion.FechaSeguimiento}
          onChange={(e) =>
            setFormCotizacion({
              ...formCotizacion,
              FechaSeguimiento: e.target.value,
            })
          }
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button
      variant="secondary"
      onClick={() => setShowCotizacionModal(false)}
    >
      Cerrar
    </Button>
    <Button variant="primary" onClick={handleAddEditCotizacion}>
      Guardar
    </Button>
  </Modal.Footer>
</Modal>


      {selectedCotizacion && (
        <CotizacionDetallesModal
          show={showDetallesModal}
          cotizacion={selectedCotizacion}
          onHide={() => setShowDetallesModal(false)}
        />
      )}
    </div>
  );
};

export default ClienteEmpleadoProductoList;
