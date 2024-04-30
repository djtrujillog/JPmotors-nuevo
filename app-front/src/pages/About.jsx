
import { Card } from 'primereact/card';

const About = () => {
    return (
        <div className="p-d-flex p-jc-center">
            <Card title="Sobre Nosotros" style={{ width: '25em' }}>
                <div className="p-grid">
                    <div className="p-col">
                        <p>
                            Somos una empresa dedicada a ofrecer soluciones innovadoras utilizando tecnologías de vanguardia.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default About;
