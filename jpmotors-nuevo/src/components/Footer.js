import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import mapawaze from "../img/mapa.jpg";

const Footer = () => {
  return (
    <>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <footer className="footer no-print bg-light">
        <Container className="bg-light">
          <Row>
            <Col md={6}>
              <h4>JP Motors Guatemala</h4>
              <p>
                Te asesoramos en tu compra y te ofrecemos las mejores facilidades
                de pago para que puedas adquirir tu vehículo.
              </p>
              <p>
                <span className="fas fa-map-marker-alt"></span> Santa Elena, a media cuadra del centro de salud frente a gasolinera Puma, Flores, Petén.
              </p>
              <p>
                <span className="fas fa-phone"></span> (502) 3973 - 1085
              </p>
              <p>
                <span className="far fa-envelope"></span> info@jpmotorsgt.com
              </p>
            </Col>
            <Col md={6}>
              <h4>¿Cómo llegar a la agencia?</h4>
              <Row>
                <Col md={12}>
                  {/* Imagen del mapa que redirige a Waze */}
                  <a
                    href="https://ul.waze.com/ul?preview_venue_id=177012905.1770129051.38228282&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={mapawaze} // Cambia esta URL por la imagen de tu mapa
                      alt="Mapa de cómo llegar a JP Motors en Waze"
                      style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
                    />
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="text-center">
              <p className="text-muted">&copy; 2023 JP Motors. Todos los derechos reservados.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;