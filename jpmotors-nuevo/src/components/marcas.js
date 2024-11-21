import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import AutoImage from "./AutoImageLogo"; // Asegúrate de importar el componente AutoImage

function ListaMarcas() {
  const [marcas, setMarcas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [marcaActual, setMarcaActual] = useState({
    NombreMarca: "",
    Logo: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchMarcas();
  }, []);

  const fetchMarcas = async () => {
    try {
      const response = await axios.get("https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/marcas/");
      setMarcas(response.data);
    } catch (error) {
      console.error("Error al obtener marcas:", error);
    }
  };

  const handleShowModal = (marca = { NombreMarca: "", Logo: null }) => {
    setMarcaActual(marca);
    setIsEditMode(!!marca.MarcaID);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMarcaActual({ NombreMarca: "", Logo: null });
  };

  const handleDelete = async (id) => {
    console.log("ID a eliminar:", id); // Log para depuración
    if (window.confirm("¿Estás seguro de que deseas eliminar esta marca?")) {
        try {
            await axios.delete(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/marcas/${id}`);
            fetchMarcas(); // Llama a la función para actualizar la lista
        } catch (error) {
            console.error("Error al eliminar la marca:", error);
        }
    }
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", marcaActual.Logo);
    formData.append("NombreMarca", marcaActual.NombreMarca);

    try {
      if (isEditMode) {
        await axios.put(`https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/marcas/${marcaActual.MarcaID}/logo`, formData); // Actualiza la marca


      } else {
        await axios.post("https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/marcas/", formData);
      }
      fetchMarcas();
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar la marca:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Lista de Marcas</h1>
      <Button variant="primary" onClick={() => handleShowModal()}>
        Agregar Marca
      </Button>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Logo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map((marca) => (
            <tr key={marca.MarcaID}>
              <td>{marca.NombreMarca}</td>
              <td>
                <AutoImage
                  longBlobData={marca.Logo}
                  alt={`Logo de ${marca.NombreMarca}`}
                  style={{ width: "25%", height: "auto" }} // Cambia el tamaño aquí
                />
              </td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleShowModal(marca)}
                >
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(marca.MarcaID)}>Eliminar</Button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar/editar marcas */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Editar Marca" : "Agregar Marca"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombreMarca">
              <Form.Label>Nombre de la Marca</Form.Label>
              <Form.Control
                type="text"
                value={marcaActual.NombreMarca}
                onChange={(e) =>
                  setMarcaActual({
                    ...marcaActual,
                    NombreMarca: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formLogo">
              <Form.Label>Logo (opcional)</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setMarcaActual({ ...marcaActual, Logo: e.target.files[0] })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ListaMarcas;
