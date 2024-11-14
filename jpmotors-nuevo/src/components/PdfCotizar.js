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
  page: {
    padding: 20, // Ajusta este valor para aumentar o reducir el margen del documento
    fontFamily: 'Helvetica',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImage: {
    width: 'auto',
    height: 50,
    marginRight: 10,
  },
  headerInfo: {
    textAlign: 'left',
    fontSize: 8,
  },
  headerTitle: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  headerPros: {
    textAlign: 'center',
    fontSize: 10,
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
  logo: {
    width: '5%', // Ajusta el tamaño del logo según sea necesario
    height: 'auto',
    marginBottom: 10,
    alignSelf: 'center', // Centrar el logo
  },  // <- aquí faltaba la llave de cierre
  subTitle: {
    fontSize: 10,
    marginBottom: 8,
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
  bulletText: {
    fontSize: 10,
    marginBottom: 5,
    marginLeft: 5,
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
  separadorImage: {
    width: '100%',
    height: 'auto',
    marginBottom: 5,
  },
  priceText: {
    fontSize: 12,
    marginBottom: 3,
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
  clientEmployeeSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  clientEmployeeColumn: {
    width: '48%',
  },
  clientEmployeeText: {
    fontSize: 8,
    marginBottom: 3,
  },
});


// Componente para generar el documento PDF
const PdfDocument = ({
  imageUrl,
  cliente,
  empleado,
  motorDetails,
  marca,
  modelo,
  seguridadDetails,
  interiorDetails,
  exteriorDetails,
  dimensionesDetails,
  garantiaDetails,
  precioWeb,
  precioGerente,
  precioLista,
  precioPlacas,        // Nuevo campo
  precioCotizacion,    // Nuevo campo
  coloresDisponibles,   // Nuevo campo
  marcaLogoUrl,
}) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.headerImage} src={headerImg} />
        <Text style={styles.headerTitle}>{marca} {modelo}</Text>
        <View style={styles.headerInfo}>
          <Text>Por el centro de salud, Santa Elena, Petén.</Text>
          <Text>(502) 5060 1959</Text>
          <Text>info@jpmotorsgt.com</Text>
        </View>
      </View>
      {/* Agregar el logo de la marca */}
      {marcaLogoUrl && <Image style={styles.logo} src={marcaLogoUrl} />}
      <View style={styles.section}>
        <Text style={styles.headerPros}>Cotizacion</Text>
        {imageUrl && <Image style={styles.image} src={imageUrl} />}
      </View>

      <View style={styles.clientEmployeeSection}>
        <View style={styles.clientEmployeeColumn}>
          <Text style={styles.subTitle}>Cliente: </Text>
          <Text style={styles.clientEmployeeText}>Nombre: {cliente?.Nombre} {cliente?.Apellido}</Text>
          <Text style={styles.clientEmployeeText}>Teléfono: {cliente?.Telefono}</Text>
        </View>
        <View style={styles.clientEmployeeColumn}>
          <Text style={styles.subTitle}>Ejecutivo/a:</Text>
          <Text style={styles.clientEmployeeText}>Nombre: {empleado?.nombre} {empleado?.apellido}</Text>
          <Text style={styles.clientEmployeeText}>Teléfono: {empleado?.telefono}</Text> {/* Mostrar teléfono del empleado */}
        </View>
      </View>

      <View style={styles.divider} />
      <View style={styles.section}>
        <Image style={styles.separadorImage} src={separador6} />
        <View style={styles.columns}>
          <View style={styles.column}>
            {motorDetails.Motor.slice(0, Math.ceil(motorDetails.Motor.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.bulletText}>• {detail}</Text>
            ))}
          </View>
          <View style={styles.column}>
            {motorDetails.Motor.slice(Math.ceil(motorDetails.Motor.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.bulletText}>• {detail}</Text>
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
              <Text key={index} style={styles.bulletText}>• {detail}</Text>
            ))}
          </View>
          <View style={styles.column}>
            {seguridadDetails.Seguridad.slice(Math.ceil(seguridadDetails.Seguridad.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.bulletText}>• {detail}</Text>
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
              <Text key={index} style={styles.bulletText}>• {detail}</Text>
            ))}
          </View>
          <View style={styles.column}>
            {interiorDetails.Interior.slice(Math.ceil(interiorDetails.Interior.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.bulletText}>• {detail}</Text>
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
              <Text key={index} style={styles.bulletText}>• {detail}</Text>
            ))}
          </View>
          <View style={styles.column}>
            {exteriorDetails.Exterior.slice(Math.ceil(exteriorDetails.Exterior.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.bulletText}>• {detail}</Text>
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
              <Text key={index} style={styles.bulletText}>• {detail}</Text>
            ))}
          </View>
          <View style={styles.column}>
            {dimensionesDetails.Dimensiones.slice(Math.ceil(dimensionesDetails.Dimensiones.length / 2)).map((detail, index) => (
              <Text key={index} style={styles.bulletText}>• {detail}</Text>
            ))}
          </View>
        </View>
      </View>
       {/* Detalles de Garantía */}
       {garantiaDetails?.Garantia && (
        <View style={styles.section}>
          <Image style={styles.separadorImage} src={separador4} /> {/* Imagen separador4 */}
          <View style={styles.columns}>
            <View style={styles.column}>
              {garantiaDetails.Garantia.slice(0, Math.ceil(garantiaDetails.Garantia.length / 2)).map((detail, index) => (
                <Text key={index} style={styles.bulletPoint}>• {detail}</Text>
              ))}
            </View>
            <View style={styles.column}>
              {garantiaDetails.Garantia.slice(Math.ceil(garantiaDetails.Garantia.length / 2)).map((detail, index) => (
                <Text key={index} style={styles.bulletPoint}>• {detail}</Text>
              ))}
            </View>
          </View>
        </View>
      )}

      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.priceText}>Precios</Text>
        {/* <Text style={styles.priceText}>Precio Web: {precioWeb}</Text> */}
        <Text style={styles.priceText}>
        <Text style={{ color: 'black' }}>Precio lista: Q {precioGerente}</Text>
        </Text>

        <View style={styles.section}>
  <Text style={styles.priceText}>
    <Text style={{ color: 'red' }}>Precio promoción: Q</Text>
    <Text style={{ color: 'red' }}>{precioCotizacion}</Text>
  </Text>
  <Text style={styles.priceText}>
    <Text style={{ color: 'black' }}>Placas: Q </Text>
    <Text style={{ color: 'black' }}>{precioPlacas}</Text>
  </Text>
</View>
<Text style={styles.priceText}>

        <Text style={{ color: 'black' }}>Color Disponible: Q{coloresDisponibles}</Text>
        <Text style={{ color: 'black' }}>*Precio incluye IVA</Text>
        </Text>


      </View>
    </Page>
  </Document>
);

export default PdfDocument;
