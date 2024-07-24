import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AutoModal from "./AutoModalCotizar";
import ProdItem from "./ProductoItem";
import "bootstrap/dist/css/bootstrap.min.css";

const ClienteEmpleadoProductoList = () => {
  const [autos, setAutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [selectedAuto, setSelectedAuto] = useState(null);
  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedEmpleado, setSelectedEmpleado] = useState("");

  // Función para cargar los datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientesResponse = await axios.get(
          "https://jpmotorsgt.azurewebsites.net/clientes"
        );
        const empleadosResponse = await axios.get(
          "https://jpmotorsgt.azurewebsites.net/empleados"
        );
        setClientes(clientesResponse.data);
        setEmpleados(empleadosResponse.data);
        fetchAutos(); // Llama a fetchAutos si es necesario
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []); // No es necesario incluir fetchAutos aquí

  // Define fetchAutos con useCallback para que sea estable
  const fetchAutos = useCallback(async () => {
    try {
      const params = { cliente: selectedCliente, empleado: selectedEmpleado };
      const response = await axios.get("https://jpmotorsgt.azurewebsites.net/vehiculos", {
        params,
      });
      setAutos(response.data);
    } catch (error) {
      console.error("Error en la consulta a la API:", error);
    }
  }, [selectedCliente, selectedEmpleado]); // Dependencias de fetchAutos

  // Usa useEffect con fetchAutos en el array de dependencias
  useEffect(() => {
    fetchAutos();
  }, [fetchAutos]); // Incluye fetchAutos aquí

  const handleItemClick = (auto) => {
    setSelectedAuto(auto);
  };

  const handleGenerateQuote = (auto) => {
    setSelectedAuto(auto);
  };

  const handleClienteChange = (event) => {
    setSelectedCliente(event.target.value);
  };

  const handleEmpleadoChange = (event) => {
    setSelectedEmpleado(event.target.value);
  };

  return (
    <div className="container-xl">
      <h1 className="my-4">Lista de Autos</h1>
      <div className="row my-4">
        <div className="col-md-6">
          <h2>Clientes</h2>
          <select
            className="form-select"
            value={selectedCliente}
            onChange={handleClienteChange}
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.ClienteID} value={cliente.ClienteID}>
                {cliente.Nombre} {cliente.Apellido}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <h2>Empleados</h2>
          <select
            className="form-select"
            value={selectedEmpleado}
            onChange={handleEmpleadoChange}
          >
            <option value="">Seleccione un empleado</option>
            {empleados.map((empleado) => (
              <option key={empleado.EmpleadoID} value={empleado.EmpleadoID}>
                {empleado.Nombre} {empleado.Apellido}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {autos.map((auto) => (
          <ProdItem
            key={auto.VehiculoID}
            auto={auto}
            onClick={handleItemClick}
            onCotizacionClick={handleGenerateQuote}
          />
        ))}
      </div>
      {selectedAuto && (
        <AutoModal
          auto={selectedAuto}
          cliente={clientes.find(
            (cliente) => cliente.ClienteID === parseInt(selectedCliente)
          )}
          empleado={empleados.find(
            (empleado) => empleado.EmpleadoID === parseInt(selectedEmpleado)
          )}
          onClose={() => setSelectedAuto(null)}
        />
      )}
    </div>
  );
};

export default ClienteEmpleadoProductoList;
