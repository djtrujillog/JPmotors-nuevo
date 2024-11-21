import React from 'react';

const AutoItem = ({ auto, onClick }) => {
  const marca = auto?.Marca || 'N/A';
  const modelo = auto?.Modelo || 'N/A';

  // Validar Base64 correctamente
  const imagenBase64 = auto?.ImagenBase64?.startsWith('data:image') ? auto.ImagenBase64 : null;
  const imagenUrl = auto?.ImagenUrl || null;

  return (
    <div className="col-md-4 mb-4">
      <div className="card" onClick={() => onClick(auto)}>
        {imagenBase64 ? (
          <img
            src={imagenBase64}
            alt={modelo}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        ) : imagenUrl ? (
          <img
            src={imagenUrl}
            alt={modelo}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        ) : (
          <div
            style={{
              width: 'auto',
              height: 'auto',
              backgroundColor: '#ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span>Sin imagen</span>
          </div>
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
