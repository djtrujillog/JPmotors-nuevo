import React, { useEffect, useState, useMemo } from 'react';
import AutoItem from './AutoItem';
import AutoModal from './AutoModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const AutoList = () => {
  const [autos, setAutos] = useState([]);
  const [selectedAuto, setSelectedAuto] = useState(null);
  const [filterLinea, setFilterLinea] = useState('');
  const [filterModelo, setFilterModelo] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const cachedData = localStorage.getItem('autos');
        const cachedTime = localStorage.getItem('autos_timestamp');
        const currentTime = Date.now();
        
        if (cachedData && cachedTime && (currentTime - cachedTime < 3600000)) {
          const data = JSON.parse(cachedData);
          setAutos(data);
          updateMarcasYModelos(data);
        } else {
          const response = await fetch('http://localhost:4000/vehiculos/nuevos');
          const data = await response.json();
          if (response.ok) {
            setAutos(data);
            localStorage.setItem('autos', JSON.stringify(data));
            localStorage.setItem('autos_timestamp', currentTime);
            updateMarcasYModelos(data);
          } else {
            console.error("Error al cargar los autos");
          }
        }
      } catch (error) {
        console.error("Error en la consulta a la API:", error);
      }
    };

    fetchAutos();
  }, []);

  const updateMarcasYModelos = (data) => {
    setMarcas([...new Set(data.map(auto => auto.Marca))]);
    setModelos([...new Set(data.map(auto => auto.Modelo))]);
  };

  // Filtrar modelos según la marca seleccionada
  useEffect(() => {
    if (filterLinea) {
      const filteredModelos = autos
        .filter(auto => auto.Marca === filterLinea)
        .map(auto => auto.Modelo);
      setModelos([...new Set(filteredModelos)]);
    } else {
      setModelos([...new Set(autos.map(auto => auto.Modelo))]);
    }
    setFilterModelo(''); // Resetear modelo seleccionado al cambiar la marca
  }, [filterLinea, autos]);

  const handleItemClick = (auto) => {
    if (auto && auto.VehiculoID) {
      setSelectedAuto(auto);
    }
  };

  const filteredAutos = autos.filter(auto => {
    return (
      (filterLinea === '' || auto.Marca === filterLinea) &&
      (filterModelo === '' || auto.Modelo === filterModelo)
    );
  });

  return (
    <div className="container-xl">
      <h1 className="my-4 text-center">Lista de Vehiculos</h1>
      <div className="mb-4 d-flex justify-content-center">
        <div className="form-group mr-2">
          <label htmlFor="filterLinea">Marca</label>
          <select
            id="filterLinea"
            value={filterLinea}
            onChange={(e) => setFilterLinea(e.target.value)}
            className="form-control"
          >
            <option value="">Todas las Marcas</option>
            {marcas.map(marca => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="filterModelo">Linea</label>
          <select
            id="filterModelo"
            value={filterModelo}
            onChange={(e) => setFilterModelo(e.target.value)}
            className="form-control"
            disabled={!filterLinea}
          >
            <option value="">Todas las Lineas</option>
            {modelos.map(modelo => (
              <option key={modelo} value={modelo}>{modelo}</option>
            ))}
          </select>
        </div>
      </div>
      <br />
      <div className="row">
        {filteredAutos.map(auto => (
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
