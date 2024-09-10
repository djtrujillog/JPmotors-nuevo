import React from 'react';
import AutoImage from './AutoImage';

const AutoItem = ({ auto, onClick }) => {
  // Verifica si auto tiene las propiedades requeridas
  // const imagen = auto?.Imagen || 'defaultImage.jpg'; // Usa una imagen predeterminada si no hay imagen
  const marca = auto?.Marca || 'N/A';
  const modelo = auto?.Modelo || 'N/A';
  
  // El VehiculoID podría ser necesario para otras lógicas
  // const vehiculoID = auto?.VehiculoID; // Se necesita para la lógica del clic

  // Mantener la lógica de la imagen en formato blob
  const longBlobData = auto?.Imagen?.data;
  
  return (
    <div className="col-md-4 mb-4">
      <div className="card" onClick={() => onClick(auto)}>
        <AutoImage
         longBlobData={longBlobData}
         alt={auto.Modelo}
        />

        <div className="card-body">
          <h5 className="card-title">{marca}</h5>
          <p className="card-text">Modelo: {modelo}</p>
        </div>
      </div>
    </div>
  );
};

export default AutoItem;
