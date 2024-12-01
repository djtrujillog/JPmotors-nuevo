import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import headerImg from '../img/Logo-12.png';
import separador1 from '../img/separador_1.png';
import separador2 from '../img/separador_2.png';
import separador3 from '../img/separador_3.png';
import separador5 from '../img/separador_5.png';
import separador6 from '../img/separador_6.png';
import separador4 from '../img/separador_4.png';

// Estilos para el documento PDF
const styles = StyleSheet.create({
  page: { padding: 20, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerImage: { height: 50, marginRight: 10 },
  headerInfo: { textAlign: 'left', fontSize: 8 },
  headerTitle: { fontSize: 10, fontWeight: 'bold' },
  headerPros: { textAlign: 'center', fontSize: 12 },
  section: { marginBottom: 5 },
  title: { fontSize: 16, marginBottom: 8, fontWeight: 'bold', textAlign: 'center' },
  image: { alignSelf: 'center', width: '60%', height: 'auto', marginBottom: 5 },
  logo: { width: '15%', height: 'auto', marginBottom: 10, alignSelf: 'center' },
  bulletPoint: { fontSize: 10, marginBottom: 5, marginLeft: 10 },
  divider: { marginBottom: 2, borderBottomWidth: 0, borderBottomColor: '#000' },
  columns: { flexDirection: 'row', justifyContent: 'space-between' },
  column: { width: '48%' },
});

// Componente para generar el documento PDF
const PdfDocument = ({
  imageUrl,
  marca,
  modelo,
  motorDetails = {},
  seguridadDetails = {},
  interiorDetails = {},
  exteriorDetails = {},
  dimensionesDetails = {},
  garantiaDetails = {},
  logoUrl,
}) => (
  <Document>
    <Page style={styles.page}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Image style={styles.headerImage} src={headerImg} />
        <Text style={styles.headerTitle}>{`${marca} ${modelo}`}</Text>
        <View style={styles.headerInfo}>
          <Text>Por el centro de salud, Santa Elena, Petén.</Text>
          <Text>(502) 5060 1959</Text>
          <Text>info@jpmotorsgt.com</Text>
        </View>
      </View>
      {logoUrl && <Image style={styles.logo} src={logoUrl} />}
      {/* Imagen principal */}
      <View style={styles.section}>
        <Text style={styles.headerPros}>PROSPECTO</Text>
        {imageUrl && <Image style={styles.image} src={imageUrl} />}
      </View>
      <View style={styles.divider} />
      {/* Secciones dinámicas */}
      {[
        { title: 'Motor', details: motorDetails?.Motor || [], separator: separador6 },
        { title: 'Seguridad', details: seguridadDetails?.Seguridad || [], separator: separador5 },
        { title: 'Interior', details: interiorDetails?.Interior || [], separator: separador1 },
        { title: 'Exterior', details: exteriorDetails?.Exterior || [], separator: separador2 },
        { title: 'Dimensiones', details: dimensionesDetails?.Dimensiones || [], separator: separador3 },
        { title: 'Garantía', details: garantiaDetails?.Garantia || [], separator: separador4 },
      ].map(({ title, details, separator }, sectionIndex) => (
        details.length > 0 && (
          <View key={sectionIndex} style={styles.section}>
            <Image style={styles.image} src={separator} />
            <View style={styles.columns}>
              <View style={styles.column}>
                {details.slice(0, Math.ceil(details.length / 2)).map((detail, index) => (
                  <Text key={index} style={styles.bulletPoint}>• {detail}</Text>
                ))}
              </View>
              <View style={styles.column}>
                {details.slice(Math.ceil(details.length / 2)).map((detail, index) => (
                  <Text key={index} style={styles.bulletPoint}>• {detail}</Text>
                ))}
              </View>
            </View>
          </View>
        )
      ))}
    </Page>
  </Document>
);

export default PdfDocument;
