import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="no-print footer-fixed">
      <Container className="content padding-top: 60px">
        <Row>
          <Col md={6}>
            <h4>JP Motors Guatemala</h4>
            <p>Te asesoramos en tu compra y te ofrecemos las mejores facilidades de pago para que puedas adquirir tu vehículo.</p>
            <p><span className="fas fa-map-marker-alt"></span> Por el centro de salud, San Benito, Petén.</p>
            <p><span className="fas fa-phone"></span> (502) 3973 - 1085</p>
            <p><span className="far fa-envelope"></span> info@jpmotorsgt.com</p>
          </Col>
          <Col md={6}>
            <h4>¿Cómo llegar a la agencia?</h4>
            <Row>
              <Col md={8}>
                <a href="https://maps.app.goo.gl/WWxi4PL3varFVxZu7" target="_blank" rel="noopener noreferrer">
                  <img src="images/map-waze-ubicacion-jpmoptors.png" alt="Como llegar a la agencia?" className="img-responsive" />
                </a>
              </Col>
              <Col md={4} className="text-center siguenos">
                <h6>Síguenos</h6>
                <span className="fab fa-facebook-square" onClick={() => window.open('https://www.facebook.com/jpmotorsgt?mibextid=sCpJLy', '_blank')}></span>
                <span className="fab fa-instagram" onClick={() => window.open('https://www.instagram.com/jpmotorsgt?igsh=MXU2eXVhdXlyNDdxcg%3D%3D', '_blank')}></span>
                <span className="fab fa-whatsapp" onClick={() => window.open('https://api.whatsapp.com/send?phone=50250601959&text=%c2%a1Hola%21%2c%20me%20gustar%c3%ada%20consultar%20informaci%c3%b3n%20acerca%20de%20un%20vehículo.', '_blank')}></span>
                <span className="fa fa-solid fa-map-pin" onClick={() => window.open('https://maps.app.goo.gl/WWxi4PL3varFVxZu7', '_blank')}></span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <section className="footer no-print">
        <Container className="content">
          <Row>
            <Col md={6} xs={12}>
              <p id="Info-empresa"></p>
            </Col>
            <Col md={6} xs={12} className="text-right">
              <p>Desarrollado por <a href="https://github.com/EAR1610" target="_blank" rel="noopener noreferrer">JMservices</a></p>
            </Col>
          </Row>
        </Container>
      </section>
    </footer>
  );
};

export default Footer;
