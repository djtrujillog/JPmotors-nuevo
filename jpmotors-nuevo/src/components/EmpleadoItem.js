import React from 'react';

const EmpleadoItem = ({ empleado, onClick }) => {
  const { Nombre, Apellido, CorreoElectronico } = empleado;

  return (
    <div className="list-group-item" onClick={() => onClick(empleado)}>
      <h5>{Nombre} {Apellido}</h5>
      <p>{CorreoElectronico}</p>
    </div>
  );
};

export default EmpleadoItem;
