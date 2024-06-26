import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./pdfDocument";
import "../css/AutoModal.css"; // Import custom CSS

const AutoModal = ({ auto, onClose }) => {
  const [imageData, setImageData] = useState(null);
  const [motorDetails, setMotorDetails] = useState(null);
  const [seguridadDetails, setSeguridadDetails] = useState(null);
  const [interiorDetails, setInteriorDetails] = useState(null);
  const [exteriorDetails, setExteriorDetails] = useState(null);
  const [dimensionesDetails, setDimensionesDetails] = useState(null);

  useEffect(() => {
    if (!auto) return;

    fetch(`http://localhost:4000/vehiculos/${auto.VehiculoID}`)
      .then((response) => response.json())
      .then((data) => setImageData(data))
      .catch((error) =>
        console.error("Error al cargar la imagen del vehículo:", error)
      );

    fetch(`http://localhost:4000/vehiculos/motor/${auto.VehiculoID}`)
      .then((response) => response.json())
      .then((data) => setMotorDetails(data))
      .catch((error) =>
        console.error("Error al cargar los detalles del motor:", error)
      );

    fetch(`http://localhost:4000/vehiculos/seguridad/${auto.VehiculoID}`)
      .then((response) => response.json())
      .then((data) => setSeguridadDetails(data))
      .catch((error) =>
        console.error("Error al cargar los detalles de seguridad:", error)
      );

    fetch(`http://localhost:4000/vehiculos/interior/${auto.VehiculoID}`)
      .then((response) => response.json())
      .then((data) => setInteriorDetails(data))
      .catch((error) =>
        console.error("Error al cargar los detalles del interior:", error)
      );

    fetch(`http://localhost:4000/vehiculos/exterior/${auto.VehiculoID}`)
      .then((response) => response.json())
      .then((data) => setExteriorDetails(data))
      .catch((error) =>
        console.error("Error al cargar los detalles del exterior:", error)
      );

    fetch(`http://localhost:4000/vehiculos/dimensiones/${auto.VehiculoID}`)
      .then((response) => response.json())
      .then((data) => setDimensionesDetails(data))
      .catch((error) =>
        console.error("Error al cargar los detalles de dimensiones:", error)
      );
  }, [auto]);

  if (
    !imageData ||
    !motorDetails ||
    !seguridadDetails ||
    !interiorDetails ||
    !exteriorDetails ||
    !dimensionesDetails
  )
    return null;

  return (
    <Modal
      className="modal-xl"
      show={true}
      onHide={onClose}
      dialogClassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>{`${imageData.Marca} ${imageData.Modelo}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={`/imagenes/${imageData.Imagen}`}
          className="img-fluid"
          alt={`${imageData.Marca} ${imageData.Modelo}`}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h4>Detalles del Motor</h4>
              <ul>
                {motorDetails.Motor.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
              <h4>Detalles de Seguridad</h4>
              <ul>
                {seguridadDetails.Seguridad.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
              <h4>Dimensiones del Vehiculo</h4>
              <ul>
                {dimensionesDetails.Dimensiones.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <div className="col-md-6">
              <h4>Detalles de Interior</h4>
              <ul>
                {interiorDetails.Interior.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
              <h4>Detalles de Exterior</h4>
              <ul>
                {exteriorDetails.Exterior.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <PDFDownloadLink
          document={
            <PdfDocument
              imageData={imageData}
              motorDetails={motorDetails}
              seguridadDetails={seguridadDetails}
              interiorDetails={interiorDetails}
              exteriorDetails={exteriorDetails}
              dimensionesDetails={dimensionesDetails}
            />
          }
          fileName={`${imageData.Marca}_${imageData.Modelo}.pdf`}
        >
          {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
        </PDFDownloadLink>
      </Modal.Footer>
    </Modal>
  );
};

export default AutoModal;
