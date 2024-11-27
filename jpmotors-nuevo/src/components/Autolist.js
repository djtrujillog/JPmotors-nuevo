import React, { useEffect, useState } from 'react';
import AutoItem from './AutoItem';
import AutoModal from './AutoModal';
import 'bootstrap/dist/css/bootstrap.min.css';


const AutoList = () => {
  const [autos, setAutos] = useState([]);
  const [selectedAuto, setSelectedAuto] = useState(null);
  const [filterMarca, setFilterMarca] = useState('');
  const [filterModelo, setFilterModelo] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const cachedData = localStorage.getItem('autos');
        const cachedTime = localStorage.getItem('autos_timestamp');
        const currentTime = Date.now();
  
        if (cachedData && cachedTime && currentTime - cachedTime < 3600000) {
          const data = JSON.parse(cachedData);
          setAutos(data);
          updateMarcasYModelos(data);
        } else {
          const response = await fetch('http://localhost:4000/vehiculos/nuevos');
          const data = await response.json();
          if (response.ok) {
            console.log('Datos de vehículos:', data); // Agregar log
            setAutos(data);
            localStorage.setItem('autos', JSON.stringify(data));
            localStorage.setItem('autos_timestamp', currentTime);
            updateMarcasYModelos(data);
          } else {
            console.error('Error al cargar los autos');
          }
        }
      } catch (error) {
        console.error('Error en la consulta a la API:', error);
      }
    };
  
    fetchAutos();
  }, []);
  

  const updateMarcasYModelos = (data) => {
    const marcasUnicas = [...new Set(data.map(auto => auto.Marca))];
    setMarcas(marcasUnicas);

    // Filtrar modelos para la marca seleccionada (si existe una)
    if (filterMarca) {
      const modelosFiltrados = [...new Set(data.filter(auto => auto.Marca === filterMarca).map(auto => auto.Modelo))];
      setModelos(modelosFiltrados);
    } else {
      const modelosUnicos = [...new Set(data.map(auto => auto.Modelo))];
      setModelos(modelosUnicos);
    }
  };

  useEffect(() => {
    // Cada vez que cambia la marca seleccionada, actualizamos los modelos
    if (filterMarca) {
      const modelosFiltrados = [...new Set(autos.filter(auto => auto.Marca === filterMarca).map(auto => auto.Modelo))];
      setModelos(modelosFiltrados);
      setFilterModelo(''); // Reiniciar modelo cuando cambia la marca
    } else {
      updateMarcasYModelos(autos);
    }
  }, [filterMarca, autos]);

  const filteredAutos = autos.filter(auto => {
    return (
      (filterMarca === '' || auto.Marca === filterMarca) &&
      (filterModelo === '' || auto.Modelo === filterModelo)
    );
  });

  const handleItemClick = (auto) => {
    if (auto && auto.VehiculoID) {
      setSelectedAuto(auto);
    }
  };

  return (
    <div className="container-xl">
      <h1 className="my-4 text-center">Lista de Vehículos</h1>
      <div className="mb-4 d-flex justify-content-center">
        <div className="form-group mr-2">
          <label htmlFor="filterMarca">Marca</label>
          <select
            id="filterMarca"
            value={filterMarca}
            onChange={(e) => setFilterMarca(e.target.value)}
            className="form-control"
          >
            <option value="">Todas las Marcas</option>
            {marcas.length > 0 ? (
              marcas.map(marca => (
                <option key={marca} value={marca}>{marca}</option>
              ))
            ) : (
              <option>Cargando marcas...</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="filterModelo">Modelo</label>
          <select
            id="filterModelo"
            value={filterModelo}
            onChange={(e) => setFilterModelo(e.target.value)}
            className="form-control"
            disabled={!filterMarca}
          >
            <option value="">Todos los Modelos</option>
            {modelos.length > 0 ? (
              modelos.map(modelo => (
                <option key={modelo} value={modelo}>{modelo}</option>
              ))
            ) : (
              <option>Cargando modelos...</option>
            )}
          </select>
        </div>
      </div>
      <br />
      <div className="row">
        {filteredAutos.length > 0 ? (
          filteredAutos.map(auto => (
            <AutoItem
              key={auto.VehiculoID}
              auto={auto}
              onClick={() => handleItemClick(auto)}
            />
          ))
        ) : (
          <p>No se encontraron vehículos.</p>
        )}
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
