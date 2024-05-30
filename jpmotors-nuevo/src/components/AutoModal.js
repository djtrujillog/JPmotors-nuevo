import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { PDFDownloadLink } from '@react-pdf/renderer';

import PdfDocument from "./pdfDocument";
import "../css/AutoModal.css"; // Import custom CSS

const AutoModal = ({ auto, onClose }) => {
  const [imageData, setImageData] = useState(null);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/vehiculos/${auto.VehiculoID}`)
      .then((response) => response.json())
      .then((data) => setImageData(data))
      .catch((error) =>
        console.error("Error al cargar la imagen del vehículo:", error)
      );

    fetch(`http://localhost:5000/vehiculos/detalle/${auto.VehiculoID}`)
      .then((response) => response.json())
      .then((data) => setDetails(data))
      .catch((error) =>
        console.error("Error al cargar los detalles del vehículo:", error)
      );
  }, [auto]);

  if (!details || !imageData) return null;

  return (
    <Modal
      className="modal-xl"
      show={true}
      onHide={onClose}
      dialogClassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h3>
          {details.Marca} {details.Modelo}
        </h3>
        <hr className="border border-dark border-2 opacity-50" />
        <img
          src={`/images/${imageData.Imagen}`}
          className="img-fluid"
          alt={`${details.Marca} ${details.Modelo}`}
        />

        {/* <hr className="border border-dark border-2 opacity-50" />
        <img
          src={`/images/${imageData.Imagen}`}
          className="img-fluid"
          alt={`${details.Marca} ${details.Modelo}`}
        /> */}
        <br />
        <br />
        <hr className="border border-dark border-2 opacity-50" />
        <h3>Motor</h3>
        <hr className="border border-dark border-2 opacity-50" />
        <div className="col-md-15">
          <div className="row">
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <strong>Tipo de Motor:</strong> {details.TipoMotor}
                </li>
                <li>
                  <strong>Cilindros:</strong> {details.Cilindros}
                </li>
                <li>
                  <strong>Cilindrada:</strong> {details.Cilindrada}
                </li>
                <li>
                  <strong>Servotronic:</strong> {details.Servotronic}
                </li>
                <li>
                  <strong>Combustible:</strong> {details.Combustible}
                </li>
                <li>
                  <strong>Detalles de Cilindros:</strong>{" "}
                  {details.DetallesCilindros}
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <li>Funcion ECO: {details.FuncionECO}</li>
                <li>Funcion AutoStar tStop: {details.FuncionAutoStartStop}</li>
                <li>Freno Estacionamiento: {details.FrenoEstacionamiento}</li>
                <li>Sistema Traccion: {details.SistemaTraccion}</li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <strong>Caja de Cambios:</strong> {details.CajaCambios}
                </li>
                <li>
                  <strong>HP:</strong> {details.HP}
                </li>
                <li>
                  <strong>Torque:</strong> {details.Torque}
                </li>
                <li>Aceleracion 0 a 100: {details.Aceleracion0_100}</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border border-dark border-2 opacity-50" />
        <h3>Seguridad del Vehiculo</h3>
        <hr className="border border-dark border-2 opacity-50" />
        <div className="col-md-15">
          <div className="row">
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <strong>Asistente de Manejo:</strong>{" "}
                  {details.Asistente_Manejo}
                </li>
                <li>
                  <strong>Frenos de Ventilados:</strong>{" "}
                  {details.Frenos_Ventilados}
                </li>
                <li>
                  <strong>Airbags Laterales:</strong>{" "}
                  {details.Airbags_Laterales}
                </li>
                <li>
                  <strong>Cierre Central:</strong> {details.Cierre_Central}
                </li>
                <li>
                  <strong>Dispositivo Alarma:</strong>{" "}
                  {details.Dispositivo_Alarma}
                </li>
                <li>
                  <strong>Interruptor Bateria:</strong>{" "}
                  {details.Interruptor_Bateria}
                </li>
                <li>
                  <strong>Rueda de Repuesto:</strong> {details.Rueda_Repuesto}
                </li>
                <li>
                  <strong>Botiquin Primeros Auxilios:</strong>{" "}
                  {details.Botiquin_Primeros_Auxilios}
                </li>
                <li>
                  <strong>Barras de Proteccion Lateral:</strong>{" "}
                  {details.Barras_Proteccion_Lateral}
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <strong>Llanta de Repuesto:</strong> {details.Llanta_Repuesto}
                </li>
                <li>
                  <strong>Control Dinamico de Estabilidad:</strong>{" "}
                  {details.Control_Dinamico_Estabilidad}
                </li>
                <li>
                  <strong>Sistema ABS:</strong> {details.Sistema_ABS}
                </li>
                <li>
                  <strong>Sensor de Colision:</strong> {details.Sensor_Colision}
                </li>
                <li>
                  <strong>Reposacabezas Regulables:</strong>{" "}
                  {details.Reposacabezas_Regulables}
                </li>
                <li>
                  <strong>Control de Airbag:</strong> {details.Control_Airbag}
                </li>
                <li>
                  <strong>Performance Control:</strong>{" "}
                  {details.Performance_Control}
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <strong>Union ISOFIX:</strong> {details.Union_ISOFIX}
                </li>
                <li>
                  <strong>Pernos Antirobo:</strong> {details.Pernos_Antirobo}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border border-dark border-2 opacity-50" />
        <h3>Interior</h3>
        <hr className="border border-dark border-2 opacity-50" />
        <div className="col-md-15">
          <div className="row">
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <strong>Control Crucero y Frenado:</strong>{" "}
                  {details.Control_Crucero_Frenado}
                </li>
                <li>
                  <strong>Preparacion Apple CarPlay:</strong>{" "}
                  {details.Preparacion_Apple_CarPlay}
                </li>
                <li>
                  <strong>Alfombras Velours:</strong>{" "}
                  {details.Alfombras_Velours}
                </li>
                <li>
                  <strong>Asientos Traseros Abatibles:</strong>{" "}
                  {details.Asientos_Traseros_Abatibles}
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <strong>Boton Arranque Encendido:</strong>{" "}
                  {details.Boton_Arranque_Encendido}
                </li>
                <li>
                  <strong>Retrovisor Interior Ajuste Automatico:</strong>{" "}
                  {details.Retrovisor_Interior_Ajuste_Automatico}
                </li>
                <li>
                  <strong>Volante Multifuncion:</strong>{" "}
                  {details.Volante_Multifuncion}
                </li>
                <li>
                  <strong>Aire Acondicionado Regulacion Zonas:</strong>{" "}
                  {details.Aire_Acondicionado_Regulacion_Zonas}
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <strong>
                    Reglaje Electrico y Asientos de Conductor con Memoria:
                  </strong>{" "}
                  {details.Reglaje_Electrico_Asientos_Conductor_Memoria}
                </li>
                <li>
                  <strong>Computadora Abordo:</strong>{" "}
                  {details.Computadora_Abordo}
                </li>
                <li>
                  <strong>Apoya Cabezas Traseros:</strong>{" "}
                  {details.Apoya_Cabezas_Traseros}
                </li>
                <li>
                  <strong>Molduras Interiores Negras:</strong>{" "}
                  {details.Molduras_Interiores_Negras}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border border-dark border-2 opacity-50" />
        <h3>Exterior</h3>
        <hr className="border border-dark border-2 opacity-50" />
        <div className="col-md-15">
          <div className="row">
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <strong>Sistema de Iluminacion Exterior:</strong>{" "}
                  {details.Sistema_Iluminacion_Exterior}
                </li>
                <li>
                  <strong>Espejos Retrovisores:</strong>{" "}
                  {
                    details.Espejos_Retrovisores_Ajuste_Automatico_Anti_Deslumbramiento
                  }
                </li>
                <li>
                  <strong>Aros:</strong>{" "}
                  {details.Carriles_Longitudinales_Aluminio_Satinado}
                </li>
                <li>
                  <strong>Camara Marcha Atras:</strong>{" "}
                  {details.Camara_Marcha_Atras}
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <strong>Faros:</strong> {details.Faros_LED_Adaptativos}
                </li>
                <li>
                  <strong>Tubo Terminal:</strong>{" "}
                  {details.Tubo_Terminal_Escape_Visible_Round}
                </li>
                <li>
                  <strong>Asistente Luz Carretera:</strong>{" "}
                  {details.Asistente_Luz_Carretera}
                </li>
                <li>
                  <strong>Calefaccion:</strong>{" "}
                  {details.Calefaccion_Vidrio_Trasero}
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <strong>Apertura Puerta:</strong>{" "}
                  {details.Apertura_Puerta_Trasera_Automatica}
                </li>
                <li>
                  <strong>Sensor Lluvia:</strong>{" "}
                  {details.Sensor_Lluvia_Accionamiento_Automatico_Luces}
                </li>
                <li>
                  <strong>Asistente de Aparcamiento:</strong>{" "}
                  {details.Asistente_Aparcamiento}
                </li>
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
          document={<PdfDocument details={details} imageData={imageData} />}
          fileName={`${details.Marca}_${details.Modelo}.pdf`}
        >
          {({ loading }) =>
            loading ? 'Generando PDF...' : 'Descargar PDF'
          }
        </PDFDownloadLink>
      </Modal.Footer>
    </Modal>
  );
};

export default AutoModal;
