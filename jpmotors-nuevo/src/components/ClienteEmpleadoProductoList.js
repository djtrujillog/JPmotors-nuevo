import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { PDFDocument, pdf } from "@react-pdf/renderer";
import Select from "react-select";  // Importa react-select
import PdfCotizar from "./PdfCotizar";
import CotizacionDetallesModal from "./CotizacionDetallesModal";
import AutoImage from './AutoImageLogo'; // Asegúrate de tener la ruta correcta


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
    NoFactura:"",
    PrecioPlacas:"",
    PrecioCotizacion:"",
    ColoresDisponibles:"",
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
          "https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/clientes"
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
      const response = await axios.get(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/cotizaciones/byEmpleadoId/${empleadoId}`);
      let cotizacionesData = response.data;
  
      if (rol === "User" || rol === "Admin") {
        cotizacionesData = cotizacionesData.filter(
          (cotizacion) => cotizacion.EstadoCotizacion !== "Anulada" && cotizacion.EstadoCotizacion !== "Finalizada"
        );
      }
  
      cotizacionesData = await Promise.all(
        cotizacionesData.map(async (cotizacion) => {
          const vehiculoRes = await axios.get(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/vehiculos/${cotizacion.VehiculoID}`);
          if (!vehiculoRes.data) throw new Error('Vehículo data es undefined');
          const vehiculo = vehiculoRes.data;
  
          const marcaRes = await axios.get(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/marcas/${vehiculo.MarcaID}`);
          if (!marcaRes.data || !Array.isArray(marcaRes.data) || marcaRes.data.length === 0) {
            throw new Error('Marca data es undefined o el array está vacío');
          }
          const marca = marcaRes.data[0];
  
          return {
            ...cotizacion,
            PrecioWeb: vehiculo.PrecioWeb,
            PrecioGerente: vehiculo.PrecioGerente,
            PrecioLista: vehiculo.PrecioLista,
            Anio: vehiculo.Anio,
            VehiculoDescripcion: `${vehiculo.Modelo} ${vehiculo.Marca} ${vehiculo.Anio}`,
            VehiculoImagen: vehiculo.ImagenBase64, // Usando la imagen en base64
            MarcaLogo: marca.Logo?.data, // Añadir el logo de la marca si está disponible
          };
        })
      );
  
      setCotizaciones(cotizacionesData);
    } catch (error) {
      console.error('Error al obtener cotizaciones:', error);
    }
  };
  
  

  const fetchVehiculos = async () => {
    try {
      const response = await axios.get("https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/vehiculos/pornombre");
      setVehiculos(response.data);
      setVehiculosLoaded(true);
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
    }
  };

  const handleAddEditCotizacion = async () => {
    try {
      // Validación para el campo "NoFactura"
      if (formCotizacion.EstadoCotizacion === "Finalizada" && !formCotizacion.NoFactura) {
        alert("Debe ingresar el número de factura cuando el estado es Finalizada.");
        return; // Detenemos la ejecución si falta NoFactura y el estado es "Finalizada"
      }
  
      if (selectedCotizacion) {
        await axios.put("https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/cotizaciones", {
          CotizacionID: selectedCotizacion.CotizacionID,
          ...formCotizacion,
          EmpleadoID: empleado.id,
        });
      } else {
        await axios.post("https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/cotizaciones", {
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
        NoFactura: "",
        PrecioPlacas: "",
        PrecioCotizacion: "",
        ColoresDisponibles: ""
      });
    } catch (error) {
      console.error("Error al guardar la cotización:", error);
    }
  };
  
//Creacion de pdf
const handleGeneratePdf = async (cotizacion) => {
  try {
    // Consultar detalles del vehículo y cliente
    const [
      imageRes,
      motorRes,
      seguridadRes,
      interiorRes,
      exteriorRes,
      dimensionesRes,
      garantiaRes,
    ] = await Promise.all([
      fetch(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/vehiculos/${cotizacion.VehiculoID}`),
      fetch(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/vehiculos/motor/${cotizacion.VehiculoID}`),
      fetch(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/vehiculos/seguridad/${cotizacion.VehiculoID}`),
      fetch(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/vehiculos/interior/${cotizacion.VehiculoID}`),
      fetch(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/vehiculos/exterior/${cotizacion.VehiculoID}`),
      fetch(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/vehiculos/dimensiones/${cotizacion.VehiculoID}`),
      fetch(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/vehiculos/detalleGarantia/${cotizacion.VehiculoID}`),
    ]);

    const [
      imageData,
      motorData,
      seguridadData,
      interiorData,
      exteriorData,
      dimensionesData,
      garantiaData,
    ] = await Promise.all([
      imageRes.json(),
      motorRes.json(),
      seguridadRes.json(),
      interiorRes.json(),
      exteriorRes.json(),
      dimensionesRes.json(),
      garantiaRes.json(),
    ]);

    // Obtener los detalles del vehículo
    const vehiculo = vehiculos.find((v) => v.VehiculoID === cotizacion.VehiculoID);
    if (!vehiculo) {
      console.error('Vehículo no encontrado');
      return;
    }

    // Hacer la solicitud al logo de la marca usando el MarcaID del vehículo
    const marcaRes = await axios.get(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/marcas/${vehiculo.MarcaID}`);
    const marcaData = marcaRes.data[0];

    // Crear blob para el logo de la marca si está disponible
    let marcaLogoUrl = null;
    if (marcaData?.Logo?.data) {
      const logoBlob = new Blob([new Uint8Array(marcaData.Logo.data)], { type: "image/jpeg" });
      marcaLogoUrl = URL.createObjectURL(logoBlob);
    }

    // Crear blob para la imagen del vehículo
    // Suponiendo que imageData.ImagenBase64 contiene la imagen en formato base64
const vehicleImageUrl = imageData.ImagenBase64; // Usar directamente la base64

// Luego, puedes usar `vehicleImageUrl` en tu componente PDF


    // Buscar cliente correspondiente a la cotización
    const cliente = clientes.find((c) => c.ClienteID === cotizacion.ClienteID);

    // Obtener los detalles del empleado desde la API
    const empleadoResponse = await axios.get(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/empleados/${empleado.id}`);
    const { Telefono: telefonoEmpleado } = empleadoResponse.data;

    // Crear el documento PDF
    const pdfDoc = (
      <PdfCotizar
        marca={vehiculo.Marca}
        modelo={vehiculo.Modelo}
        auto={cotizacion}
        cliente={cliente}
        empleado={{ ...empleado, telefono: telefonoEmpleado }}
        imageUrl={vehicleImageUrl}  // Incluir imagen del vehículo
        marcaLogoUrl={marcaLogoUrl}  // Incluir logo de la marca si está disponible
        motorDetails={motorData}
        seguridadDetails={seguridadData}
        interiorDetails={interiorData}
        exteriorDetails={exteriorData}
        dimensionesDetails={dimensionesData}
        garantiaDetails={garantiaData}
        precioWeb={cotizacion.PrecioWeb}
        precioGerente={cotizacion.PrecioGerente}
        precioLista={cotizacion.PrecioLista}
        precioPlacas={cotizacion.PrecioPlacas}
        precioCotizacion={cotizacion.PrecioCotizacion}
        coloresDisponibles={cotizacion.ColoresDisponibles}
      />
    );

    // Generar el PDF y descargarlo
    const asPdf = pdf([]);
    asPdf.updateContainer(pdfDoc);
    const blobPdf = await asPdf.toBlob();

    const fileName = `Cotización_${cliente?.Nombre || "Cliente"}_${cliente?.Apellido || ""}_${vehiculo.Marca}_${vehiculo.Modelo}.pdf`;

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
            {/* <th>Logo Marca</th> */}
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
                      Precio: {cotizacion.PrecioCotizacion}
                      <br />
                      Placas: {cotizacion.PrecioPlacas}
                      <br />
                      Color Disponible: {cotizacion.ColoresDisponibles}
                      <br />
                      Año: {cotizacion.Anio}
                    </span>
                  )}
                </td>
                {/* <td>
            <AutoImage longBlobData={cotizacion.MarcaLogo} alt="Logo Marca" style={{ width: '50px', height: '50px' }} />
          </td> */}
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
                          NoFactura: cotizacion.NoFactura,            
                         PrecioPlacas: cotizacion.PrecioPlacas,      
                          PrecioCotizacion: cotizacion.PrecioCotizacion,  
                         ColoresDisponibles: cotizacion.ColoresDisponibles, 
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
                              `https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/cotizaciones/${cotizacion.CotizacionID}`
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

