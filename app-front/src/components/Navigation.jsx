import { Menubar } from 'primereact/menubar'; // Importa Menubar desde PrimeReact

// Define tu lista de navegación
const navlist = [
    { label: 'Inicio', icon: 'pi pi-fw pi-home', command: () => { window.location = '/'; } },
    { label: 'Acerca de', icon: 'pi pi-fw pi-info', command: () => { window.location = '/about'; } },
    { label: 'Contacto', icon: 'pi pi-fw pi-envelope', command: () => { window.location = '/contact'; } }
];

const Navigation = () => {
   
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <Menubar model={navlist} />
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Navigation;
