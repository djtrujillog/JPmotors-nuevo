// AutoModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import GenerarPdf from './GenerarPdf';
import '../css/AutoModal.css';  // Import custom CSS

const AutoModal = ({ auto, onClose }) => {
    const [imageData, setImageData] = useState(null);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/vehiculos/${auto.VehiculoID}`)
            .then(response => response.json())
            .then(data => setImageData(data))
            .catch(error => console.error('Error al cargar la imagen del vehículo:', error));

        fetch(`http://localhost:5000/vehiculos/detalle/${auto.VehiculoID}`)
            .then(response => response.json())
            .then(data => setDetails(data))
            .catch(error => console.error('Error al cargar los detalles del vehículo:', error));
    }, [auto]);

    if (!details || !imageData) return null;

    return (
        <Modal show={true} onHide={onClose} dialogClassName="custom-modal-width">
            <Modal.Header closeButton>
                <Modal.Title>{details.Marca} {details.Modelo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img 
                    src={`/images/${imageData.Imagen}`} 
                    className="img-fluid" 
                    alt={`${details.Marca} ${details.Modelo}`}
                />
                {/* Muestra los detalles del vehículo sin bucle */}
                <br/>
                <br/>
                {/* <p><strong>Marca:</strong> {details.Marca}</p>
                <p><strong>Modelo:</strong> {details.Modelo}</p> */}
                <h3>Motor</h3>
                <p><strong>TipoMotor:</strong> {details.TipoMotor}</p>
                <p><strong>Cilindros:</strong> {details.Cilindros}</p>
                <p><strong>Cilindrada:</strong> {details.Cilindrada}</p>
                <p><strong>Servotronic:</strong> {details.Servotronic}</p>
                <p><strong>Combustible:</strong> {details.Combustible}</p>
                <p><strong>DetallesCilindros:</strong> {details.DetallesCilindros}</p>
                <p><strong>Funcion ECO:</strong> {details.FuncionECO}</p>
                <p><strong>Funcion AutoStar tStop:</strong> {details.FuncionAutoStartStop}</p>
                <p><strong>Freno Estacionamiento:</strong> {details.FrenoEstacionamiento}</p>
                <p><strong>Sistema Traccion:</strong> {details.SistemaTraccion}</p>
                <p><strong>Caja de Cambios:</strong> {details.CajaCambios}</p>
                <p><strong>Caballos de Fuerza:</strong> {details.HP}</p>
                <p><strong>Torque:</strong> {details.Torque}</p>
                <p><strong>Aceleracion 0 a 100:</strong> {details.Aceleracion0_100}</p>
                <p><strong>Asistente de Manejo:</strong> {details.Asistente_Manejo}</p>
                <p><strong>Frenos de Ventilados:</strong> {details.Frenos_Ventilados}</p>
                <p><strong>Airbags Laterales:</strong> {details.Airbags_Laterales}</p>
                <p><strong>Cierre Central:</strong> {details.Cierre_Central}</p>
                <p><strong>Dispositivo Alarma:</strong> {details.Dispositivo_Alarma}</p>
                <p><strong>Interruptor Bateria:</strong> {details.Interruptor_Bateria}</p>
                <p><strong>Rueda de Repuesto:</strong> {details.Rueda_Repuesto}</p>
                <p><strong>Botiquin Primeros Auxilios:</strong> {details.Botiquin_Primeros_Auxilios}</p>
                <p><strong>Barras de Proteccion Lateral:</strong> {details.Barras_Proteccion_Lateral}</p>
                <p><strong>Llanta de Repuesto:</strong> {details.Llanta_Repuesto}</p>
                <p><strong>Control Dinamico de Estabilidad:</strong> {details.Control_Dinamico_Estabilidad}</p>
                <p><strong>Sistema ABS:</strong> {details.Sistema_ABS}</p>
                <p><strong>Sensor de Colision:</strong> {details.Sensor_Colision}</p>
                <p><strong>Reposacabezas Regulables:</strong> {details.Reposacabezas_Regulables}</p>
                <p><strong>Control de Airbag:</strong> {details.Control_Airbag}</p>
                <p><strong>Performance Control:</strong> {details.Performance_Control}</p>
                <p><strong>Union ISOFIX:</strong> {details.Union_ISOFIX}</p>
                <p><strong>Pernos Antirobo:</strong> {details.Pernos_Antirobo}</p>
                <p><strong>Control Crucero y Frenado:</strong> {details.Control_Crucero_Frenado}</p>
                <p><strong>Preparacion Apple CarPlay:</strong> {details.Preparacion_Apple_CarPlay}</p>
                <p><strong>Alfombras Velours:</strong> {details.Alfombras_Velours}</p>
                <p><strong>Asientos Traseros Abatibles:</strong> {details.Asientos_Traseros_Abatibles}</p>
                <p><strong>Boton Arranque Encendido:</strong> {details.Boton_Arranque_Encendido}</p>
                <p><strong>Retrovisor Interior Ajuste Automatico:</strong> {details.Retrovisor_Interior_Ajuste_Automatico}</p>
                <p><strong>Volante Multifuncion:</strong> {details.Volante_Multifuncion}</p>
                <p><strong>Aire Acondicionado Regulacion Zonas:</strong> {details.Aire_Acondicionado_Regulacion_Zonas}</p>
                <p><strong>Reglaje Electrico y Asientos de Conductor con Memoria:</strong> {details.Reglaje_Electrico_Asientos_Conductor_Memoria}</p>
                <p><strong>Computadora Abordo:</strong> {details.Computadora_Abordo}</p>
                <p><strong>Apoya Cabezas Traseros:</strong> {details.Apoya_Cabezas_Traseros}</p>
                <p><strong>Molduras Interiores Negras:</strong> {details.Molduras_Interiores_Negras}</p>
                <p><strong>Paquete Compartimentos:</strong> {details.Paquete_Compartimentos}</p>
                <p><strong>Asientos Deportivos Conductor_Acompanante:</strong> {details.Asientos_Deportivos_Conductor_Acompanante}</p>
                <p><strong>Vidrios Electricos Apertura Cierre Automatico:</strong> {details.Vidrios_Electricos_Apertura_Cierre_Automatico}</p>
                <p><strong>Apoyabrazos_Delantero:</strong> {details.Apoyabrazos_Delantero}</p>
                <p><strong>Toma Corriente_12V:</strong> {details.Toma_Corriente_12V}</p>
                <p><strong>Access Comfort:</strong> {details.Access_Comfort}</p>
                <p><strong>Interfaz USB:</strong> {details.Interfaz_USB}</p>
                <p><strong>iDrive Controller:</strong> {details.iDrive_Controller}</p>
                <p><strong>Luces Bienvenida:</strong> {details.Luces_Bienvenida}</p>
                <p><strong>Asiento Acompanante_Ajuste_Altura:</strong> {details.Asiento_Acompanante_Ajuste_Altura}</p>
                <p><strong>Cargador Inalambrico_Celular:</strong> {details.Cargador_Inalambrico_Celular}</p>
                <p><strong>Panel Instrumentos Lujo:</strong> {details.Panel_Instrumentos_Lujo}</p>
                <p><strong>Pantalla Panoramica:</strong> {details.Pantalla_Panoramica}</p>
                <p><strong>Pantalla Panoramica_Interior_10_25_Pulgadas:</strong> {details.Pantalla_Panoramica_Interior_10_25_Pulgadas}</p>
                <p><strong>Pantalla :</strong> {details.Pantalla_CID_Display_10_7_Pulgadas}</p>
                <p><strong>Sistema Altavoces Stereo:</strong> {details.Sistema_Altavoces_Stereo_6_Altavoces}</p>
                <p><strong>Tapiceria:</strong> {details.Tapiceria_Cuero_Vegano_Veganza_Perforated}</p>
                <p><strong>BMW Live Cockpit Professional:</strong> {details.BMW_Live_Cockpit_Professional}</p>
                <p><strong>Sistema de Iluminacion Exterior:</strong> {details.Sistema_Iluminacion_Exterior}</p>
                <p><strong>Espejos Retrovisores :</strong> {details.Espejos_Retrovisores_Ajuste_Automatico_Anti_Deslumbramiento}</p>
                <p><strong>Aros:</strong> {details.Carriles_Longitudinales_Aluminio_Satinado}</p>
                <p><strong>Camara Marcha Atras:</strong> {details.Camara_Marcha_Atras}</p>
                <p><strong>Faros:</strong> {details.Faros_LED_Adaptativos}</p>
                <p><strong>Tubo Terminal:</strong> {details.Tubo_Terminal_Escape_Visible_Round}</p>
                <p><strong>Asistente Luz Carretera:</strong> {details.Asistente_Luz_Carretera}</p>
                <p><strong>Calefaccion:</strong> {details.Calefaccion_Vidrio_Trasero}</p>
                <p><strong>Apertura Puerta:</strong> {details.Apertura_Puerta_Trasera_Automatica}</p>
                <p><strong>Sensor Lluvia:</strong> {details.Sensor_Lluvia_Accionamiento_Automatico_Luces}</p>
                <p><strong>Asistente de Aparcamiento:</strong> {details.Asistente_Aparcamiento}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cerrar</Button>
                <Button variant="primary" onClick={() => GenerarPdf(details, imageData)}>Generar PDF</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AutoModal;
