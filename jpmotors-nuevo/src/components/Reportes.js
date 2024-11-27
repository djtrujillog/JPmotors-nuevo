import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';
import jsPDF from 'jspdf'; // Para exportar a PDF
import 'jspdf-autotable'; // Para tablas en PDF
import { CSVLink } from 'react-csv'; // Para exportar a CSV

function Reportes() {
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

  // Cargar empleados y vehículos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empleadosRes, vehiculosRes] = await Promise.all([
          axios.get('https://cotizaciones-jpmotors.onrender.com/empleados'),
          axios.get('https://cotizaciones-jpmotors.onrender.com/vehiculos/pornombre')
        ]);
        setEmpleados(empleadosRes.data);
        setVehiculos(vehiculosRes.data);
      } catch (error) {
        setError('Error al cargar los empleados o vehículos. Intente nuevamente.');
      }
    };
    fetchData();
  }, []);

//  estado para almacenar clientes
const [clientes, setClientes] = useState([]);

// Cargar clientes al montar el componente
useEffect(() => {
  const fetchClientes = async () => {
    try {
      const response = await axios.get('https://cotizaciones-jpmotors.onrender.com/clientes');
      setClientes(response.data);
    } catch (error) {
      setError('Error al cargar los clientes. Intente nuevamente.');
    }
  };
  fetchClientes();
}, []);


  // Manejar cambios en los parámetros del formulario
  const handleParamChange = (name, value) => {
    setParams({
      ...params,
      [name]: value
    });
  };

  // Construir el filtro solo con parámetros no vacíos
  const buildFilter = () => {
    const filter = {};
    if (params.EmpleadoID) filter.EmpleadoId = params.EmpleadoID;
    if (params.VehiculoID) filter.VehiculoId = params.VehiculoID;
    if (params.ClienteId) filter.ClienteId = params.ClienteId;
    if (params.FechaInicial) filter.FechaInicial = params.FechaInicial;
    if (params.FechaFinal) filter.FechaFinal = params.FechaFinal;
    return filter;
  };
  

  // Realizar la consulta de reportes
  const fetchReportes = async () => {
    try {
      const filtros = buildFilter();
      if (Object.keys(filtros).length === 0) {
        setError('Debe ingresar al menos un parámetro.');
        return;
      }
      const response = await axios.post('https://cotizaciones-jpmotors.onrender.com/cotizaciones/byParameters', filtros);
      if (response.data.length === 0) {
        setError('No se encontraron registros para los parámetros enviados.');
      } else {
        setReportes(response.data);
        setError(null);
      }
    } catch (error) {
      setError('Error al generar el reporte. Verifica los parámetros e inténtalo nuevamente.');
    }
  };

  // Manejar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchReportes();
  };

  // Exportar a PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['ID', 'Empleado', 'Cliente', 'Vehículo', 'Estado', 'Fecha Cotización', 'Fecha Seguimiento'];
    const tableRows = [];

    reportes.forEach(reporte => {
      const reporteData = [
        reporte.CotizacionID || reporte.cotizacionId,
        reporte.NombreEmpleado || reporte.nombreEmpleado,
        reporte.NombreCliente || reporte.nombreCliente,
        reporte.VehiculoDescripcion || reporte.vehiculoDescripcion,
        reporte.EstadoCotizacion || reporte.estadoCotizacion,
        reporte.FechaCotizacion || reporte.fechaCotizacion,
        reporte.FechaSeguimiento || reporte.fechaSeguimiento
      ];
      tableRows.push(reporteData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text('Reporte de Cotizaciones', 14, 15);
    doc.save('reportes.pdf');
  };

  return (
    <Container>
      <h1>Generar Reportes</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFechaInicial">
          <Form.Label>Fecha Inicial</Form.Label>
          <Form.Control
            type="date"
            name="FechaInicial"
            value={params.FechaInicial}
            onChange={(e) => handleParamChange('FechaInicial', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFechaFinal">
          <Form.Label>Fecha Final</Form.Label>
          <Form.Control
            type="date"
            name="FechaFinal"
            value={params.FechaFinal}
            onChange={(e) => handleParamChange('FechaFinal', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formClienteID">
  <Form.Label>Seleccione un Cliente</Form.Label>
  <Select
    name="ClienteId"
    options={clientes.map(cliente => ({
      value: cliente.ClienteID,
      label: `${cliente.Nombre} ${cliente.Apellido}`
    }))}
    value={clientes.find(cli => cli.ClienteID === params.ClienteId) ? {
      value: params.ClienteId,
      label: `${clientes.find(cli => cli.ClienteID === params.ClienteId).Nombre} ${clientes.find(cli => cli.ClienteID === params.ClienteId).Apellido}`
    } : null}
    onChange={(option) => handleParamChange('ClienteId', option ? option.value : '')}
    placeholder="Seleccione un cliente..."
    isClearable // Permite limpiar la selección
  />
</Form.Group>


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
  isClearable // Esto permite deseleccionar
/>

</Form.Group>


        <Button variant="primary" type="submit">
          Generar Reporte
        </Button>

        {/* Botones para exportar */}
        {reportes.length > 0 && (
          <>
            <Button variant="secondary" onClick={exportPDF} style={{ marginLeft: '10px' }}>
              Exportar a PDF
            </Button>
            <CSVLink
              data={reportes}
              filename="reportes.csv"
              className="btn btn-secondary"
              style={{ marginLeft: '10px' }}
            >
              Exportar a CSV
            </CSVLink>
          </>
        )}
      </Form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

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
