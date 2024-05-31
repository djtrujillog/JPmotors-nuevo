import { useState } from "react";
import { Link } from "react-router-dom";

import Menu from '../assets/align-center-svgrepo-com.svg';
import Cerrar from '../assets/close-ellipse-svgrepo-com.svg'

const Header = ({ cerrarSesionAuth, auth }) => {
    const [navbar, setNavbar] = useState(false);

    const handleCerrarSesion = () => {
        cerrarSesionAuth();
        localStorage.removeItem('token');
        localStorage.removeItem('auth');
    }
    
    return (
        <div>
            <nav className="w-full bg-white">
                <div className="justify-between px-4 mx-auto  md:items-center md:flex md:px-8 ">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    {/* LOGO */}
                    <Link href="/">
                    <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0 items-center">
                         JP Motors
                     </h2>
                    </Link>
                    {/* HAMBURGER BUTTON FOR MOBILE */}
                    <div className="md:hidden">
                        <button
                        className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                        onClick={() => setNavbar(!navbar)}
                        >
                        {navbar ? (
                            <img src={Cerrar} width={35} height={35} alt="logo" />
                        ) : (
                            <img
                            src={Menu}
                            width={35}
                            height={35}
                            alt="logo"
                            className="focus:border-none active:border-none"
                            />
                        )}
                        </button>
                    </div>
                    </div>
                </div>
                <div>
                    <div
                    className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                        navbar ? 'p-12 md:p-0 block' : 'hidden'
                    }`}
                    >                    
                        {
                            auth.Cargo === "VENDEDOR" ? (
                                <ul className="h-screen md:h-auto items-center justify-center md:flex ">
                                    <li className="pb-6 text-xl text-blue py-2 md:px-6 text-center border-b-2 md:border-b-0">
                                        <Link                        
                                            to='/dashboard/cajas'
                                            className='font-bold uppercase'
                                            onClick={() => setNavbar(!navbar)}
                                        >Cajas</Link>
                                    </li>
                                    <li className="pb-6 text-xl text-blue py-2 md:px-6 text-center border-b-2 md:border-b-0">
                                        <Link                        
                                            to='/dashboard/clientes'
                                            className='font-bold uppercase'
                                            onClick={() => setNavbar(!navbar)}
                                        >Clientes</Link>
                                    </li>
                                    <li className="pb-6 text-xl text-blue py-2 md:px-6 text-center border-b-2 md:border-b-0">
                                        <Link                        
                                            to='/dashboard/ventas'
                                            className='font-bold uppercase'
                                            onClick={() => setNavbar(!navbar)}
                                        >Ventas</Link>
                                    </li>
                                    <li className="pb-6 text-xl text-blue py-2 px-6 text-center  border-b-2 md:border-b-0">
                                        <Link
                                            to="/dashboard"
                                            className='font-bold uppercase'
                                            onClick={() => setNavbar(!navbar)}
                                        >Inventario</Link>
                                    </li>
                                    <li className="pb-6 text-xl text-blue py-2 px-6 text-center  border-b-2 md:border-b-0">
                                        <button
                                            type="button"
                                            className='text-blue text-sm text-white bg-sky-600 p-3 rounded-lg uppercase font-bold'
                                            onClick={handleCerrarSesion}
                                        >Cerrar Sesión</button>   
                                    </li>
                                </ul>
                            ) : (
                                <ul className="h-screen md:h-auto items-center justify-center md:flex ">
                                    <li className="pb-6 text-xl text-blue py-2 px-6 text-center  border-b-2 md:border-b-0">
                                        <Link
                                            to="/dashboard"
                                            className='font-bold uppercase'
                                            onClick={() => setNavbar(!navbar)}
                                        >Inventario</Link>
                                        </li>
                                        <li className="pb-6 text-xl text-blue py-2 px-6 text-center  border-b-2 md:border-b-0">
                                        <button
                                            type="button"
                                            className='text-blue text-sm text-white bg-sky-600 p-3 rounded-lg uppercase font-bold'
                                            onClick={handleCerrarSesion}
                                        >Cerrar Sesión</button>   
                                    </li>
                                </ul>
                            )
                        }                    
                    </div>
                </div>
                </div>
            </nav>
        </div>
    )
}


export default Header