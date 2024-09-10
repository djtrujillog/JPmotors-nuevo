import React from 'react';


const AutoItem = ({ auto, onClick }) => {
  // Verifica si auto tiene las propiedades requeridas
  const imagen = auto?.Imagen || 'defaultImage.jpg'; // Usa una imagen predeterminada si no hay imagen
  const marca = auto?.Marca || 'N/A';
  const modelo = auto?.Modelo || 'N/A';
  // const vehiculoID = auto?.VehiculoID; // Se necesita para la lógica del clic

  return (
    <div className="col-md-4 mb-4">
      <div className="card" onClick={() => onClick(auto)}>
      <img src='./imagenes/Imagen7.png' className="card-img-top" alt="asdasdf" />
        <img ssrc={`${process.env.PUBLIC_URL}/imagenes/${imagen}`} className="card-img-top" alt={`${marca} ${modelo}`} />

        <div className="card-body">
          <h5 className="card-title">{marca}</h5>
          <p className="card-text">Modeo: {modelo}</p>
        </div>
      </div>
    </div>
  );
};

export default AutoItem;
