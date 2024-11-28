import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const limit = 10; // Número de imágenes por página
  const apiUrl = "http://localhost:4000/image/all"; // Endpoint para obtener imágenes
  const deleteUrl = "http://localhost:4000/image/imagesg"; // Endpoint para eliminar imágenes
  const uploadUrl = "http://localhost:4000/image/uploadg"; // Endpoint para subir imágenes

  // Obtener imágenes desde la API
  const fetchImages = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl, {
        params: {
          page,
          limit,
        },
      });
      setImages(response.data.images);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error al cargar las imágenes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Manejar el cambio de página
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchImages(page);
    }
  };

  // Subir una imagen
  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Por favor selecciona un archivo");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("imagen", selectedFile);

    try {
      await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Imagen subida con éxito");
      fetchImages(currentPage); // Actualizar las imágenes
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Error al subir la imagen");
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  // Eliminar una imagen
  const handleDeleteImage = async (imageName) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta imagen?")) return;

    try {
      await axios.delete(`${deleteUrl}/${imageName}`);
      alert("Imagen eliminada con éxito");
      fetchImages(currentPage); // Actualizar las imágenes
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      alert("Error al eliminar la imagen");
    }
  };

  // Cargar imágenes al montar el componente
  useEffect(() => {
    fetchImages(currentPage);
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Galería de imágenes del carrusel JPMotors GT</h1>

      {/* Formulario para subir imágenes */}
      <form onSubmit={handleUploadImage} className="mb-4">
        <div className="input-group">
          <input
            type="file"
            className="form-control"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={uploading}
          >
            {uploading ? "Subiendo..." : "Subir Imagen"}
          </button>
        </div>
      </form>

      {/* Spinner de carga */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Galería de imágenes */}
          <div className="row">
            {images.map((image) => (
              <div className="col-md-3 mb-4" key={image.name}>
                <div className="card">
                  <img
                    src={image.url}
                    className="card-img-top"
                    alt={image.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <p className="card-text text-center">{image.name}</p>
                    <button
                      className="btn btn-danger btn-sm w-100"
                      onClick={() => handleDeleteImage(image.name)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          <nav>
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Anterior
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default ImageGallery;
