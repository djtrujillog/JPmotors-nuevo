import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegida = () => {
    const { auth, cerrarSesionAuth } = useAuth();
    console.log(auth);
    return (        
        <>
            {                
                auth.Estado == '1' ? (
                    <div className='bg-gray-100'>
                        <Header 
                            cerrarSesionAuth={cerrarSesionAuth}
                            auth={auth}
                        />

                        <div className="md:flex md:min-h-screen">
                            <Sidebar />

                            <main className="flex-1 p-10">
                                <Outlet />
                            </main>
                        </div>
                    </div>
                    
                ) : <Navigate to="/login" />}
        </>
    )
}

export default RutaProtegida