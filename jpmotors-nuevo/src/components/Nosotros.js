import React from 'react';
import { Col, Card } from 'react-bootstrap';
import cardImg2 from '../img/vision.png';
import cardImg3 from '../img/vision1.png';
import cardImg4 from '../img/fundacion.jpg';
import cardImg5 from '../img/inicios.jpg';
import cardImg6 from '../img/crecimiento.jpg';
import cardImg7 from '../img/actualidad.jpeg';




function Nosotros() {
  return (
    <div>
      <br />
      <br />
      {/* Contenedor centrado */}
      <div className="text-center mb-4">
        <h1>JP MOTORS, S. A.</h1>
        <h4>QUIENES SOMOS</h4>
        <p>
          Somos una empresa dedicada a ofrecer productos y servicios de la más alta calidad en la industria automotriz.
        </p>
        <p>Nuetros Objetivos principales:</p>
        <ul className="list-unstyled">
          <li>• Calidad: Nos esforzamos por mantener los más altos estándares en todos nuestros productos y servicios.</li>
          <li>• Servicio al Cliente: Valoramos a nuestros clientes y nos comprometemos a brindarles una atención personalizada y eficiente.</li>
          <li>• Sostenibilidad: Promovemos prácticas sostenibles y responsables con el medio ambiente.</li>
        </ul>
      </div>

      <div className="row">
        <Col sm={6}>
          <Card className="mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={cardImg2} className="img-fluid rounded-start" alt="Descriptive text for vision" />
              </div>
              <div className="col-md-8">
                <Card.Body>
                  <Card.Title>Visión</Card.Title>
                  <Card.Text>
                    “Ser una empresa líder en la venta de vehículos nuevos en el mercado local y nacional, reconocida por ofrecer una experiencia excepcional al cliente, una amplia gama de opciones de alta calidad y un compromiso inquebrantable con la sostenibilidad. Nos esforzamos por innovar constantemente y adaptarnos a las necesidades de nuestros clientes, convirtiéndonos en su socio de confianza en la movilidad del futuro.”
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
                <img src={cardImg3} className="img-fluid rounded-start" alt="Descriptive text for mission" />
              </div>
              <div className="col-md-8">
                <Card.Body>
                  <Card.Title>Misión</Card.Title>
                  <Card.Text>
                    “Nuestra misión es ofrecer a nuestros clientes una experiencia excepcional en la compra de vehículos nuevos y usados, brindando una amplia gama de opciones de alta calidad, un servicio al cliente personalizado y transparente, y un compromiso con la sostenibilidad. Nos esforzamos por ser puente entre la innovación automotriz y las necesidades de nuestros clientes, asegurando que cada vehículo que vendemos no solo cumpla con sus expectativas, sino que también contribuya a un futuro más limpio y eficiente.”
                  </Card.Text>
                </Card.Body>
              </div>
            </div>
          </Card>
        </Col>
      </div>

      <div className="row">
        {/* <Col sm={6}>
          <Card className="mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={cardImg4} className="img-fluid rounded-start" alt="Descriptive text for mission" />
              </div>
              <div className="col-md-8">
                <Card.Body>
                  <Card.Title>Fundación</Card.Title>
                  <Card.Text>
                    La empresa JP MOTORS, S. A. fue fundada el 2 de octubre del año 2023, por la Lcda. Diana Paola Rosado Burgos, visionaria, apasionada por la innovación y calidad en la industria automotriz, con experiencia de 13 años en ventas de vehículos nuevos, destacada a nivel nacional en ventas anuales en la marca KIA y pionera en la apertura de Agencia Multimarcas Excel Petén (2018-2021).
                  </Card.Text>
                </Card.Body>
              </div>
            </div>
          </Card>
        </Col> */}

        {/* <Col sm={6}>
          <Card className="mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={cardImg5} className="img-fluid rounded-start" alt="Descriptive text for inicios" />
              </div>
              <div className="col-md-8">
                <Card.Body>
                  <Card.Title>Inicios</Card.Title>
                  <Card.Text>
                    El primer año fue desafiante, pero con una visión clara, un compromiso inquebrantable con la excelencia de nuestro servicio y experiencia, la empresa ha comenzado a ganar reconocimiento en el mercado local y nacional.
                  </Card.Text>
                </Card.Body>
              </div>
            </div>
          </Card>
        </Col> */}
      </div>

      <div className="row">
        {/* <Col sm={6}>
    <Card className="mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={cardImg5} className="img-fluid rounded-start" alt="Descriptive text for crecimiento" />
        </div>
        <div className="col-md-8">
          <Card.Body>
            <Card.Title>Crecimiento</Card.Title>
            <Card.Text>
              A medida que la reputación de la empresa crece, también lo hace su base de clientes.
            </Card.Text>
          </Card.Body>
        </div>
      </div>
    </Card>
  </Col> */}

        <Col sm={6}>
          <Card className="mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={cardImg6} className="img-fluid rounded-start" alt="Descriptive text for actualidad" />
              </div>
              <div className="col-md-8">
                <Card.Body>
                  <Card.Title>Actualidad</Card.Title>
                  <Card.Text>
                    Hoy en día, la empresa JP MOTORS, S. A. es reconocida por su compromiso con la calidad y el excelente servicio al cliente.
                  </Card.Text>
                </Card.Body>
              </div>
            </div>
          </Card>
        </Col>
      </div>

      <div className="row">
        {/* <Col sm={6}>
    <Card className="mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={cardImg7} className="img-fluid rounded-start" alt="Descriptive text for legalidad" />
        </div>
        <div className="col-md-8">
          <Card.Body>
            <Card.Title>Legalidad</Card.Title>
            <Card.Text>
              Según el artículo 19 de la Ley contra el Lavado de Dinero u Otros Activos y Acuerdo Gubernativo número 443-2013, la empresa JP MOTORS, S. A., es persona obligada inscrita ante la Superintendencia de Bancos a través de la Intendencia de Verificación Especial, por lo tanto cuenta con programas, normas, procedimientos y controles internos, para la prevención contra el Lavado de Dinero u otros activos y para prevenir y reprimir el financiamiento del terrorismo.
            </Card.Text>
          </Card.Body>
        </div>
      </div>
    </Card>
  </Col> */}
      </div>
      <br />
      {/* Productos y Servicios fuera de las tarjetas, centrado */}
      <div className="text-center mb-4" style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Productos y Servicios</h4>
        <p style={{ fontSize: '1.5rem' }}>
          Vehículos Nuevos: Mitsubishi, Nissan, Kia, Ford, Fuso, BMW y Mini Cooper.
        </p>
        <p style={{ fontSize: '1.5rem' }}>
          Vehículos Usados: Marcas en general.
        </p>
        <p style={{ fontSize: '1.5rem' }}>
          <strong>Servicios Adicionales:</strong> Accesorios y repuestos para todas las marcas de vehículos.
        </p>
      </div>

    </div>
  );
}

export default Nosotros;
