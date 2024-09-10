import React from 'react';

const ClienteItem = ({ cliente, onClick }) => {
  const { Nombre, Apellido, CorreoElectronico } = cliente;

  return (
    <div className="list-group-item" onClick={() => onClick(cliente)}>
      <h5>{Nombre} {Apellido}</h5>
      <p>{CorreoElectronico}</p>
    </div>
  );
};

export default ClienteItem;
