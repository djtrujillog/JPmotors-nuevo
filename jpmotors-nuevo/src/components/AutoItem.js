import React from 'react';

const AutoItem = ({ auto, onClick }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card" onClick={onClick}>
                <img 
                    src={`/images/${auto.Imagen}`} 
                    className="card-img-top" 
                    alt={`${auto.Marca} ${auto.Modelo}`}
                />
                <div className="card-body">
                    <h5 className="card-title">{auto.Marca} {auto.Modelo}</h5>
                    <p className="card-text">Código: {auto.VehiculoID}</p>
                </div>
            </div>
        </div>
    );
};

export default AutoItem;
