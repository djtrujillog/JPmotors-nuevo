import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
    width: '50%',
    height: '50%',
    marginBottom: 5,
    objectFit: 'contain',
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
  divider: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
    flexBasis: '50%',
    paddingRight: 10,
  },
});

const PdfDocument = ({ details, imageData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{`${details.Marca} ${details.Modelo}`}</Text>
        <Image style={styles.image} src={`/images/${imageData.Imagen}`} />
      </View>
      {/* <View style={styles.divider} /> */}
      
      <View style={styles.section}>
        <Text style={styles.subTitle}>Motor</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>Tipo de Motor: {details.TipoMotor}</Text>
            <Text style={styles.text}>Cilindros: {details.Cilindros}</Text>
            <Text style={styles.text}>Cilindrada: {details.Cilindrada}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Servotronic: {details.Servotronic}</Text>
            <Text style={styles.text}>Combustible: {details.Combustible}</Text>
            <Text style={styles.text}>Detalles de Cilindros: {details.DetallesCilindros}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.subTitle}>Seguridad del Vehículo</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>Asistente de Manejo: {details.Asistente_Manejo}</Text>
            <Text style={styles.text}>Frenos Ventilados: {details.Frenos_Ventilados}</Text>
            <Text style={styles.text}>Airbags Laterales: {details.Airbags_Laterales}</Text>
            <Text style={styles.text}>Cierre Central: {details.Cierre_Central}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Dispositivo Alarma: {details.Dispositivo_Alarma}</Text>
            <Text style={styles.text}>Interruptor Batería: {details.Interruptor_Bateria}</Text>
            <Text style={styles.text}>Rueda de Repuesto: {details.Rueda_Repuesto}</Text>
            <Text style={styles.text}>Botiquín Primeros Auxilios: {details.Botiquin_Primeros_Auxilios}</Text>
            <Text style={styles.text}>Barras de Protección Lateral: {details.Barras_Proteccion_Lateral}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.subTitle}>Interior</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>Control Crucero y Frenado: {details.Control_Crucero_Frenado}</Text>
            <Text style={styles.text}>Preparación Apple CarPlay: {details.Preparacion_Apple_CarPlay}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Alfombras Velours: {details.Alfombras_Velours}</Text>
            <Text style={styles.text}>Asientos Traseros Abatibles: {details.Asientos_Traseros_Abatibles}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.subTitle}>Exterior</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>Sistema de Iluminación Exterior: {details.Sistema_Iluminacion_Exterior}</Text>
            <Text style={styles.text}>Espejos Retrovisores: {details.Espejos_Retrovisores_Ajuste_Automatico_Anti_Deslumbramiento}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Aros: {details.Carriles_Longitudinales_Aluminio_Satinado}</Text>
            <Text style={styles.text}>Cámara Marcha Atrás: {details.Camara_Marcha_Atras}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PdfDocument;
