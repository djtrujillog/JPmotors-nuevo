import React from 'react';
import { Col, Card } from 'react-bootstrap';
import cardImg1 from '../img/objetivo.jpeg';
import cardImg2 from '../img/vision.png';
import cardImg3 from '../img/vision1.png';

function Nosotros() {
  return (
    <div>
      <br />
      <br />
      <div className="row">
        <Col sm={6}>
          <Card className="mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={cardImg1} className="img-fluid rounded-start" alt="Descriptive text for card 1" />
              </div>
              <div className="col-md-8">
                <Card.Body>
                  <Card.Title>Objetivos</Card.Title>
                  <Card.Text>
                    <ul>
                      <li>
                        <strong>Calidad y Seguridad:</strong> Garantizar que todos los vehículos cumplan con altos estándares de calidad y seguridad para proteger a los conductores y pasajeros.
                      </li>
                      <li>
                        <strong>Satisfacción del cliente:</strong> Ofrecer un excelente servicio al cliente y productos que superen las expectativas de los consumidores.
                      </li>
                    </ul>
                  </Card.Text>

                </Card.Body>
              </div>
            </div>
          </Card>
        </Col>
        <Col sm={6}>
          <Card className="mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={cardImg2} className="img-fluid rounded-start" alt="Descriptive text for card 2" />
              </div>
              <div className="col-md-8">
                <Card.Body>
                  <Card.Title>Visión</Card.Title>
                  <Card.Text>
                    Ser la empresa líder en la comercialización de vehículos innovadores y sostenibles, reconocida por ofrecer soluciones de movilidad que mejoren la calidad de vida de nuestros clientes. Nos comprometemos a anticiparnos a las tendencias del mercado, adoptando tecnologías que promuevan la eficiencia energética y el respeto al medio ambiente, mientras mantenemos una relación de confianza y lealtad con nuestros clientes y socios.
                  </Card.Text>
                </Card.Body>
              </div>
            </div>
          </Card>
        </Col>
        <Col sm={6}>
          <Card className="mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={cardImg3} className="img-fluid rounded-start" alt="Descriptive text for card 2" />
              </div>
              <div className="col-md-8">
                <Card.Body>
                  <Card.Title>Misíon</Card.Title>
                  <Card.Text>
                    Nuestra misión es ofrecer a nuestros clientes una experiencia excepcional en la compra de vehiculos nuevos, brindando una amplia gama de opciones de alta calidad, un servicio al cliente personalizado y transparente, y un compromiso con la sostenibilidad. Nos esforzamos por ser el puente entre la innovacion automotriz y la necesidades de nuestros clientes, asegurando que cada vehiculo que vendemos no solo cumpla con sus expectativas, sino que tambien contribuya a un futuro más limpio y eficiente.
                  </Card.Text>
                </Card.Body>
              </div>
            </div>
          </Card>
        </Col>
      </div>
      <br />
      <br />
      <br />
      <br />

    </div>
  );
}

export default Nosotros;
