import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <><br /><br /><br /><br /><br /><br /><br /><br />
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
              <span className="fas fa-map-marker-alt"></span> Por el centro de
              salud, San Benito, Petén.
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
              <Col md={8}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d393.42722672615804!2d-89.89991476724468!3d16.912563416830753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTbCsDU0JzQ1LjciTiA4OcKwNTMnNTkuNiJX!5e1!3m2!1ses-419!2sgt!4v1716395807098!5m2!1ses-419!2sgt"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de ubicación de JP Motors Guatemala"
                ></iframe>
              </Col>
              <Col md={4} className="text-center">
                <h6>Síguenos</h6>
                <span
                  className="fab fa-facebook-square"
                  onClick={() => window.open(
                    "https://www.facebook.com/jpmotorsgt?mibextid=sCpJLy",
                    "_blank"
                  )}
                ></span>
                <span
                  className="fab fa-instagram"
                  onClick={() => window.open(
                    "https://www.instagram.com/jpmotorsgt?igsh=MXU2eXVhdXlyNDdxcg%3D%3D",
                    "_blank"
                  )}
                ></span>
                <span
                  className="fab fa-whatsapp"
                  onClick={() => window.open(
                    "https://api.whatsapp.com/send?phone=50239731085&text=%c2%a1Hola%21%2c%20me%20gustar%c3%ada%20consultar%20informaci%c3%b3n%20acerca%20de%20un%20vehículo.",
                    "_blank"
                  )}
                ><br /></span>
                <span
                  className="fa fa-solid fa-map-pin"
                  onClick={() => window.open(
                    "https://maps.app.goo.gl/WWxi4PL3varFVxZu7",
                    "_blank"
                  )}
                ></span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <section className="footer no-print">
        {/* <Container className="content">
      <Row>
        <Col md={6} xs={12}>
          <p id="Info-empresa"></p>
        </Col>
        <Col md={6} xs={12} className="text-end">
          <p>
            Desarrollado por{" "}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              JMservices
            </a>
          </p>
        </Col>
      </Row>
    </Container> */}
      </section>
      {/* <style jsx>{`
      .footer {
        position: abso;
        bottom: 0;
        width: 100%;
        background-color: #f8f9fa;
        padding: 10px 0;
        z-index: 1000;
      }
    `}</style> */}
    </footer></>
  );
};



export default Footer;
