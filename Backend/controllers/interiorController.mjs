import sequelize from "../config/config.mjs";

const interiorController = {
    getInteriores: async (req, res) => {
        try {
            const result = await sequelize.query("SELECT * FROM Interior",
            {
                type: sequelize.QueryTypes.SELECT
            });
        
            if(result.length > 0){
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "No hay interiores" });
            }      
        } catch (error) {
            console.error("Error al obtener interiores:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    crearInterior: async (req, res) => {
        const { VehiculoID, Control_Crucero_Frenado, Preparacion_Apple_CarPlay, Alfombras_Velours, Asientos_Traseros_Abatibles, Boton_Arranque_Encendido, Retrovisor_Interior_Ajuste_Automatico, Volante_Multifuncion, Aire_Acondicionado_Regulacion_Zonas, Reglaje_Electrico_Asientos_Conductor_Memoria, Computadora_Abordo, Apoya_Cabezas_Traseros, Molduras_Interiores_Negras, Paquete_Compartimentos, Asientos_Deportivos_Conductor_Acompanante, Vidrios_Electricos_Apertura_Cierre_Automatico, Apoyabrazos_Delantero, Toma_Corriente_12V, Access_Comfort, Interfaz_USB, IDrive_Controller, Luces_Bienvenida, Asiento_Acompanante_Ajuste_Altura, Cargador_Inalambrico_Celular, Panel_Instrumentos_Lujo, Pantalla_Panoramica, Pantalla_Panoramica_Interior_10_25_Pulgadas, Pantalla_CID_Display_10_7_Pulgadas, Sistema_Altavoces_Stereo_6_Altavoces, Tapiceria_Cuero_Vegano_Veganza_Perforated, BMW_Live_Cockpit_Professional } = req.body;
        try {
            const result = await sequelize.query("INSERT INTO Interior (VehiculoID, Control_Crucero_Frenado, Preparacion_Apple_CarPlay, Alfombras_Velours, Asientos_Traseros_Abatibles, Boton_Arranque_Encendido, Retrovisor_Interior_Ajuste_Automatico, Volante_Multifuncion, Aire_Acondicionado_Regulacion_Zonas, Reglaje_Electrico_Asientos_Conductor_Memoria, Computadora_Abordo, Apoya_Cabezas_Traseros, Molduras_Interiores_Negras, Paquete_Compartimentos, Asientos_Deportivos_Conductor_Acompanante, Vidrios_Electricos_Apertura_Cierre_Automatico, Apoyabrazos_Delantero, Toma_Corriente_12V, Access_Comfort, Interfaz_USB, IDrive_Controller, Luces_Bienvenida, Asiento_Acompanante_Ajuste_Altura, Cargador_Inalambrico_Celular, Panel_Instrumentos_Lujo, Pantalla_Panoramica, Pantalla_Panoramica_Interior_10_25_Pulgadas, Pantalla_CID_Display_10_7_Pulgadas, Sistema_Altavoces_Stereo_6_Altavoces, Tapiceria_Cuero_Vegano_Veganza_Perforated, BMW_Live_Cockpit_Professional) VALUES (:VehiculoID, :Control_Crucero_Frenado, :Preparacion_Apple_CarPlay, :Alfombras_Velours, :Asientos_Traseros_Abatibles, :Boton_Arranque_Encendido, :Retrovisor_Interior_Ajuste_Automatico, :Volante_Multifuncion, :Aire_Acondicionado_Regulacion_Zonas, :Reglaje_Electrico_Asientos_Conductor_Memoria, :Computadora_Abordo, :Apoya_Cabezas_Traseros, :Molduras_Interiores_Negras, :Paquete_Compartimentos, :Asientos_Deportivos_Conductor_Acompanante, :Vidrios_Electricos_Apertura_Cierre_Automatico, :Apoyabrazos_Delantero, :Toma_Corriente_12V, :Access_Comfort, :Interfaz_USB, :IDrive_Controller, :Luces_Bienvenida, :Asiento_Acompanante_Ajuste_Altura, :Cargador_Inalambrico_Celular, :Panel_Instrumentos_Lujo, :Pantalla_Panoramica, :Pantalla_Panoramica_Interior_10_25_Pulgadas, :Pantalla_CID_Display_10_7_Pulgadas, :Sistema_Altavoces_Stereo_6_Altavoces, :Tapiceria_Cuero_Vegano_Veganza_Perforated, :BMW_Live_Cockpit_Professional)",
            {
                replacements: { VehiculoID, Control_Crucero_Frenado, Preparacion_Apple_CarPlay, Alfombras_Velours, Asientos_Traseros_Abatibles, Boton_Arranque_Encendido, Retrovisor_Interior_Ajuste_Automatico, Volante_Multifuncion, Aire_Acondicionado_Regulacion_Zonas, Reglaje_Electrico_Asientos_Conductor_Memoria, Computadora_Abordo, Apoya_Cabezas_Traseros, Molduras_Interiores_Negras, Paquete_Compartimentos, Asientos_Deportivos_Conductor_Acompanante, Vidrios_Electricos_Apertura_Cierre_Automatico, Apoyabrazos_Delantero, Toma_Corriente_12V, Access_Comfort, Interfaz_USB, IDrive_Controller, Luces_Bienvenida, Asiento_Acompanante_Ajuste_Altura, Cargador_Inalambrico_Celular, Panel_Instrumentos_Lujo, Pantalla_Panoramica, Pantalla_Panoramica_Interior_10_25_Pulgadas, Pantalla_CID_Display_10_7_Pulgadas, Sistema_Altavoces_Stereo_6_Altavoces, Tapiceria_Cuero_Vegano_Veganza_Perforated, BMW_Live_Cockpit_Professional },
                type: sequelize.QueryTypes.INSERT
            });

            if(result){
                res.status(201).json({ message: "Interior creado" });
            } else {
                res.status(400).json({ message: "Error al crear interior" });
            }
        } catch (error) {
            console.error("Error al crear interior:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    actualizarInterior: async (req, res) => {
        const { InteriorID } = req.params;
        const { VehiculoID, Control_Crucero_Frenado, Preparacion_Apple_CarPlay, Alfombras_Velours, Asientos_Traseros_Abatibles, Boton_Arranque_Encendido, Retrovisor_Interior_Ajuste_Automatico, Volante_Multifuncion, Aire_Acondicionado_Regulacion_Zonas, Reglaje_Electrico_Asientos_Conductor_Memoria, Computadora_Abordo, Apoya_Cabezas_Traseros, Molduras_Interiores_Negras, Paquete_Compartimentos, Asientos_Deportivos_Conductor_Acompanante, Vidrios_Electricos_Apertura_Cierre_Automatico, Apoyabrazos_Delantero, Toma_Corriente_12V, Access_Comfort, Interfaz_USB, IDrive_Controller, Luces_Bienvenida, Asiento_Acompanante_Ajuste_Altura, Cargador_Inalambrico_Celular, Panel_Instrumentos_Lujo, Pantalla_Panoramica, Pantalla_Panoramica_Interior_10_25_Pulgadas, Pantalla_CID_Display_10_7_Pulgadas, Sistema_Altavoces_Stereo_6_Altavoces, Tapiceria_Cuero_Vegano_Veganza_Perforated, BMW_Live_Cockpit_Professional } = req.body;
        try {
            await sequelize.query("UPDATE Interior SET VehiculoID = :VehiculoID, Control_Crucero_Frenado = :Control_Crucero_Frenado, Preparacion_Apple_CarPlay = :Preparacion_Apple_CarPlay, Alfombras_Velours = :Alfombras_Velours, Asientos_Traseros_Abatibles = :Asientos_Traseros_Abatibles, Boton_Arranque_Encendido = :Boton_Arranque_Encendido, Retrovisor_Interior_Ajuste_Automatico = :Retrovisor_Interior_Ajuste_Automatico, Volante_Multifuncion = :Volante_Multifuncion, Aire_Acondicionado_Regulacion_Zonas = :Aire_Acondicionado_Regulacion_Zonas, Reglaje_Electrico_Asientos_Conductor_Memoria = :Reglaje_Electrico_Asientos_Conductor_Memoria, Computadora_Abordo = :Computadora_Abordo, Apoya_Cabezas_Traseros = :Apoya_Cabezas_Traseros, Molduras_Interiores_Negras = :Molduras_Interiores_Negras, Paquete_Compartimentos = :Paquete_Compartimentos, Asientos_Deportivos_Conductor_Acompanante = :Asientos_Deportivos_Conductor_Acompanante, Vidrios_Electricos_Apertura_Cierre_Automatico = :Vidrios_Electricos_Apertura_Cierre_Automatico, Apoyabrazos_Delantero = :Apoyabrazos_Delantero, Toma_Corriente_12V = :Toma_Corriente_12V, Access_Comfort = :Access_Comfort, Interfaz_USB = :Interfaz_USB, IDrive_Controller = :IDrive_Controller, Luces_Bienvenida = :Luces_Bienvenida, Asiento_Acompanante_Ajuste_Altura = :Asiento_Acompanante_Ajuste_Altura, Cargador_Inalambrico_Celular = :Cargador_Inalambrico_Celular, Panel_Instrumentos_Lujo = :Panel_Instrumentos_Lujo, Pantalla_Panoramica = :Pantalla_Panoramica, Pantalla_Panoramica_Interior_10_25_Pulgadas = :Pantalla_Panoramica_Interior_10_25_Pulgadas, Pantalla_CID_Display_10_7_Pulgadas = :Pantalla_CID_Display_10_7_Pulgadas, Sistema_Altavoces_Stereo_6_Altavoces = :Sistema_Altavoces_Stereo_6_Altavoces, Tapiceria_Cuero_Vegano_Veganza_Perforated = :Tapiceria_Cuero_Vegano_Veganza_Perforated, BMW_Live_Cockpit_Professional = :BMW_Live_Cockpit_Professional WHERE InteriorID = :InteriorID",
            {
                replacements: { InteriorID, VehiculoID, Control_Crucero_Frenado, Preparacion_Apple_CarPlay, Alfombras_Velours, Asientos_Traseros_Abatibles, Boton_Arranque_Encendido, Retrovisor_Interior_Ajuste_Automatico, Volante_Multifuncion, Aire_Acondicionado_Regulacion_Zonas, Reglaje_Electrico_Asientos_Conductor_Memoria, Computadora_Abordo, Apoya_Cabezas_Traseros, Molduras_Interiores_Negras, Paquete_Compartimentos, Asientos_Deportivos_Conductor_Acompanante, Vidrios_Electricos_Apertura_Cierre_Automatico, Apoyabrazos_Delantero, Toma_Corriente_12V, Access_Comfort, Interfaz_USB, IDrive_Controller, Luces_Bienvenida, Asiento_Acompanante_Ajuste_Altura, Cargador_Inalambrico_Celular, Panel_Instrumentos_Lujo, Pantalla_Panoramica, Pantalla_Panoramica_Interior_10_25_Pulgadas, Pantalla_CID_Display_10_7_Pulgadas, Sistema_Altavoces_Stereo_6_Altavoces, Tapiceria_Cuero_Vegano_Veganza_Perforated, BMW_Live_Cockpit_Professional },
                type: sequelize.QueryTypes.UPDATE
            });
            res.status(201).json({ message: "Interior actualizado correctamente"});           
        } catch (error) {
            console.error("Error al actualizar interior:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    eliminarInterior: async (req, res) => {
        const { InteriorID } = req.params;
        try {
            await sequelize.query("DELETE FROM Interior WHERE InteriorID = :InteriorID",
            {
                replacements: { InteriorID },
                type: sequelize.QueryTypes.DELETE
            });
            res.status(200).json({ message: "Interior eliminado correctamente"});
        } catch (error) {
            console.error("Error al eliminar interior:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
};

export default interiorController;