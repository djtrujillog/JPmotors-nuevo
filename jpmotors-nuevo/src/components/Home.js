import React, { useState, useEffect } from "react";
import { Carousel, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import cardImg1 from "../img/Logo-02.jpg";
import cardImg2 from "../img/Logo-03.jpg";

function Home() {
  const [carouselImages, setCarouselImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = "https://cotizaciones-jpmotors.onrender.com/image/all";

  // Cargar imágenes desde el endpoint
  const fetchCarouselImages = async () => {
    try {
      const response = await axios.get(apiUrl);
      setCarouselImages(response.data.images); // Guardar las imágenes obtenidas
    } catch (error) {
      console.error("Error al cargar las imágenes del carrusel:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar imágenes al montar el componente
  useEffect(() => {
    fetchCarouselImages();
  }, []);

  return (
    <Container>
      {/* Carrusel */}
      {loading ? (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando carrusel...</span>
          </div>
        </div>
      ) : (
        <Carousel>
          {carouselImages.map((image, index) => (
            <Carousel.Item key={image.name}>
              <img
                src={image.url}
                className="d-block w-100"
                alt={`Slide ${index + 1}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {/* Tarjetas */}
      <Row className="mt-4">
        <Col sm={6} className="mb-3 mb-sm-0">
          <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={cardImg1}
                  className="img-fluid rounded-start"
                  alt="Descriptive text for card 1"
                />
              </div>
              <div className="container-xl">
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      ¿ESTÁS PENSANDO EN COMPRAR UN AUTO NUEVO?
                    </h5>
                    <p className="card-text">
                      ¡En Jp Motors te ofrecemos las mejores opciones del
                      mercado! Nuestros autos están equipados con la última
                      tecnología, lo que te garantiza una experiencia de
                      conducción segura, cómoda y eficiente. Además, ofrecemos
                      una amplia variedad de modelos para que puedas elegir el
                      que mejor se ajuste a tus necesidades.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={6}>
          <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={cardImg2}
                  className="img-fluid rounded-start"
                  alt="Descriptive text for card 2"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="container-xl">
                    <h5 className="card-title">¿BUSCAS UN AUTO USADO?</h5>
                    <p className="card-text">
                      ¡En JP Motors tenemos las mejores opciones para ti!
                      Nuestros autos usados están rigurosamente revisados para
                      garantizarte seguridad, comodidad y eficiencia a un precio
                      inmejorable. Con una amplia variedad de modelos, estamos
                      seguros de que encontrarás el auto perfecto que se ajuste a
                      tus necesidades y presupuesto. ¡Visítanos hoy y descubre
                      todas nuestras ofertas!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
