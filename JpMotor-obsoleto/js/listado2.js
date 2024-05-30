$(document).ready(function() {
    // Obtener el valor del parámetro 'codigo' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const codigo = urlParams.get('codigo');

    // Realizar una solicitud AJAX para obtener los detalles del vehículo
    $.ajax({
        url: `http://localhost:4000/vehiculos/detalle/${codigo}`,
        method: 'GET',
        success: function(response) {
            // Si la respuesta es un array, tomar el primer elemento
            const detalle = Array.isArray(response) ? response[0] : response;
            console.log(detalle);
            // Asignar los datos del vehículo a los elementos HTML
            $('.tipomotor').text(`motor:  ${detalle.TipoMotor}`);
            $('.cilindros').text(`cilindros:  ${detalle.Cilindros}`);
            $('.Cilindrada').text(`Cilindrada:  ${detalle.Cilindrada}`);
            $('.Servotronic').text(`Servotronic:  ${detalle.Servotronic}`);
            $('.Combustible').text(`Combustible:  ${detalle.Combustible}`);
            $('.DetallesCilindros').text(` ${detalle.DetallesCilindros}`);
            $('.FuncionECO').text(`FuncionECO:  ${detalle.FuncionECO}`);
            $('.FuncionAutoStartStop').text(`FuncionAutoStartStop:  ${detalle.FuncionAutoStartStop}`);
            $('.FrenoEstacionamiento').text(`FrenoEstacionamiento:  ${detalle.FrenoEstacionamiento}`);
            $('.SistemaTraccion').text(`SistemaTraccion:  ${detalle.SistemaTraccion}`);
            $('.CajaCambios').text(` ${detalle.CajaCambios}`);
            $('.HP').text(` ${detalle.HP}`);
            $('.Torque').text(` ${detalle.Torque}`);
            $('.Aceleracion0_100').text(` ${detalle.Aceleracion0_100}`);
            $('.Asistente_Manejo').text(` ${detalle.Asistente_Manejo}`);
            $('.Frenos_Ventilados').text(` ${detalle.Frenos_Ventilados}`);
            $('.Airbags_Laterales').text(` ${detalle.Airbags_Laterales}`);
            $('.Cierre_Central').text(` ${detalle.Cierre_Central}`);
            $('.Dispositivo_Alarma').text(` ${detalle.Dispositivo_Alarma}`);
            $('.Interruptor_Bateria').text(` ${detalle.Interruptor_Bateria}`);
            $('.Rueda_Repuesto').text(` ${detalle.Rueda_Repuesto}`);
            $('.Botiquin_Primeros_Auxilios').text(` ${detalle.Botiquin_Primeros_Auxilios}`);
            $('.Barras_Proteccion_Lateral').text(` ${detalle.Barras_Proteccion_Lateral}`);
            $('.Llanta_Repuesto').text(` ${detalle.Llanta_Repuesto}`);
            $('.Control_Dinamico_Estabilidad').text(` ${detalle.Control_Dinamico_Estabilidad}`);
            $('.Sistema_ABS').text(` ${detalle.Sistema_ABS}`);
            $('.Sensor_Colision').text(` ${detalle.Sensor_Colision}`);
            $('.Reposacabezas_Regulables').text(` ${detalle.Reposacabezas_Regulables}`);
            $('.Control_Airbag').text(` ${detalle.Control_Airbag}`);
            $('.Performance_Control').text(` ${detalle.Performance_Control}`);
            $('.Union_ISOFIX').text(` ${detalle.Union_ISOFIX}`);
            $('.Pernos_Antirobo').text(` ${detalle.Pernos_Antirobo}`);
            $('.Control_Crucero_Frenado').text(` ${detalle.Control_Crucero_Frenado}`);
            $('.Preparacion_Apple_CarPlay').text(` ${detalle.Preparacion_Apple_CarPlay}`);
            $('.Alfombras_Velours').text(` ${detalle.Alfombras_Velours}`);
            $('.Asientos_Traseros_Abatibles').text(` ${detalle.Asientos_Traseros_Abatibles}`);
            $('.Boton_Arranque_Encendido').text(` ${detalle.Boton_Arranque_Encendido}`);
            $('.Retrovisor_Interior_Ajuste_Automatico').text(` ${detalle.Retrovisor_Interior_Ajuste_Automatico}`);
            $('.Volante_Multifuncion').text(` ${detalle.Volante_Multifuncion}`);
            $('.Aire_Acondicionado_Regulacion_Zonas').text(` ${detalle.Aire_Acondicionado_Regulacion_Zonas}`);
            $('.Reglaje_Electrico_Asientos_Conductor_Memoria').text(` ${detalle.Reglaje_Electrico_Asientos_Conductor_Memoria}`);
            $('.Computadora_Abordo').text(` ${detalle.Computadora_Abordo}`);
            $('.Apoya_Cabezas_Traseros').text(` ${detalle.Apoya_Cabezas_Traseros}`);
            $('.Molduras_Interiores_Negras').text(` ${detalle.Molduras_Interiores_Negras}`);
            $('.Paquete_Compartimentos').text(` ${detalle.Paquete_Compartimentos}`);
            $('.Asientos_Deportivos_Conductor_Acompanante').text(` ${detalle.Asientos_Deportivos_Conductor_Acompanante}`);
            $('.Vidrios_Electricos_Apertura_Cierre_Automatico').text(` ${detalle.Vidrios_Electricos_Apertura_Cierre_Automatico}`);
            $('.Apoyabrazos_Delantero').text(` ${detalle.Apoyabrazos_Delantero}`);
            $('.Toma_Corriente_12V').text(` ${detalle.Toma_Corriente_12V}`);
            $('.Access_Comfort').text(` ${detalle.Access_Comfort}`);
            $('.Interfaz_USB').text(` ${detalle.Interfaz_USB}`);
            $('.iDrive_Controller').text(` ${detalle.iDrive_Controller}`);
            $('.Luces_Bienvenida').text(` ${detalle.Luces_Bienvenida}`);
            $('.Asiento_Acompanante_Ajuste_Altura').text(` ${detalle.Asiento_Acompanante_Ajuste_Altura}`);
            $('.Cargador_Inalambrico_Celular').text(` ${detalle.Cargador_Inalambrico_Celular}`);
            $('.Panel_Instrumentos_Lujo').text(` ${detalle.Panel_Instrumentos_Lujo}`);
            $('.Pantalla_Panoramica').text(` ${detalle.Pantalla_Panoramica}`);
            $('.Pantalla_Panoramica_Interior_10_25_Pulgadas').text(` ${detalle.Pantalla_Panoramica_Interior_10_25_Pulgadas}`);
            $('.Pantalla_CID_Display_10_7_Pulgadas').text(` ${detalle.Pantalla_CID_Display_10_7_Pulgadas}`);
            $('.Sistema_Altavoces_Stereo_6_Altavoces').text(` ${detalle.Sistema_Altavoces_Stereo_6_Altavoces}`);
            $('.BMW_Live_Cockpit_Professional').text(` ${detalle.BMW_Live_Cockpit_Professional}`);
            $('.Sistema_Iluminacion_Exterior').text(`Sistema de Iluminacion Exterior ${detalle.Sistema_Iluminacion_Exterior}`);
            $('.Espejos_Retrovisores_Ajuste_Automatico_Anti_Deslumbramiento').text(`Espejos Retrovisores ${detalle.Espejos_Retrovisores_Ajuste_Automatico_Anti_Deslumbramiento}`);
            $('.Carriles_Longitudinales_Aluminio_Satinado').text(`Carriles  ${detalle.Carriles_Longitudinales_Aluminio_Satinado}`);
            $('.Camara_Marcha_Atras').text(`Camara marcha atras ${detalle.Camara_Marcha_Atras}`);
            $('.Faros_LED_Adaptativos').text(`Faros Adaptativos ${detalle.Faros_LED_Adaptativos}`);
            // $('.Tubo_Terminal_Escape_Visible_Round').text(`Terminal  ${detalle.Tubo_Terminal_Escape_Visible_Round}`);
            $('.Asistente_Luz_Carretera').text(`Asistente de luz de Carretera ${detalle.Asistente_Luz_Carretera}`);
            $('.Calefaccion_Vidrio_Trasero').text(`Calefaccion ${detalle.Calefaccion_Vidrio_Trasero}`);
            $('.Apertura_Puerta_Trasera_Automatica').text(` ${detalle.Apertura_Puerta_Trasera_Automatica}`);
            $('.Sensor_Lluvia_Accionamiento_Automatico_Luces').text(` ${detalle.Sensor_Lluvia_Accionamiento_Automatico_Luces}`);
            $('.Asistente_Aparcamiento').text(` ${detalle.Asistente_Aparcamiento}`);


        },
        error: function() {
            $('.detalleVehiculo').html('<p>Error al cargar los detalles del vehículo</p>');
        }
    });
});