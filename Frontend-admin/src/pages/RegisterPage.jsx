import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo  from '../assets/Imagen_Principal.png'
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

import { Toast } from 'primereact/toast';

const RegisterPage = () => {
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [CorreoElectronico, setcorreoElectronico] = useState('');  
  const [Usuario, setUsuario] = useState('');
  const [ContrasenaHash, setContrasenaHash] = useState('');
  const [RepetirContrasenaHash, setRepetirContrasenaHash] = useState('');
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const toast = useRef(null);

  const mostarAlertaFlotante = ( tipo, message ) => {
    toast.current.show({ severity: tipo, summary: 'Información', detail: message });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();    
    if( [Nombre, Apellido, Telefono, CorreoElectronico, Usuario, ContrasenaHash].includes('') ) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    if (ContrasenaHash !== RepetirContrasenaHash) {
        setAlerta({
            msg: 'Las contraseñas no coinciden',
            error: true
        });
        return;
    }

    // Verificar si el password termina en @jpmotors.com
    const regex = /@jpmotors\.com$/;
    if (!regex.test(CorreoElectronico)) {
      setAlerta({
        msg: 'Correo electrónico no válido',
        error: true
      });
      return;
    }

    try {
      await clienteAxios.post('/auth/signup',
      { 
        'Nombre': Nombre, 
        'Apellido': Apellido,
        'Cargo': 'VENDEDOR',
        'Telefono': Telefono,
        'CorreoElectronico': CorreoElectronico,
        'Usuario': Usuario.toUpperCase(),
        'ContrasenaHash': ContrasenaHash,
        'estado' : 1
      });
      setAlerta({});
      mostarAlertaFlotante('success', 'Cuenta creada exitosamente');
      setTimeout(() => {
        navigate('/login');        
      }, 1000);
    } catch (error) {
        console.log(error);
      mostarAlertaFlotante('error', 'Hubo un error al crear la cuenta');
    }      
  };

  const { msg } = alerta;

  return (
    <>    
        <div className="card flex justify-content-center">
                <Toast ref={toast} />
        </div>    
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={Logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Crea tu cuenta en Jp Motors
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            { msg && <Alerta alerta = { alerta }/> }
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre
                </label>
                <div className="mt-2">
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    autoComplete="text"
                    required
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={Nombre}
                    onChange={e => setNombre(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="apellido" className="block text-sm font-medium leading-6 text-gray-900">
                  Apellido
                </label>
                <div className="mt-2">
                  <input
                    id="apellido"
                    name="apellido"
                    type="text"
                    autoComplete="text"
                    required
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={Apellido}
                    onChange={e => setApellido(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-900">
                  Telefono
                </label>
                <div className="mt-2">
                  <input
                    id="telefono"
                    name="telefono"
                    type="number"
                    autoComplete="text"
                    required
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={Telefono}
                    onChange={e => setTelefono(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Correo Electronico
                  </label>                
                </div>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"                    
                    required
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={CorreoElectronico}
                    onChange={e => setcorreoElectronico(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="usuario" className="block text-sm font-medium leading-6 text-gray-900">
                    Usuario
                  </label>                
                </div>
                <div className="mt-2">
                  <input
                    id="usuario"
                    name="usuario"
                    type="text"                    
                    required
                    className="block uppercase p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={Usuario}
                    onChange={e => setUsuario(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="contraseña" className="block text-sm font-medium leading-6 text-gray-900">
                    Contraseña
                  </label>                
                </div>
                <div className="mt-2">
                  <input
                    id="contraseña"
                    name="contraseña"
                    type="password"                    
                    required
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={ContrasenaHash}
                    onChange={e => setContrasenaHash(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="repetir-contraseña" className="block text-sm font-medium leading-6 text-gray-900">
                    Repetir Contraseña
                  </label>                
                </div>
                <div className="mt-2">
                  <input
                    id="repetir-contraseña"
                    name="repetir-contraseña"
                    type="password"
                    required
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={RepetirContrasenaHash}
                    onChange={e => setRepetirContrasenaHash(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Crear cuenta
                </button>                
              </div>
            </form>          
          </div>
        </div>
    </>    
  )
}

export default RegisterPage