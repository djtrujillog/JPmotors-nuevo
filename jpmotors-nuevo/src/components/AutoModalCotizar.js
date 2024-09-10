import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfCotizar from "./PdfCotizar";
import "../css/AutoModal.css";

const AutoModalCotizar = ({ auto, cliente, empleado, onClose }) => {
  const [imageBlob, setImageBlob] = useState(null);
  const [motorDetails, setMotorDetails] = useState(null);
  const [seguridadDetails, setSeguridadDetails] = useState(null);
  const [interiorDetails, setInteriorDetails] = useState(null);
  const [exteriorDetails, setExteriorDetails] = useState(null);
  const [dimensionesDetails, setDimensionesDetails] = useState(null);

  useEffect(() => {
    if (!auto) return;

    const fetchData = async () => {
      try {
        const [
          imageRes,
          motorRes,
          seguridadRes,
          interiorRes,
          exteriorRes,
          dimensionesRes,
        ] = await Promise.all([
          fetch(`http://localhost:4000/vehiculos/${auto.VehiculoID}`),
          fetch(`http://localhost:4000/vehiculos/motor/${auto.VehiculoID}`),
          fetch(`http://localhost:4000/vehiculos/seguridad/${auto.VehiculoID}`),
          fetch(`http://localhost:4000/vehiculos/interior/${auto.VehiculoID}`),
          fetch(`http://localhost:4000/vehiculos/exterior/${auto.VehiculoID}`),
          fetch(`http://localhost:4000/vehiculos/dimensiones/${auto.VehiculoID}`),
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
        setImageBlob(blob);
        setMotorDetails(motorData);
        setSeguridadDetails(seguridadData);
        setInteriorDetails(interiorData);
        setExteriorDetails(exteriorData);
        setDimensionesDetails(dimensionesData);
      } catch (error) {
        console.error("Error al cargar los datos del vehículo:", error);
      }
    };

    fetchData();
  }, [auto]);

  if (
    !imageBlob ||
    !motorDetails ||
    !seguridadDetails ||
    !interiorDetails ||
    !exteriorDetails ||
    !dimensionesDetails
  )
    return null;

  const imageUrl = URL.createObjectURL(imageBlob);

  return (
    <Modal
      className="modal-xl"
      show={true}
      onHide={onClose}
      dialogClassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>{`${auto.Marca} ${auto.Modelo}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={imageUrl}
          className="img-fluid d-block mx-auto"
          alt={`${auto.Marca} ${auto.Modelo}`}
          style={{ maxWidth: "85%", height: "auto" }}
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
            </div>
            <div className="col-md-6">
              <h4>Detalles de Seguridad</h4>
              <ul>
                {seguridadDetails.Seguridad.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h4>Detalles del Interior</h4>
              <ul>
                {interiorDetails.Interior.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <div className="col-md-6">
              <h4>Detalles del Exterior</h4>
              <ul>
                {exteriorDetails.Exterior.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h4>Dimensiones</h4>
              <ul>
                {dimensionesDetails.Dimensiones.map((detail, index) => (
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
            <PdfCotizar
              auto={auto}
              cliente={cliente}
              empleado={empleado}
              imageUrl={imageUrl}
              marca={auto.Marca}
              modelo={auto.Modelo}
              motorDetails={motorDetails}
              seguridadDetails={seguridadDetails}
              interiorDetails={interiorDetails}
              exteriorDetails={exteriorDetails}
              dimensionesDetails={dimensionesDetails}
              precioWeb={auto.PrecioWeb}
              precioGerente={auto.PrecioGerente}
              precioLista={auto.PrecioLista}
            />
          }
          fileName={`Cotización_${auto.Marca}_${auto.Modelo}.pdf`}
        >
          {({ loading }) =>
            loading ? "Generando Cotización..." : "Descargar Cotización"
          }
        </PDFDownloadLink>
      </Modal.Footer>
    </Modal>
  );
};

export default AutoModalCotizar;
