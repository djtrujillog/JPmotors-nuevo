import React, { useEffect, useState } from 'react';
import AutoItem from './AutoItem';
import AutoModal from './AutoModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const AutolistUsadosdos = () => {
  const [autos, setAutos] = useState([]);
  const [selectedAuto, setSelectedAuto] = useState(null);
  const [filterLinea, setFilterLinea] = useState('');
  const [filterModelo, setFilterModelo] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const response = await fetch('http://localhost:4000/vehiculos/usados');
        const data = await response.json();
        if (response.ok) {
          setAutos(data);

          // Extraer marcas únicas
          const uniqueMarcas = [...new Set(data.map(auto => auto.Marca))];
          setMarcas(uniqueMarcas);

          // Extraer modelos únicos
          const uniqueModelos = [...new Set(data.map(auto => auto.Modelo))];
          setModelos(uniqueModelos);

        } else {
          console.error("Error al cargar los autos");
        }
      } catch (error) {
        console.error("Error en la consulta a la API:", error);
      }
    };

    fetchAutos();
  }, []);

  // Filtrar modelos según la marca seleccionada
  useEffect(() => {
    if (filterLinea) {
      const filteredModelos = [...new Set(autos
        .filter(auto => auto.Marca === filterLinea)
        .map(auto => auto.Modelo))];
      setModelos(filteredModelos);
    } else {
      const uniqueModelos = [...new Set(autos.map(auto => auto.Modelo))];
      setModelos(uniqueModelos);
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
      <div>
        <h1 className="my-4 text-center">Lista de Vehiculos Usados</h1>
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

export default AutolistUsadosdos;
