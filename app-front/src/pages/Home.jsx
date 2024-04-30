
import { Card } from 'primereact/card';

const Home = () => {
    return (
        <div className="p-d-flex p-jc-center">
            <Card title="Inicio" style={{ width: '25em' }}>
                <div className="p-grid">
                    <div className="p-col">
                        <p>
                            Bienvenido a nuestra página de inicio.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Home;
