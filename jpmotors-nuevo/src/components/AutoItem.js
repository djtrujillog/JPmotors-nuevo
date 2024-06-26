import React from 'react';
import AutoImage from './AutoImage';


const AutoItem = ({ auto, onClick }) => {
  // Verifica si auto tiene las propiedades requeridas
  const imagen = auto?.Imagen || 'defaultImage.jpg'; // Usa una imagen predeterminada si no hay imagen
  const marca = auto?.Marca || 'N/A';
  const modelo = auto?.Modelo || 'N/A';
  const vehiculoID = auto?.VehiculoID; // Se necesita para la lógica del clic
  const longBlobData = auto?.Imagen.data;
  
  return (
    <div className="col-md-4 mb-4">
      <div className="card" onClick={() => onClick(auto)}>
        <AutoImage
         longBlobData={longBlobData}
         alt = {auto.Modelo}
        />

        <div className="card-body">
          <h5 className="card-title">{marca}</h5>
          <p className="card-text">Modeo: {modelo}</p>
        </div>
      </div>
    </div>
  );
};

export default AutoItem;
