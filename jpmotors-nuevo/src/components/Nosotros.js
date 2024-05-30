import React from 'react';
import { Col, Card } from 'react-bootstrap';
import cardImg1 from '../img/objetivo.jpeg';
import cardImg2 from '../img/vision.png';

function Nosotros() {
  return (
    <div>
      <br/>
      <br/>
    <div className="row">
      <Col sm={6}>
        <Card className="mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={cardImg1} className="img-fluid rounded-start" alt="Descriptive text for card 1" />
            </div>
            <div className="col-md-8">
              <Card.Body>
                <Card.Title>¿ESTÁS PENSANDO EN COMPRAR UN AUTO NUEVO?</Card.Title>
                <Card.Text>
                  ¡En JP Motors te ofrecemos las mejores opciones del mercado! Nuestros autos están equipados con la última tecnología, lo que te garantiza una experiencia de conducción segura, cómoda y eficiente. Además, ofrecemos una amplia variedad de modelos para que puedas elegir el que mejor se ajuste a tus necesidades.
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
                <Card.Title>¿BUSCAS UN AUTO USADO?</Card.Title>
                <Card.Text>
                  ¡En JP Motors tenemos las mejores opciones para ti! Nuestros autos usados están rigurosamente revisados para garantizarte seguridad, comodidad y eficiencia a un precio inmejorable. Con una amplia variedad de modelos, estamos seguros de que encontrarás el auto perfecto que se ajuste a tus necesidades y presupuesto. ¡Visítanos hoy y descubre todas nuestras ofertas!
                </Card.Text>
              </Card.Body>
            </div>
          </div>
        </Card>
      </Col>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    
    </div>
  );
}

export default Nosotros;
