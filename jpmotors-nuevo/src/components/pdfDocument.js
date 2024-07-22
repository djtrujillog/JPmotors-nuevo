import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import headerImg from '../img/Logo-12.png';
import separador1 from '../img/separador_1.png';
import separador2 from '../img/separador_2.png';
import separador3 from '../img/separador_3.png';
import separador5 from '../img/separador_5.png';
import separador6 from '../img/separador_6.png';

// Estilos para el documento PDF
const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', // Alineación de contenido en los extremos
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImage: {
    width: 'auto',
    height: 50,
    marginRight: 10,
  },
  headerInfo: {
    textAlign: 'left', // Alineación del texto a la derecha
    fontSize: 8, // Tamaño de fuente
  },
  headerTitle: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  headerPros:{
    textAlign: 'center',
    fontSize : 12
  },
  section: {
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
    width: '60%',
    height: 'auto',
    marginBottom: 5,
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
    marginBottom: 2,
    borderBottomWidth: 0,
    borderBottomColor: '#000',
  },
  columns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  },
});

// Componente para generar el documento PDF
const PdfDocument = ({
  imageUrl,
  marca,
  modelo,
  motorDetails,
  seguridadDetails,
  interiorDetails,
  exteriorDetails,
  dimensionesDetails,
}) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        {/* Imagen del encabezado */}
        <Image style={styles.headerImage} src={headerImg} />
        <Text style={styles.headerTitle}>{`${marca} ${modelo}`}</Text>
        {/* Información de contacto alineada a la derecha */}
        <View style={styles.headerInfo}>
          
          <Text>Por el centro de salud, Santa Elena
            , Petén.</Text>
          <Text>(502) 3973 - 1085</Text>
          <Text>info@jpmotorsgt.com</Text>
        </View>
      </View>
      <View style={styles.section}>
        {/* Título de la sección */}
        <Text style={styles.headerPros}>PROSPECTO</Text>
        {imageUrl && <Image style={styles.image} src={imageUrl} />}
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Image style={styles.separadorImage} src={separador6} />
        <View style={styles.columns}>
          <View style={styles.column}>
            {motorDetails.Motor.slice(0, Math.ceil(motorDetails.Motor.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.text}>{detail}</Text>
            ))}
          </View>
          <View style={styles.column}>
            {motorDetails.Motor.slice(Math.ceil(motorDetails.Motor.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.text}>{detail}</Text>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Image style={styles.separadorImage} src={separador5} />
        <View style={styles.columns}>
          <View style={styles.column}>
            {seguridadDetails.Seguridad.slice(0, Math.ceil(seguridadDetails.Seguridad.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.text}>{detail}</Text>
            ))}
          </View>
          <View style={styles.column}>
            {seguridadDetails.Seguridad.slice(Math.ceil(seguridadDetails.Seguridad.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.text}>{detail}</Text>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Image style={styles.separadorImage} src={separador1} />
        <View style={styles.columns}>
          <View style={styles.column}>
            {interiorDetails.Interior.slice(0, Math.ceil(interiorDetails.Interior.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.text}>{detail}</Text>
            ))}
          </View>
          <View style={styles.column}>
            {interiorDetails.Interior.slice(Math.ceil(interiorDetails.Interior.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.text}>{detail}</Text>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Image style={styles.separadorImage} src={separador2} />
        <View style={styles.columns}>
          <View style={styles.column}>
            {exteriorDetails.Exterior.slice(0, Math.ceil(exteriorDetails.Exterior.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.text}>{detail}</Text>
            ))}
          </View>
          <View style={styles.column}>
            {exteriorDetails.Exterior.slice(Math.ceil(exteriorDetails.Exterior.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.text}>{detail}</Text>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Image style={styles.separadorImage} src={separador3} />
        <View style={styles.columns}>
          <View style={styles.column}>
            {dimensionesDetails.Dimensiones.slice(0, Math.ceil(dimensionesDetails.Dimensiones.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.text}>{detail}</Text>
            ))}
          </View>
          <View style={styles.column}>
            {dimensionesDetails.Dimensiones.slice(Math.ceil(dimensionesDetails.Dimensiones.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.text}>{detail}</Text>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PdfDocument;
