// src/components/AgregarVehiculo.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Container, Form, Button, ListGroup, Modal } from "react-bootstrap";
import DetallesVehiculoModal from "./DetallesVehiculoModal";
import DetallesVehiculoExteriorModal from "./ExteriorVehiculoModal";
import DetallesVehiculoInteriorModal from "./InteriorVehiculoModal";
import DetallesVehiculoMotorModal from "./MotorVehiculoModal";
import DetallesVehiculoSeguridadModal from "./SeguridadVehiculoModal";
import DetallesVehiculoGarantia from "./GarantiaVehiculoModal";

const AgregarVehiculo = () => {
  const { register, handleSubmit, reset } = useForm();
  const [vehiculos, setVehiculos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVehiculo, setEditingVehiculo] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailingVehiculo, setDetailingVehiculo] = useState(null);
  const [showExteriorsModal, setShowExteriorsModal] = useState(false);
  const [detailingExteriorVehiculo, setDetailingExteriorVehiculo] = useState(null);
  const [showInteriorsModal, setShowInteriorModal] = useState(false);
  const [detailingInteriorVehiculo, setDetailingInteriorVehiculo] = useState(null);
  const [showMotorModal, setShowMotorModal] = useState(false);
  const [detailingMotorVehiculo, setDetailingMotorVehiculo] = useState(null);
  const [showSeguridadModal, setShowSeguridadModal] = useState(false);
  const [detailingSeguridadVehiculo, setDetailingSeguridadVehiculo] = useState(null);
  const [showGarantiaModal, setShowGarantiadModal] = useState(false);
  const [detailingGarantiaVehiculo, setDetailingGarantiaVehiculo] = useState(false);
  const [marcas, setMarcas] = useState([]);


  const fetchVehiculos = async () => {
    try {
      // Cambiar la URL de la solicitud para hacer la consulta más ligera
      const response = await axios.get("https://cotizaciones-jpmotors.onrender.com/vehiculos/usados");
      setVehiculos(response.data || []); // Asegurarse de que siempre es un array
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
    }
  };

  const fetchMarcas = async () => {
    try {
      const response = await axios.get("https://cotizaciones-jpmotors.onrender.com/marcas");
      setMarcas(response.data || []); // Asegura que se asigna un array
    } catch (error) {
      console.error("Error al obtener marcas:", error);
    }
  };


  useEffect(() => {
    fetchVehiculos();
  }, []);

  useEffect(() => {
    fetchMarcas();
  }, []);


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const openEditModal = (vehiculo) => {
    setEditingVehiculo(vehiculo);
    setShowEditModal(true);
    reset();
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingVehiculo(null);
    reset();
    fetchVehiculos(); // Refrescar lista de vehículos
  };

  const openAddModal = () => {
    setShowAddModal(true);
    reset();
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    reset();
    fetchVehiculos(); // Refrescar lista de vehículos
  };

  const openDetailsModal = (vehiculo) => {
    setDetailingVehiculo(vehiculo);
    setShowDetailsModal(true);
    reset();
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setDetailingVehiculo(null);
    reset();
  };

  const openExteriorModal = (vehiculo) => {
    setDetailingExteriorVehiculo(vehiculo);
    setShowExteriorsModal(true);
    reset();
  };

  const closeExteriorModal = () => {
    setShowExteriorsModal(false);
    setDetailingExteriorVehiculo(null);
    reset();
  };

  const openInteriorModal = (vehiculo) => {
    setDetailingInteriorVehiculo(vehiculo);
    setShowInteriorModal(true);
    reset();
  };

  const closeInteriorModal = () => {
    setShowInteriorModal(false);
    setDetailingInteriorVehiculo(null);
    reset();
  };

  const openMotorModal = (vehiculo) => {
    setDetailingMotorVehiculo(vehiculo);
    setShowMotorModal(true);
    reset();
  };

  const closeMotorModal = () => {
    setShowMotorModal(false);
    setDetailingMotorVehiculo(null);
    reset();
  };

  const openSeguridadModal = (vehiculo) => {
    setDetailingSeguridadVehiculo(vehiculo);
    setShowSeguridadModal(true);
    reset();
  };

  const closeSeguridadModal = () => {
    setShowSeguridadModal(false);
    setDetailingSeguridadVehiculo(null);
    reset();
  };

  const openGarantiaModal = (vehiculo) => {
    setDetailingGarantiaVehiculo(vehiculo);
    setShowGarantiadModal(true);
    reset();
  };

  const closeGarantiaModal = () => {
    setShowGarantiadModal(false);
    setDetailingGarantiaVehiculo(null);
    reset();
  };
  const onSubmitAdd = async (data) => {
    console.log("Datos enviados al backend:", data);
  
    if (!selectedFile) {
      console.error("No se ha seleccionado un archivo");
      alert("Por favor, seleccione un archivo antes de enviar.");
      return;
    }
  
    const formData = new FormData();
    formData.append("imagen", selectedFile); // Cambia el nombre a "imagen"
  
    // Adjunta los datos del formulario al FormData
    Object.keys(data).forEach((key) => {
      console.log(`${key}:`, data[key]);
      formData.append(key, data[key]);
    });
  
    try {
      // Realiza la solicitud al backend
      const response = await axios.post(
        "https://cotizaciones-jpmotors.onrender.com/image/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Actualiza el estado de los vehículos y cierra el modal
      setVehiculos((prevVehiculos) => [...prevVehiculos, response.data.vehiculo]);
      closeAddModal();
    } catch (error) {
      console.error("Error al agregar vehículo:", error);
      alert("Hubo un error al agregar el vehículo. Por favor, intente nuevamente.");
    }
  };
  
  


  const onSubmitEdit = async (data) => {
    console.log("Datos enviados al backend:", data); // Asegúrate de que MarcaID esté presente.

    if (!selectedFile) {
        alert("Por favor, selecciona un archivo de imagen.");
        return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });

    try {
        const response = await axios.put(
            `https://cotizaciones-jpmotors.onrender.com/image/create/${editingVehiculo.VehiculoID}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        // Actualizar la lista de vehículos en el estado.
        const updatedVehiculos = vehiculos.map((v) =>
            v.VehiculoID === editingVehiculo.VehiculoID ? response.data : v
        );
        setVehiculos(updatedVehiculos);

        alert("Vehículo actualizado con éxito.");
        closeEditModal();
    } catch (error) {
        console.error("Error al editar vehículo:", error);
        alert("Ocurrió un error al actualizar el vehículo.");
    }
};


const deleteVehiculo = async (VehiculoID) => {
  try {
    await axios.delete(
      `https://cotizaciones-jpmotors.onrender.com/vehiculos/${VehiculoID}`
    );
    setVehiculos(vehiculos.filter((v) => v.VehiculoID !== VehiculoID));
  } catch (error) {
    console.error("Error al eliminar vehículo:", error);
  }
};

