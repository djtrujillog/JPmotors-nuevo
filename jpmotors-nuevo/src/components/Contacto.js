import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const styles = {
    container: {
        backgroundColor: '#fdf0d5',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '500px',
        margin: 'auto',
    },
    button: {
        backgroundColor: '#c1121f',
        borderColor: '#c1121f',
        color: '#fdf0d5',
    },
    buttonHover: {
        backgroundColor: '#780000',
        borderColor: '#780000',
    },
    label: {
        color: '#003049',
    },
    control: {
        borderColor: '#003049',
    }
};

function Contacto() {
    const [to, setTo] = useState(''); // Dirección fija para prueba
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      // Validación básica de los campos
      if (!to || !subject || !message) {
          alert("Todos los campos son obligatorios");
          return;
      }
      
      try {
          const response = await fetch('https://cotizaciones-jpmotors.onrender.com/mail/send', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ to, subject, message }),
          });
          const result = await response.json();
          alert(result.message);
      } catch (error) {
          console.error('Error:', error);
          alert('Failed to send email');
      }
  };
  

    return (
       <><br /><br /><br /><Container style={styles.container}>
        <h1>Contacto</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={styles.label}>Email destinatario</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese el email del destinatario"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              style={styles.control} />
          </Form.Group>
          <Form.Group controlId="formBasicSubject">
            <Form.Label style={styles.label}>Asunto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el asunto del correo"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={styles.control} />
          </Form.Group>
          <Form.Group controlId="formBasicMessage">
            <Form.Label style={styles.label}>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Ingrese el mensaje del correo"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={styles.control} />
          </Form.Group>
          <br />
          <Button
            variant="primary"
            type="submit"
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
          >
            Enviar
          </Button>
        </Form>
        
      </Container></>
        
    );
    
}

export default Contacto;
