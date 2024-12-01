import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./pdfDocument";
import "../css/AutoModal.css"; // Import custom CSS

const AutoModal = ({ auto, onClose }) => {
  // const [imageBase64, setImageBase64] = useState(null);
  const [logoBlob, setLogoBlob] = useState(null); // Dejamos logoBlob como estaba
  const [motorDetails, setMotorDetails] = useState(null);
  const [seguridadDetails, setSeguridadDetails] = useState(null);
  const [interiorDetails, setInteriorDetails] = useState(null);
  const [exteriorDetails, setExteriorDetails] = useState(null);
  const [dimensionesDetails, setDimensionesDetails] = useState(null);
  const [garantiaDetails, setGarantiaDetails] = useState(null);

  const [showCotizacionModal, setShowCotizacionModal] = useState(false);
  const [cotizacionData, setCotizacionData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    email: '',
  });

  const handleCotizacionChange = (e) => {
    const { name, value } = e.target;
    setCotizacionData({ ...cotizacionData, [name]: value });
  };

  const handleCotizacionSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://cotizaciones-jpmotors.onrender.com/mail/cotizacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...cotizacionData,
        marca: auto.Marca,
        modelo: auto.Modelo,
      }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Cotización solicitada exitosamente");
      setShowCotizacionModal(false);
    } else {
      alert("Error al solicitar la cotización");
    }
  };

  useEffect(() => {
    if (!auto) return;

    const fetchData = async () => {
      try {
        const [
          // imageRes,
          marcaRes,
          motorRes,
          seguridadRes,
          interiorRes,
          exteriorRes,
          dimensionesRes,
          garantiaRes
        ] = await Promise.all([
          fetch(`https://cotizaciones-jpmotors.onrender.com/vehiculos/${auto.VehiculoID}`),
          fetch(`https://cotizaciones-jpmotors.onrender.com/marcas/${auto.MarcaID}`),
          fetch(`https://cotizaciones-jpmotors.onrender.com/vehiculos/motor/${auto.VehiculoID}`),
          fetch(`https://cotizaciones-jpmotors.onrender.com/vehiculos/seguridad/${auto.VehiculoID}`),
          fetch(`https://cotizaciones-jpmotors.onrender.com/vehiculos/interior/${auto.VehiculoID}`),
          fetch(`https://cotizaciones-jpmotors.onrender.com/vehiculos/exterior/${auto.VehiculoID}`),
          fetch(`https://cotizaciones-jpmotors.onrender.com/vehiculos/dimensiones/${auto.VehiculoID}`),
          fetch(`https://cotizaciones-jpmotors.onrender.com/vehiculos/detalleGarantia/${auto.VehiculoID}`)
        ]);
        const [
          imageData,
          marcaData,
          motorData,
          seguridadData,
          interiorData,
          exteriorData,
          dimensionesData,
          garantiaData
        ] = await Promise.all([
          // imageRes.json(),
          marcaRes.json(),
          motorRes.json(),
          seguridadRes.json(),
          interiorRes.json(),
          exteriorRes.json(),
          dimensionesRes.json(),
          garantiaRes.json()
        ]);

        // Asignar directamente la imagen en formato base64 desde la respuesta
        // setImageBase64(imageData.ImagenBase64);

        // Convertir el logo a Blob si está presente
        if (marcaData[0]?.Logo?.data) {
          const logoBlobData = new Blob([new Uint8Array(marcaData[0].Logo.data)], {
            type: "image/jpeg",
          });
          setLogoBlob(logoBlobData);
        }

        setMotorDetails(motorData);
        setSeguridadDetails(seguridadData);
        setInteriorDetails(interiorData);
        setExteriorDetails(exteriorData);
        setDimensionesDetails(dimensionesData);
        setGarantiaDetails(garantiaData);
      } catch (error) {
        console.error("Error al cargar los datos del vehículo:", error);
      }
    };
    if (!auto) {
      console.log("El objeto 'auto' no está definido");
      return;
    }

    console.log("Contenido de 'auto':", auto);


    fetchData();
  }, [auto]);

  const noDataAvailable = (
    // !imageBase64 &&
    !motorDetails &&
    !seguridadDetails &&
    !interiorDetails &&
    !exteriorDetails &&
    !dimensionesDetails &&
    !garantiaDetails
  );

  if (noDataAvailable) {
    return null;
  }

  const logoUrl = logoBlob ? URL.createObjectURL(logoBlob) : null;

  return (
    <>
      <Modal
        className="modal-xl"
        show={true}
        onHide={onClose}
        dialogClassName="custom-modal-width"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {logoUrl && (
              <img
                src={logoUrl}
                alt={`${auto.Marca} Logo`}
                style={{ width: "50px", marginRight: "10px" }}
              />
            )}
            {`${auto.Marca} ${auto.Modelo}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {auto.ImagenUrl && ( // Cambiado a auto.ImagenUrl
            <img
              src={auto.ImagenUrl} // Cambiado a auto.ImagenUrl
              className="img-fluid d-block mx-auto"
              alt={`${auto.Marca} ${auto.Modelo}`}
              style={{ maxWidth: "85%", height: "auto" }}
            />
          )}

          <div className="container">
            <div className="row">
              <div className="col-md-6">
                {motorDetails?.Motor?.length > 0 && (
                  <>
                    <h4>Detalles del Motor</h4>
                    <ul>
                      {motorDetails.Motor.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </>
                )}
                {seguridadDetails?.Seguridad?.length > 0 && (
                  <>
                    <h4>Detalles de Seguridad</h4>
                    <ul>
                      {seguridadDetails.Seguridad.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </>
                )}
                {dimensionesDetails?.Dimensiones?.length > 0 && (
                  <>
                    <h4>Dimensiones del Vehiculo</h4>
                    <ul>
                      {dimensionesDetails.Dimensiones.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <div className="col-md-6">
                {interiorDetails?.Interior?.length > 0 && (
                  <>
                    <h4>Detalles de Interior</h4>
                    <ul>
                      {interiorDetails.Interior.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </>
                )}
                {exteriorDetails?.Exterior?.length > 0 && (
                  <>
                    <h4>Detalles de Exterior</h4>
                    <ul>
                      {exteriorDetails.Exterior.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </>
                )}
                {garantiaDetails?.Garantia?.length > 0 && (
                  <>
                    <h4>Detalles de Garantía</h4>
                    <ul>
                      {garantiaDetails.Garantia.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => setShowCotizacionModal(true)}>
            Solicitar Cotización
          </Button>
          <PDFDownloadLink
            document={
              <PdfDocument
                marca={auto.Marca}
                modelo={auto.Modelo}
                imageUrl={auto.ImagenUrl}
                logoUrl={logoUrl}
                motorDetails={motorDetails}
                seguridadDetails={seguridadDetails}
                interiorDetails={interiorDetails}
                exteriorDetails={exteriorDetails}
                dimensionesDetails={dimensionesDetails}
                garantiaDetails={garantiaDetails}
              />
            }
            fileName={`${auto.Marca}_${auto.Modelo}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <Button variant="primary" disabled>
                  Generando PDF...
                </Button>
              ) : (
                <Button variant="primary">Descargar PDF</Button>
              )
            }
          </PDFDownloadLink>
        </Modal.Footer>
      </Modal>

      {/* Modal para solicitar cotización */}
      <Modal show={showCotizacionModal} onHide={() => setShowCotizacionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Solicitar Cotización - {`${auto.Marca} ${auto.Modelo}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCotizacionSubmit}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={cotizacionData.nombre}
                onChange={handleCotizacionChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={cotizacionData.apellido}
                onChange={handleCotizacionChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={cotizacionData.direccion}
                onChange={handleCotizacionChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={cotizacionData.telefono}
                onChange={handleCotizacionChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={cotizacionData.email}
                onChange={handleCotizacionChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Enviar Cotización
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AutoModal;
