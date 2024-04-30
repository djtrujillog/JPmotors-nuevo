import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom" 
import useAuth from "../hook/useAuth"

const DashboardContext = createContext();

// eslint-disable-next-line react/prop-types
const DashboardProvider = ({ children }) => {
    const [cotizaciones, setCotizaciones] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false);
    const [producto, setProducto] = useState({});

    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect(() => {
        const obtenerCotizaciones = async () => {
            try {
                const token = localStorage.getItem('token');                
                if( !token || !auth == false ) return  navigate('/login');

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Autorization: `Bearer ${token}`
                    }
                }
                const { data }  = await clienteAxios.get('/dashboard', config);
                console.log(data);   
                setCotizaciones(data);
            } catch( error ){
                console.log(error);
            }
        }
        obtenerCotizaciones();
    }, []);

    const mostrarAlerta = alerta => {
        setAlerta(alerta);

        setTimeout(() => {
            setAlerta({});
        }, 5000);
    }

    const obtenerProducto = async barras => {
        setCargando(true);
    
        try {
            const token = localStorage.getItem('token');
            if( !token ) return navigate('/login');
    
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios.get(`/dashboard/barras/${barras}`, config);
            setProducto(data);
        } catch (error) {
            setAlerta({
                msg: 'Hubo un error',
                error: true
            });
            setTimeout(() => {
                setAlerta({});
            }, 3000);
        } finally {
            setCargando(false);
        }
    }
    
    const cerrarSesionDashboard = () => {
        setCotizaciones([]);
        setProducto({});
        setAlerta({});
    }
    
  return (
    <>
        <DashboardContext.Provider
            value={{
                cotizaciones,
                alerta,
                producto,
                cargando,
                setCargando,
                mostrarAlerta,
                obtenerProducto,
                cerrarSesionDashboard
            }}
        >
            {children}
        </DashboardContext.Provider>
    </>
  )
}

export {
    DashboardProvider
}

export default DashboardContext