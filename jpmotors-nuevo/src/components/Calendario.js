import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Calendario.css';
import CotizacionDetallesModal from './CotizacionDetallesModal';

const Calendario = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [vehiculos, setVehiculos] = useState(new Map()); // Usar un Map para almacenar los vehículos
  const [empleadoID, setEmpleadoID] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [showDetallesModal, setShowDetallesModal] = useState(false);
  const [selectedCotizacion, setSelectedCotizacion] = useState(null);

  useEffect(() => {
    const empleadoId = localStorage.getItem('userId');
    setEmpleadoID(empleadoId);

    const fetchData = async () => {
      try {
        if (empleadoId) {
          fetchCotizaciones(empleadoId);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  const fetchVehiculo = async (vehiculoId) => {
    if (!vehiculos.has(vehiculoId)) {
      const response = await axios.get(`http://localhost:4000/vehiculos/${vehiculoId}`);
      vehiculos.set(vehiculoId, response.data); // Almacenar en memoria
      setVehiculos(new Map(vehiculos)); // Actualizar el estado
    }
    return vehiculos.get(vehiculoId);
  };

  const fetchCotizaciones = async (empleadoId) => {
    try {
      const response = await axios.get(`http://localhost:4000/cotizaciones/byEmpleadoId/${empleadoId}`);
      const cotizacionesData = response.data;
      setCotizaciones(cotizacionesData);
    } catch (error) {
      console.error('Error al cargar cotizaciones:', error);
    }
  };

  const obtenerCotizacionesPorFecha = (date) => {
    const fechaActual = date.toISOString().slice(0, 10);
    return cotizaciones.filter(
      (cotizacion) => cotizacion.FechaSeguimiento === fechaActual && cotizacion.EstadoCotizacion !== 'Anulada'
    );
  };

  const generarDiasDelMes = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];
    let week = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      week.push(<td key={`empty-${i}`} className="empty-day"></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const cotizacionesDelDia = obtenerCotizacionesPorFecha(currentDate);

      week.push(
        <td key={day} className="day-cell">
          <div className="day-number">{day}</div>
          {cotizacionesDelDia.length > 0 && (
            <div className="cotizaciones-del-dia">
              {cotizacionesDelDia.map((cotizacion) => (
                <Button
                  key={cotizacion.CotizacionID}
                  variant="link"
                  className="cotizacion-item badge bg-primary text-wrap"
                  onClick={() => handleShowDetalles(cotizacion)}
                >
                  {cotizacion.NombreCliente}
                </Button>
              ))}
            </div>
          )}
        </td>
      );

      if (week.length === 7) {
        calendarDays.push(<tr key={`week-${day}`}>{week}</tr>);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(<td key={`empty-${week.length}`} className="empty-day"></td>);
      }
      calendarDays.push(<tr key="last-week">{week}</tr>);
    }

    return calendarDays;
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleShowDetalles = async (cotizacion) => {
    const vehiculo = await fetchVehiculo(cotizacion.VehiculoID);
    setSelectedCotizacion({
      ...cotizacion,
      VehiculoDescripcion: `${vehiculo.Modelo} ${vehiculo.Marca} ${vehiculo.Anio}`,
      PrecioWeb: vehiculo.PrecioWeb,
      PrecioGerente: vehiculo.PrecioGerente,
      PrecioLista: vehiculo.PrecioLista,
    });
    setShowDetallesModal(true);
  };

  const handleCloseDetallesModal = () => setShowDetallesModal(false);

  const calendarDays = generarDiasDelMes(year, month);

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return (
    <Container className="my-4">
      <Row className="justify-content-center mb-3">
        <Col md={10} className="d-flex justify-content-between align-items-center">
          <Button variant="secondary" onClick={handlePrevMonth}>Anterior</Button>
          <h2 className="calendar-header text-center">
            {monthNames[month]} {year}
          </h2>
          <Button variant="secondary" onClick={handleNextMonth}>Siguiente</Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={10}>
          <Table bordered className="calendar-table">
            <thead>
              <tr>
                <th>Lun</th>
                <th>Mar</th>
                <th>Mié</th>
                <th>Jue</th>
                <th>Vie</th>
                <th>Sáb</th>
                <th>Dom</th>
              </tr>
            </thead>
            <tbody>
              {calendarDays}
            </tbody>
          </Table>
        </Col>
      </Row>

      {selectedCotizacion && (
        <CotizacionDetallesModal
          show={showDetallesModal}
          onHide={handleCloseDetallesModal}
          cotizacion={selectedCotizacion}
        />
      )}
    </Container>
  );
};

export default Calendario;
