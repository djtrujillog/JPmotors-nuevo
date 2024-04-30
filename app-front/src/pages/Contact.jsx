
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Contact = () => {
    return (
        <div className="p-d-flex p-jc-center">
            <Card title="Contacto" style={{ width: '25em' }}>
                <div className="p-grid p-fluid">
                    <div className="p-col-12">
                        <label htmlFor="name">Nombre</label>
                        <InputText id="name" type="text" />

                        <label htmlFor="email">Correo electrónico</label>
                        <InputText id="email" type="email" />

                        <label htmlFor="message">Mensaje</label>
                        <InputText id="message" type="text" />

                        <Button label="Enviar" />
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Contact;
