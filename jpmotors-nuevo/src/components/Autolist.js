import React, { useEffect, useState } from 'react';
import AutoItem from './AutoItem';
import AutoModal from './AutoModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const AutoList = () => {
    const [autos, setAutos] = useState([]);
    const [selectedAuto, setSelectedAuto] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/vehiculos')
            .then(response => response.json())
            .then(data => setAutos(data))
            .catch(error => console.error('Error al cargar los autos:', error));
    }, []);

    return (
        <div className="container">
            <h1 className="my-4">Lista de Autos</h1>
            <div className="row">
                {autos.map(auto => (
                    <AutoItem 
                        key={auto.VehiculoID} 
                        auto={auto} 
                        onClick={() => setSelectedAuto(auto)} 
                    />
                ))}
            </div>
            {selectedAuto && 
                <AutoModal 
                    auto={selectedAuto} 
                    onClose={() => setSelectedAuto(null)} 
                />
            }
        </div>
    );
};

export default AutoList;
