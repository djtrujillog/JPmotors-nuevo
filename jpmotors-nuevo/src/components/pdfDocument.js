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
    width: '100%',
    height: '100%',
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

const PdfDocument = ({
  imageData,
  motorDetails,
  seguridadDetails,
  interiorDetails,
  exteriorDetails,
  dimensionesDetails,
}) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{`${imageData.Marca} ${imageData.Modelo}`}</Text>
        <Image style={styles.image} src={`/imagenes/${imageData.Imagen}`} />
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.subTitle}>Detalles del Motor</Text>
        {motorDetails.Motor.map((detail, index) => (
          <Text key={index} style={styles.text}>{detail}</Text>
        ))}
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.subTitle}>Detalles de Seguridad</Text>
        {seguridadDetails.Seguridad.map((detail, index) => (
          <Text key={index} style={styles.text}>{detail}</Text>
        ))}
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.subTitle}>Detalles de Interior</Text>
        {interiorDetails.Interior.map((detail, index) => (
          <Text key={index} style={styles.text}>{detail}</Text>
        ))}
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.subTitle}>Detalles de Exterior</Text>
        {exteriorDetails.Exterior.map((detail, index) => (
          <Text key={index} style={styles.text}>{detail}</Text>
        ))}
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.subTitle}>Dimensiones del Vehículo</Text>
        {dimensionesDetails.Dimensiones.map((detail, index) => (
          <Text key={index} style={styles.text}>{detail}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default PdfDocument;
