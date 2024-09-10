import React from 'react';
import AutoImage from './AutoImage';
import { Button } from 'react-bootstrap';

const ProdItem = ({ auto, onClick, onCotizacionClick }) => {
  const marca = auto?.Marca || 'N/A';
  const modelo = auto?.Modelo || 'N/A';
  const precio = auto?.PrecioGerente || 'N/A';
  const precioweb = auto?.PrecioWeb || 'N/A';
  const preciolista = auto?.PrecioLista || 'N/A';
  const longBlobData = auto?.Imagen?.data; // Use optional chaining

  return (
    <div className="col-md-4 mb-4">
      <div className="card" onClick={() => onClick(auto)}>
        <AutoImage
          longBlobData={longBlobData}
          alt={auto?.Modelo}
        />
        <div className="card-body">
          <h6 className="card-title">{marca}</h6>
          <h4 className="card-text">Modelo: {modelo}</h4>
          <h4 className="card-text">Precios</h4>
          <h5 className="card-text">Gerente: {precio}</h5>
          <h5 className="card-text">Web: {precioweb}</h5>
          <h5 className="card-text">Lista: {preciolista}</h5>
          <Button variant="success" onClick={() => onCotizacionClick(auto)} className="ms-2">Cotizar</Button>
        </div>
      </div>
    </div>
  );
};

export default ProdItem;