return (
  <Container>
    <h2 className="my-4">Agregar, Editar y Eliminar Vehículos</h2>

    <Button variant="primary" className="mb-3" onClick={openAddModal}>
      Agregar Vehículo
    </Button>

    <ListGroup className="mb-4">
      {vehiculos.map((vehiculo) => (
        vehiculo && vehiculo.Modelo && (
          <ListGroup.Item
            key={vehiculo.VehiculoID}
            className="d-flex justify-content-between align-items-center"
          >
            {vehiculo.Modelo} - {vehiculo.Marca}
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => openEditModal(vehiculo)}
              >
                Editar
              </Button>{" "}
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteVehiculo(vehiculo.VehiculoID)}
              >
                Eliminar
              </Button>{" "}
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => openDetailsModal(vehiculo)}
              >
                Dimensiones
              </Button>{" "}
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => openExteriorModal(vehiculo)}
              >
                Exterior
              </Button>{" "}
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => openInteriorModal(vehiculo)}
              >
                Interior
              </Button>{" "}
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => openMotorModal(vehiculo)}
              >
                Motor
              </Button>{" "}
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => openGarantiaModal(vehiculo)}
              >
                Garantia
              </Button>{" "}
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => openSeguridadModal(vehiculo)}
              >
                Seguridad
              </Button>{" "}
            </div>
          </ListGroup.Item>
        )
      ))}
    </ListGroup>

    <Modal show={showEditModal} onHide={closeEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Vehículo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmitEdit)}>
          <Form.Group>
            <Form.Label>Linea:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={editingVehiculo?.Modelo || ''}
              {...register("Modelo", { required: true })}
            />
          </Form.Group>
          <Form.Group>
    <Form.Label>Marca:</Form.Label>
    <Form.Control
        as="select"
        {...register("Marca", { required: true })}
        disabled={marcas.length === 0}
    >
        {marcas.map((marca) => (
            <option key={marca.MarcaID} value={marca.NombreMarca}>
                {marca.NombreMarca}
            </option>
        ))}
    </Form.Control>