{/* Modal para agregar cotizacion */}
<Modal show={showCotizacionModal} onHide={() => setShowCotizacionModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>
      {selectedCotizacion ? "Editar" : "Agregar"} Cotización
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      {/* Cliente */}
      <Form.Group controlId="formClienteID">
        <Form.Label>Cliente</Form.Label>
        <Select
          name="ClienteID"
          value={formCotizacion.ClienteID
            ? {
                value: formCotizacion.ClienteID,
                label: `${clientes.find(
                  (cliente) => cliente.ClienteID === formCotizacion.ClienteID
                )?.Nombre} ${clientes.find(
                  (cliente) => cliente.ClienteID === formCotizacion.ClienteID
                )?.Apellido}`,
              }
            : null}
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

      {/* Vehículo */}
      <Form.Group controlId="formVehiculoID">
        <Form.Label>Vehículo</Form.Label>
        <Select
          name="VehiculoID"
          value={formCotizacion.VehiculoID
            ? {
                value: formCotizacion.VehiculoID,
                label: `${vehiculos.find(
                  (vehiculo) => vehiculo.VehiculoID === formCotizacion.VehiculoID
                )?.Modelo} ${vehiculos.find(
                  (vehiculo) => vehiculo.VehiculoID === formCotizacion.VehiculoID
                )?.Marca} ${vehiculos.find(
                  (vehiculo) => vehiculo.VehiculoID === formCotizacion.VehiculoID
                )?.Anio}`,
              }
            : null}
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

      {/* Estado de Cotización */}
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

      {/* Fecha de Seguimiento */}
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

      {/* No. de Factura */}
<Form.Group controlId="formNoFactura">
  <Form.Label>No. de Factura</Form.Label>
  <Form.Control
    type="text"
    name="NoFactura"
    value={formCotizacion.NoFactura}
    onChange={(e) =>
      setFormCotizacion({
        ...formCotizacion,
        NoFactura: e.target.value,
      })
    }
    disabled={formCotizacion.EstadoCotizacion !== "Finalizada"} // Deshabilitado si no es "Finalizada"
  />
</Form.Group>


      {/* Precio de las Placas */}
      <Form.Group controlId="formPrecioPlacas">
        <Form.Label>Precio de las Placas</Form.Label>
        <Form.Control
          type="number"
          name="PrecioPlacas"
          value={formCotizacion.PrecioPlacas}
          onChange={(e) =>
            setFormCotizacion({
              ...formCotizacion,
              PrecioPlacas: e.target.value,
            })
          }
        />
      </Form.Group>

      {/* Precio de la Cotización */}
      <Form.Group controlId="formPrecioCotizacion">
        <Form.Label>Precio de la Cotización</Form.Label>
        <Form.Control
          type="number"
          name="PrecioCotizacion"
          value={formCotizacion.PrecioCotizacion}
          onChange={(e) =>
            setFormCotizacion({
              ...formCotizacion,
              PrecioCotizacion: e.target.value,
            })
          }
        />
      </Form.Group>

      {/* Colores Disponibles */}
      <Form.Group controlId="formColoresDisponibles">
        <Form.Label>Colores Disponibles</Form.Label>
        <Form.Control
          as="textarea"
          name="ColoresDisponibles"
          value={formCotizacion.ColoresDisponibles}
          onChange={(e) =>
            setFormCotizacion({
              ...formCotizacion,
              ColoresDisponibles: e.target.value,
            })
          }
          rows={3}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowCotizacionModal(false)}>
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
