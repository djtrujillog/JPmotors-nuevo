import React, { useEffect, useState } from 'react';
import AutoItem from './AutoItem';
import AutoModal from './AutoModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const AutoList = () => {
  const [autos, setAutos] = useState([]);
  const [selectedAuto, setSelectedAuto] = useState(null);

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const response = await fetch('https://jpmotorsgt.azurewebsites.net/vehiculos');
        const data = await response.json();
        if (response.ok) {
          setAutos(data);
        } else {
          console.error("Error al cargar los autos");
        }
      } catch (error) {
        console.error("Error en la consulta a la API:", error);
      }
    };

    fetchAutos();
  }, []);

  const handleItemClick = (auto) => {
    if (auto && auto.VehiculoID) {
      setSelectedAuto(auto);
    }
  };

  return (
    <div className="container-xl">
      <div>
      <h1 className="my-4">Lista de Autos</h1>
      </div><br/>
      <div className="row">
        {autos.map(auto => (
          <AutoItem
            key={auto.VehiculoID}
            auto={auto}
            onClick={() => handleItemClick(auto)}
          />
        ))}
      </div>
      {selectedAuto && (
        <AutoModal
          auto={selectedAuto}
          onClose={() => setSelectedAuto(null)}
        />
      )}
    </div>
  );
};

export default AutoList;