</Form.Group>

          <Form.Group>
            <Form.Label>Año:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={editingVehiculo?.Anio}
              {...register("Anio", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio Gerente:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={editingVehiculo?.PrecioGerente}
              {...register("PrecioGerente", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio Web:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={editingVehiculo?.PrecioWeb}
              {...register("PrecioWeb", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio Lista:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={editingVehiculo?.PrecioLista}
              {...register("PrecioLista", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Marca ID:</Form.Label>
            <Form.Control as="select" {...register("MarcaID", { required: true })}>
              {marcas.length > 0 ? (
                marcas.map((marca) => (
                  <option key={marca.MarcaID} value={marca.MarcaID}>
                    {marca.NombreMarca}
                  </option>
                ))
              ) : (
                <option value="">Cargando marcas...</option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Imagen:</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Condición:</Form.Label>
            <Form.Control
              as="select"
              {...register("Condicion", { required: true })}
            >
              <option value="Nuevo">Nuevo</option>
              <option value="Usado">Usado</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Estado:</Form.Label>
            <Form.Control
              as="select"
              {...register("Estado", { required: true })}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Actualizar Vehículo
          </Button>
        </Form>
      </Modal.Body>
    </Modal>

    <Modal show={showAddModal} onHide={closeAddModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Vehículo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmitAdd)}>
          <Form.Group>
            <Form.Label>Linea:</Form.Label>
            <Form.Control
              type="text"
              {...register("Modelo", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Marca:</Form.Label>
            <Form.Control
              as="select"
              defaultValue={editingVehiculo?.Marca || ''}
              {...register("Marca", { required: true })}
            >
              {marcas.map((marca) => (
                <option key={marca.MarcaID} value={marca.NombreMarca}>
                  {marca.NombreMarca}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Año:</Form.Label>
            <Form.Control
              type="text"
              {...register("Anio", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio Gerente:</Form.Label>
            <Form.Control
              type="text"
              {...register("PrecioGerente", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio Web:</Form.Label>
            <Form.Control
              type="text"
              {...register("PrecioWeb", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio Lista:</Form.Label>
            <Form.Control
              type="text"
              {...register("PrecioLista", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Marca ID:</Form.Label>
            <Form.Control as="select" {...register("MarcaID", { required: true })}>
              {marcas.map((marca) => (
                <option key={marca.MarcaID} value={marca.MarcaID}>
                  {marca.NombreMarca}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Imagen:</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Condición:</Form.Label>
            <Form.Control
              as="select"
              {...register("Condicion", { required: true })}
            >
              <option value="Nuevo">Nuevo</option>
              <option value="Usado">Usado</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Estado:</Form.Label>
            <Form.Control
              as="select"
              {...register("Estado", { required: true })}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Agregar Vehículo
          </Button>
        </Form>
      </Modal.Body>
    </Modal>

    <DetallesVehiculoModal
      show={showDetailsModal}
      handleClose={closeDetailsModal}
      vehiculo={detailingVehiculo}
    />

    <DetallesVehiculoExteriorModal
      show={showExteriorsModal}
      handleClose={closeExteriorModal}
      vehiculo={detailingExteriorVehiculo}
    />
    <DetallesVehiculoInteriorModal
      show={showInteriorsModal}
      handleClose={closeInteriorModal}
      vehiculo={detailingInteriorVehiculo}
    />
    <DetallesVehiculoMotorModal
      show={showMotorModal}
      handleClose={closeMotorModal}
      vehiculo={detailingMotorVehiculo}
    />
    <DetallesVehiculoSeguridadModal
      show={showSeguridadModal}
      handleClose={closeSeguridadModal}
      vehiculo={detailingSeguridadVehiculo}
    />
    <DetallesVehiculoGarantia
      show={showGarantiaModal}
      handleClose={closeGarantiaModal}
      vehiculo={detailingGarantiaVehiculo}
    />
  </Container>
);
};

export default AgregarVehiculo;
