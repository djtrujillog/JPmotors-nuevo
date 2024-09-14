import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';

function Reportes() {
  const [tipoReporte, setTipoReporte] = useState('');
  const [params, setParams] = useState({
    EmpleadoID: '',
    VehiculoID: '',
    FechaInicial: '',
    FechaFinal: '',
    ClienteId: ''
  });
  const [empleados, setEmpleados] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [reportes, setReportes] = useState([]);
  const [error, setError] = useState(null);

  // Manejar el cambio de tipo de reporte
  const handleTipoReporteChange = (e) => {
    setTipoReporte(e.target.value);
    setParams({
      EmpleadoID: '',
      VehiculoID: '',
      FechaInicial: '',
      FechaFinal: '',
      ClienteId: ''
    });
    setReportes([]);
    setError(null);
  };

  // Manejar el cambio de parámetros del formulario
  const handleParamChange = (name, value) => {
    setParams({
      ...params,
      [name]: value
    });
  };

  // Cargar los vehículos disponibles cuando se selecciona "Por Vehículo"
  useEffect(() => {
    if (tipoReporte === 'byVehiculoID') {
      const fetchVehiculos = async () => {
        try {
          const response = await axios.get('http://localhost:4000/vehiculos/pornombre');
          setVehiculos(response.data);
        } catch (error) {
          console.error('Error fetching vehicles:', error);
          setError('Error al cargar los vehículos. Intente nuevamente.');
        }
      };
      fetchVehiculos();
    }
  }, [tipoReporte]);

  // Cargar los empleados disponibles cuando se selecciona "Por Empleado"
  useEffect(() => {
    if (tipoReporte === 'byEmpleadoID') {
      const fetchEmpleados = async () => {
        try {
          const response = await axios.get('http://localhost:4000/empleados');
          setEmpleados(response.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
          setError('Error al cargar los empleados. Intente nuevamente.');
        }
      };
      fetchEmpleados();
    }
  }, [tipoReporte]);

  // Realizar la consulta de reportes
  const fetchReportes = async () => {
    try {
      let response;

      // Manejo de reportes dependiendo del tipo seleccionado
      switch (tipoReporte) {
        case 'cotizaciones':
          response = await axios.get('http://localhost:4000/cotizaciones');
          break;
        case 'cotizacionByID':
          response = await axios.get(`http://localhost:4000/cotizaciones/${params.CotizacionID}`);
          break;
        case 'byEmpleadoID':
          response = await axios.get(`http://localhost:4000/cotizaciones/byEmpleadoId/${params.EmpleadoID}`);
          break;
        case 'byVehiculoID':
          response = await axios.get(`http://localhost:4000/cotizaciones/byVehiculoId/${params.VehiculoID}`);
          break;
        case 'byFechas':
          const filtros = {};
          if (params.FechaInicial) filtros.FechaInicial = params.FechaInicial;
          if (params.FechaFinal) filtros.FechaFinal = params.FechaFinal;
          if (params.ClienteId) filtros.ClienteId = params.ClienteId;
          if (params.VehiculoID) filtros.VehiculoId = params.VehiculoID;

          response = await axios.post('http://localhost:4000/cotizaciones/byFechas', filtros);
          break;
        default:
          console.error('Tipo de reporte no válido');
          return;
      }

      setReportes(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Error al generar el reporte. Verifica los parámetros e inténtalo nuevamente.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchReportes();
  };

  return (
    <Container>
      <h1>Generar Reportes</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTipoReporte">
          <Form.Label>Seleccione el tipo de reporte</Form.Label>
          <Form.Control as="select" value={tipoReporte} onChange={handleTipoReporteChange}>
            <option value="">Seleccione...</option>
            <option value="cotizaciones">Todas las Cotizaciones</option>
            <option value="cotizacionByID">Cotización por ID</option>
            <option value="byEmpleadoID">Cotizaciones por ID de Empleado</option>
            <option value="byVehiculoID">Cotizaciones por ID de Vehículo</option>
            <option value="byFechas">Cotizaciones por Fechas</option>
          </Form.Control>
        </Form.Group>

        {/* Campos dinámicos según el tipo de reporte */}
        {tipoReporte === 'cotizacionByID' && (
          <Form.Group controlId="formCotizacionID">
            <Form.Label>ID de Cotización</Form.Label>
            <Form.Control type="number" name="CotizacionID" value={params.CotizacionID} onChange={(e) => handleParamChange('CotizacionID', e.target.value)} />
          </Form.Group>
        )}

        {tipoReporte === 'byEmpleadoID' && (
          <Form.Group controlId="formEmpleadoID">
            <Form.Label>Seleccione un Empleado</Form.Label>
            <Select
              name="EmpleadoID"
              options={empleados.map(empleado => ({
                value: empleado.EmpleadoID,
                label: `${empleado.Nombre} ${empleado.Apellido}`
              }))}
              value={empleados.find(emp => emp.EmpleadoID === params.EmpleadoID) ? {
                value: params.EmpleadoID,
                label: `${empleados.find(emp => emp.EmpleadoID === params.EmpleadoID).Nombre} ${empleados.find(emp => emp.EmpleadoID === params.EmpleadoID).Apellido}`
              } : null}
              onChange={(option) => handleParamChange('EmpleadoID', option ? option.value : '')}
              placeholder="Seleccione un empleado..."
            />
          </Form.Group>
        )}

        {tipoReporte === 'byVehiculoID' && (
          <Form.Group controlId="formVehiculoID">
            <Form.Label>Seleccione un Vehículo</Form.Label>
            <Select
              name="VehiculoID"
              options={vehiculos.map(vehiculo => ({
                value: vehiculo.VehiculoID,
                label: `${vehiculo.Modelo} - ${vehiculo.Marca} - ${vehiculo.Anio}`
              }))}
              value={vehiculos.find(veh => veh.VehiculoID === params.VehiculoID) ? {
                value: params.VehiculoID,
                label: `${vehiculos.find(veh => veh.VehiculoID === params.VehiculoID).Modelo} - ${vehiculos.find(veh => veh.VehiculoID === params.VehiculoID).Marca} - ${vehiculos.find(veh => veh.VehiculoID === params.VehiculoID).Anio}`
              } : null}
              onChange={(option) => handleParamChange('VehiculoID', option ? option.value : '')}
              placeholder="Seleccione un vehículo..."
            />
          </Form.Group>
        )}

        {tipoReporte === 'byFechas' && (
          <>
            <Form.Group controlId="formFechaInicial">
              <Form.Label>Fecha Inicial</Form.Label>
              <Form.Control type="date" name="FechaInicial" value={params.FechaInicial} onChange={(e) => handleParamChange('FechaInicial', e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formFechaFinal">
              <Form.Label>Fecha Final</Form.Label>
              <Form.Control type="date" name="FechaFinal" value={params.FechaFinal} onChange={(e) => handleParamChange('FechaFinal', e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formClienteId">
              <Form.Label>ID de Cliente (opcional)</Form.Label>
              <Form.Control type="number" name="ClienteId" value={params.ClienteId} onChange={(e) => handleParamChange('ClienteId', e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formVehiculoID">
              <Form.Label>ID de Vehículo (opcional)</Form.Label>
              <Form.Control type="number" name="VehiculoID" value={params.VehiculoID} onChange={(e) => handleParamChange('VehiculoID', e.target.value)} />
            </Form.Group>
          </>
        )}

        <Button variant="primary" type="submit">
          Generar Reporte
        </Button>
      </Form>

      {/* Mostrar errores */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Mostrar resultados */}
      <h2>Resultados</h2>
      {reportes.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Empleado</th>
              <th>Cliente</th>
              <th>Vehículo</th>
              <th>Estado</th>
              <th>Fecha Cotización</th>
              <th>Fecha Seguimiento</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((reporte, index) => (
              <tr key={index}>
                <td>{reporte.CotizacionID || reporte.cotizacionId}</td>
                <td>{reporte.NombreEmpleado || reporte.nombreEmpleado}</td>
                <td>{reporte.NombreCliente || reporte.nombreCliente}</td>
                <td>{reporte.VehiculoDescripcion || reporte.vehiculoDescripcion}</td>
                <td>{reporte.EstadoCotizacion || reporte.estadoCotizacion}</td>
                <td>{reporte.FechaCotizacion || reporte.fechaCotizacion}</td>
                <td>{reporte.FechaSeguimiento || reporte.fechaSeguimiento}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No se encontraron resultados</p>
      )}
    </Container>
  );
}

export default Reportes;
