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
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
});

const PdfDocument = ({
  imageUrl,
  motorDetails,
  seguridadDetails,
  interiorDetails,
  exteriorDetails,
  dimensionesDetails,
}) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Detalles del Vehículo</Text>
        {imageUrl && <Image style={styles.image} src={imageUrl} />}
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
