import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import headerImg from '../img/Logo-12.png';
import separador1 from '../img/separador_1.png';
import separador2 from '../img/separador_2.png';
import separador3 from '../img/separador_3.png';
// import separador4 from '../img/separador_4.png';
import separador5 from '../img/separador_5.png';
import separador6 from '../img/separador_6.png';

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImage: {
    width: 'auto',
    height: 50,
    marginRight: 10,
  },
  separadorImage: {
    width: 'auto',
    height: 50,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold', // Bold font for titles
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
        <Image style={styles.headerImage} src={headerImg} />
        <Text style={styles.headerTitle}>{`${marca} ${modelo}`}</Text>
      </View>
      <View style={styles.section}>
        {/* <Text style={styles.title}>Detalles del Vehículo</Text> */}
        {imageUrl && <Image style={styles.image} src={imageUrl} />}
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        {/* <Text style={styles.subTitle}>Detalles del Motor</Text> */}
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
        {/* <Text style={styles.subTitle}>Detalles de Seguridad</Text> */}
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
        {/* <Text style={styles.subTitle}>Detalles de Interior</Text> */}
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
        {/* <Text style={styles.subTitle}>Detalles de Exterior</Text> */}
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
        {/* <Text style={styles.subTitle}>Dimensiones del Vehículo</Text> */}
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
