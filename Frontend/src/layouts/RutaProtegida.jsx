import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Header from "../components/Header";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import DashboardIcon from '../assets/dashboard.png'

import { Link } from 'react-router-dom';

const RutaProtegida = () => {
    const { auth, cerrarSesionAuth } = useAuth();
    return (        
        <>
            {                
                auth.Estado == '1' ? (
                    <div className='bg-gray-100'>
                        <Header 
                            cerrarSesionAuth={cerrarSesionAuth}
                            auth={auth}
                        />

                        <div className='flex md:min-h-screen'>
                           <Sidebar>                                
                                <SidebarItem icon={<img src={DashboardIcon} alt="Inicio" width={20}/>} text='Inicio' active alert/>
                                <SidebarItem icon={<img src={DashboardIcon} alt="Calendario" width={20}/>} text='Calendario' />
                                <SidebarItem icon={<img src={DashboardIcon} alt="Cartera" width={20}/>} text='Cartera' />
                                <Link to="/dashboard/vehiculos">                                    
                                    <SidebarItem icon={<img src={DashboardIcon} alt="Vehiculos" width={20}/>} text='Vehiculos' />
                                </Link>
                            </Sidebar>

                           <main className='p-3 flex-1 '>
                              <Outlet />
                           </main>
                        </div>
                    </div>
                    
                ) : <Navigate to="/login" />}
        </>
    )
}

export default RutaProtegida