import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Pagination, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import Select from "react-select";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MisReportes = () => {
  const [empleado, setEmpleado] = useState({ nombre: "", apellido: "", id: "", rol: "" });
  const [reportes, setReportes] = useState([]);
  const [fechaInicial, setFechaInicial] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDataEmpleado();
    fetchClientes();
    fetchVehiculos();
  }, []);

  const fetchDataEmpleado = () => {
    try {
      const nombre = localStorage.getItem("nombre") || "Desconocido";
      const apellido = localStorage.getItem("apellido") || "Desconocido";
      const id = localStorage.getItem("userId") || "N/A";
      const roles = JSON.parse(localStorage.getItem("roles")) || [];
      const rol = roles.includes("Admin") ? "Admin" : "User";
      setEmpleado({ nombre, apellido, id, rol });
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get("http://localhost:4000/clientes");
      setClientes(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setError("Error al cargar los clientes.");
    }
  };

  const fetchVehiculos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/vehiculos");
      setVehiculos(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setError("Error al cargar los vehículos.");
    }
  };

  const fetchReportes = async () => {
    setIsLoading(true);
    try {
      const filtros = {
        FechaInicial: fechaInicial ? moment(fechaInicial).format("YYYY-MM-DD") : null,
        FechaFinal: fechaFinal ? moment(fechaFinal).format("YYYY-MM-DD") : null,
        ClienteId: clienteSeleccionado ? clienteSeleccionado.value : null,
        VehiculoId: vehiculoSeleccionado ? vehiculoSeleccionado.value : null,
      };

      let response;

      // Si no hay fechas ni filtros aplicados, buscar todos los reportes por EmpleadoID
      if (!fechaInicial && !fechaFinal && !clienteSeleccionado && !vehiculoSeleccionado) {
        response = await axios.get(`http://localhost:4000/cotizaciones/byEmpleadoID/${empleado.id}`);
      } else {
        // Si hay fechas o filtros, utilizar el endpoint de búsqueda por filtros
        response = await axios.post("http://localhost:4000/cotizaciones/byFechas", filtros);
      }

      // Normalizar los datos para asegurar que todas las propiedades existan
      const reportesNormalizados = response.data.map(reporte => ({
        CotizacionID: reporte.CotizacionID,
        NombreCliente: reporte.NombreCliente || "N/A",
        VehiculoDescripcion: reporte.VehiculoDescripcion || "N/A",
        EstadoCotizacion: reporte.EstadoCotizacion || "N/A",
        FechaCotizacion: reporte.FechaCotizacion || "N/A",
        FechaSeguimiento: reporte.FechaSeguimiento || "N/A",
      }));

      // Establecer los reportes y limpiar mensajes de error
      setReportes(reportesNormalizados);
      setSuccessMessage("Reportes generados correctamente.");
      setError(null);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setError("Error al generar el reporte.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchReportes();
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastReport = currentPage * itemsPerPage;
  const indexOfFirstReport = indexOfLastReport - itemsPerPage;
  const currentReports = reportes.slice(indexOfFirstReport, indexOfLastReport);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reportes.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const exportToCSV = () => {
    const csvRows = [];
    const headers = ["ID", "Cliente", "Vehículo", "Estado", "Fecha Cotización", "Fecha Seguimiento"];
    csvRows.push(headers.join(","));

    reportes.forEach((reporte) => {
      const row = [
        reporte.CotizacionID,
        reporte.NombreCliente,
        reporte.VehiculoDescripcion,
        reporte.EstadoCotizacion,
        reporte.FechaCotizacion,
        reporte.FechaSeguimiento,
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reportes.csv");
    document.body.appendChild(link);
    link.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Cotizaciones", 14, 20);
    doc.autoTable({
      head: [["ID", "Cliente", "Vehículo", "Estado", "Fecha Cotización", "Fecha Seguimiento"]],
      body: reportes.map((reporte) => [
        reporte.CotizacionID,
        reporte.NombreCliente,
        reporte.VehiculoDescripcion,
        reporte.EstadoCotizacion,
        reporte.FechaCotizacion,
        reporte.FechaSeguimiento,
      ]),
    });
    doc.save("reportes.pdf");
  };

  const clienteOptions = [{ value: null, label: "Todos" }, ...clientes.map(cliente => ({
    value: cliente.ClienteID,
    label: cliente.Nombre
  }))];

  const vehiculoOptions = [{ value: null, label: "Todos" }, ...vehiculos.map(vehiculo => ({
    value: vehiculo.VehiculoID,
    label: `${vehiculo.Marca} - ${vehiculo.Modelo} (${vehiculo.Anio})`
  }))];

  return (
    <Container>
      <h1>Cotizaciones de {empleado.nombre} {empleado.apellido}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFechaInicial">
          <Form.Label>Seleccione la fecha inicial</Form.Label>
          <DatePicker
            selected={fechaInicial}
            onChange={(date) => setFechaInicial(date)}
            dateFormat="yyyy/MM/dd"
            className="form-control"
            placeholderText="Fecha Inicial"
          />
        </Form.Group>

        <Form.Group controlId="formFechaFinal">
          <Form.Label>Seleccione la fecha final</Form.Label>
          <DatePicker
            selected={fechaFinal}
            onChange={(date) => setFechaFinal(date)}
            dateFormat="yyyy/MM/dd"
            className="form-control"
            placeholderText="Fecha Final"
          />
        </Form.Group>

        <Form.Group controlId="formCliente">
          <Form.Label>Seleccione un Cliente</Form.Label>
          <Select
            options={clienteOptions}
            onChange={(option) => setClienteSeleccionado(option)}
            placeholder="Seleccione un cliente..."
          />
        </Form.Group>

        <Form.Group controlId="formVehiculo">
          <Form.Label>Seleccione un Vehículo</Form.Label>
          <Select
            options={vehiculoOptions}
            onChange={(option) => setVehiculoSeleccionado(option)}
            placeholder="Seleccione un vehículo..."
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Generar Reporte
        </Button>
      </Form>

      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      {reportes.length > 0 && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Vehículo</th>
                <th>Estado</th>
                <th>Fecha Cotización</th>
                <th>Fecha Seguimiento</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((reporte) => (
                <tr key={reporte.CotizacionID}>
                  <td>{reporte.CotizacionID}</td>
                  <td>{reporte.NombreCliente}</td>
                  <td>{reporte.VehiculoDescripcion}</td>
                  <td>{reporte.EstadoCotizacion}</td>
                  <td>{reporte.FechaCotizacion}</td>
                  <td>{reporte.FechaSeguimiento}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            {pageNumbers.map(number => (
              <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                {number}
              </Pagination.Item>
            ))}
          </Pagination>

          <Button variant="success" onClick={exportToCSV}>Exportar CSV</Button>
          <Button variant="danger" onClick={exportToPDF}>Exportar PDF</Button>
        </>
      )}
    </Container>
  );
};

export default MisReportes;
