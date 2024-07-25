import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AutoModal from "./AutoModalCotizar";
import ProdItem from "./ProductoItem";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";

const ClienteEmpleadoProductoList = () => {
  const [autos, setAutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [selectedAuto, setSelectedAuto] = useState(null);
  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedEmpleado, setSelectedEmpleado] = useState("");
  const [selectedMarca, setSelectedMarca] = useState("");
  const [selectedModelo, setSelectedModelo] = useState("");

  // Estado para el modal de agregar cliente
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [newClientForm, setNewClientForm] = useState({
    Nombre: '',
    Apellido: '',
    Direccion: '',
    Telefono: '',
    CorreoElectronico: '',
    Estado: '',
    Documento: '',
    Nit: ''
  });

  // Función para cargar los datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientesResponse = await axios.get(
          "http://localhost:4000/clientes"
        );
        const empleadosResponse = await axios.get(
          "http://localhost:4000/empleados"
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
      const params = {
        cliente: selectedCliente,
        empleado: selectedEmpleado,
      };
      const response = await axios.get("http://localhost:4000/vehiculos", {
        params,
      });
      setAutos(response.data);

      // Extraer marcas únicas
      const uniqueMarcas = [...new Set(response.data.map(auto => auto.Marca))];
      setMarcas(uniqueMarcas);

      // Si no hay marca seleccionada, extraer todos los modelos únicos
      if (!selectedMarca) {
        const uniqueModelos = [...new Set(response.data.map(auto => auto.Modelo))];
        setModelos(uniqueModelos);
      } else {
        // Si hay una marca seleccionada, extraer modelos de esa marca
        const filteredModelos = [...new Set(response.data
          .filter(auto => auto.Marca === selectedMarca)
          .map(auto => auto.Modelo))];
        setModelos(filteredModelos);
      }

    } catch (error) {
      console.error("Error en la consulta a la API:", error);
    }
  }, [selectedCliente, selectedEmpleado, selectedMarca]); // Dependencias de fetchAutos

  // Usa useEffect con fetchAutos en el array de dependencias
  useEffect(() => {
    fetchAutos();
  }, [fetchAutos]); // Incluye fetchAutos aquí

  // Filtrado de autos por marca y modelo
  const filteredAutos = autos.filter(auto => {
    return (
      (selectedMarca === '' || auto.Marca === selectedMarca) &&
      (selectedModelo === '' || auto.Modelo === selectedModelo)
    );
  });

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

  const handleMarcaChange = (event) => {
    setSelectedMarca(event.target.value);
    setSelectedModelo(""); // Resetear modelo seleccionado al cambiar la marca
  };

  const handleModeloChange = (event) => {
    setSelectedModelo(event.target.value);
  };

  const handleNewClientFormChange = (e) => {
    const { name, value } = e.target;
    setNewClientForm({
      ...newClientForm,
      [name]: value
    });
  };

  const handleAddClient = async () => {
    try {
      await axios.post('http://localhost:4000/clientes', newClientForm);
      // Actualiza la lista de clientes después de agregar uno nuevo
      const response = await axios.get("http://localhost:4000/clientes");
      setClientes(response.data);
      // Resetea el formulario y cierra el modal
      setNewClientForm({
        Nombre: '',
        Apellido: '',
        Direccion: '',
        Telefono: '',
        CorreoElectronico: '',
        Estado: '',
        Documento: '',
        Nit: ''
      });
      setShowAddClientModal(false);
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  };

  return (
    <div className="container-xl">
      <h1 className="my-4">Lista de Autos</h1>
      <div className="row my-4">
        <div className="col-md-6">
          <Button variant="primary" onClick={() => setShowAddClientModal(true)}>
            Agregar Cliente
          </Button>
        </div>
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
      </div>
      <div className="row my-4">
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
      <div className="row my-4">
        <div className="col-md-6">
          <h2>Marca</h2>
          <select
            className="form-select"
            value={selectedMarca}
            onChange={handleMarcaChange}
          >
            <option value="">Filtrar por Marca</option>
            {marcas.map(marca => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <h2>Modelo</h2>
          <select
            className="form-select"
            value={selectedModelo}
            onChange={handleModeloChange}
            disabled={!selectedMarca} // Deshabilitar si no hay marca seleccionada
          >
            <option value="">Filtrar por Modelo</option>
            {modelos.map(modelo => (
              <option key={modelo} value={modelo}>{modelo}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {filteredAutos.map((auto) => (
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

      {/* Modal para agregar cliente */}
      <Modal show={showAddClientModal} onHide={() => setShowAddClientModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formClienteNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                name="Nombre"
                value={newClientForm.Nombre}
                onChange={handleNewClientFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formClienteApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el apellido"
                name="Apellido"
                value={newClientForm.Apellido}
                onChange={handleNewClientFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formClienteDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la dirección"
                name="Direccion"
                value={newClientForm.Direccion}
                onChange={handleNewClientFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formClienteTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el teléfono"
                name="Telefono"
                value={newClientForm.Telefono}
                onChange={handleNewClientFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formClienteCorreoElectronico">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese el correo electrónico"
                name="CorreoElectronico"
                value={newClientForm.CorreoElectronico}
                onChange={handleNewClientFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formClienteEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el estado"
                name="Estado"
                value={newClientForm.Estado}
                onChange={handleNewClientFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formClienteDocumento">
              <Form.Label>Documento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el documento"
                name="Documento"
                value={newClientForm.Documento}
                onChange={handleNewClientFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formClienteNit">
              <Form.Label>NIT</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el NIT"
                name="Nit"
                value={newClientForm.Nit}
                onChange={handleNewClientFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddClientModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddClient}>
            Agregar Cliente
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClienteEmpleadoProductoList;
