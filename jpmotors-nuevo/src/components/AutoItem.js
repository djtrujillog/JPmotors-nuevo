import React from 'react';

const AutoItem = ({ auto, onClick }) => {
  const marca = auto?.Marca || 'N/A';
  const modelo = auto?.Modelo || 'N/A';

  // Ahora utilizamos directamente la propiedad ImagenBase64
  const imagenBase64 = auto?.ImagenBase64;

  return (
    <div className="col-md-4 mb-4">
      <div className="card" onClick={() => onClick(auto)}>
        {imagenBase64 && (
          <img
            src={imagenBase64}
            alt={modelo}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{marca}</h5>
          <p className="card-text">Modelo: {modelo}</p>
        </div>
      </div>
    </div>
  );
};

export default AutoItem;
