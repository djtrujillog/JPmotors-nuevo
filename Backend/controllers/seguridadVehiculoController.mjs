import sequelize from "../config/config.mjs";

const seguridadVehiculoController = {
    getSeguridadVehiculos: async (req, res) => {
        try {
            const result = await sequelize.query("SELECT * FROM SeguridadVehiculo",
            {
                type: sequelize.QueryTypes.SELECT
            });
        
            if(result.length > 0){
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "No hay seguridad de vehiculos" });
            }      
        } catch (error) {
            console.error("Error al obtener seguridad de vehiculos:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    crearSeguridadVehiculo: async (req, res) => {
        try {
            const { VehiculoID, Asistente_Manejo, Frenos_Ventilados, Airbags_Laterales, Cierre_Central, Dispositivo_Alarma, Interruptor_Bateria, Rueda_Repuesto, Botiquin_Primeros_Auxilios, Barras_Proteccion_Lateral, Llanta_Repuesto, Control_Dinamico_Estabilidad, Sistema_ABS, Sensor_Colision, Reposacabezas_Regulables, Control_Airbag, Performance_Control, Union_ISOFIX, Pernos_Antirobo } = req.body;
            await sequelize.query("INSERT INTO SeguridadVehiculo (VehiculoID, Asistente_Manejo, Frenos_Ventilados, Airbags_Laterales, Cierre_Central, Dispositivo_Alarma, Interruptor_Bateria, Rueda_Repuesto, Botiquin_Primeros_Auxilios, Barras_Proteccion_Lateral, Llanta_Repuesto, Control_Dinamico_Estabilidad, Sistema_ABS, Sensor_Colision, Reposacabezas_Regulables, Control_Airbag, Performance_Control, Union_ISOFIX, Pernos_Antirobo) VALUES (:VehiculoID, :Asistente_Manejo, :Frenos_Ventilados, :Airbags_Laterales, :Cierre_Central, :Dispositivo_Alarma, :Interruptor_Bateria, :Rueda_Repuesto, :Botiquin_Primeros_Auxilios, :Barras_Proteccion_Lateral, :Llanta_Repuesto, :Control_Dinamico_Estabilidad, :Sistema_ABS, :Sensor_Colision, :Reposacabezas_Regulables, :Control_Airbag, :Performance_Control, :Union_ISOFIX, :Pernos_Antirobo)",
            {
                replacements: { VehiculoID, Asistente_Manejo, Frenos_Ventilados, Airbags_Laterales, Cierre_Central, Dispositivo_Alarma, Interruptor_Bateria, Rueda_Repuesto, Botiquin_Primeros_Auxilios, Barras_Proteccion_Lateral, Llanta_Repuesto, Control_Dinamico_Estabilidad, Sistema_ABS, Sensor_Colision, Reposacabezas_Regulables, Control_Airbag, Performance_Control, Union_ISOFIX, Pernos_Antirobo },
                type: sequelize.QueryTypes.INSERT
            });
            res.status(201).json({ message: "Seguridad de vehiculo creado correctamente"});
        } catch (error) {
            console.log(error);
            console.log("Error al subir la seguridad de vehiculo");
            res.status(500).json("Error interno del servidor");
        }
    },
    actualizarSeguridadVehiculo: async (req, res) => {
        try {
            const { SeguridadVehiculoID } = req.params;
            const { VehiculoID, Asistente_Manejo, Frenos_Ventilados, Airbags_Laterales, Cierre_Central, Dispositivo_Alarma, Interruptor_Bateria, Rueda_Repuesto, Botiquin_Primeros_Auxilios, Barras_Proteccion_Lateral, Llanta_Repuesto, Control_Dinamico_Estabilidad, Sistema_ABS, Sensor_Colision, Reposacabezas_Regulables, Control_Airbag, Performance_Control, Union_ISOFIX, Pernos_Antirobo } = req.body;

            await sequelize.query("UPDATE SeguridadVehiculo SET VehiculoID = :VehiculoID, Asistente_Manejo = :Asistente_Manejo, Frenos_Ventilados = :Frenos_Ventilados, Airbags_Laterales = :Airbags_Laterales, Cierre_Central = :Cierre_Central, Dispositivo_Alarma = :Dispositivo_Alarma, Interruptor_Bateria = :Interruptor_Bateria, Rueda_Repuesto = :Rueda_Repuesto, Botiquin_Primeros_Auxilios = :Botiquin_Primeros_Auxilios, Barras_Proteccion_Lateral = :Barras_Proteccion_Lateral, Llanta_Repuesto = :Llanta_Repuesto, Control_Dinamico_Estabilidad = :Control_Dinamico_Estabilidad, Sistema_ABS = :Sistema_ABS, Sensor_Colision = :Sensor_Colision, Reposacabezas_Regulables = :Reposacabezas_Regulables, Control_Airbag = :Control_Airbag, Performance_Control = :Performance_Control, Union_ISOFIX = :Union_ISOFIX, Pernos_Antirobo = :Pernos_Antirobo WHERE SeguridadID = :SeguridadVehiculoID",
            {
                replacements: { VehiculoID, Asistente_Manejo, Frenos_Ventilados, Airbags_Laterales, Cierre_Central, Dispositivo_Alarma, Interruptor_Bateria, Rueda_Repuesto, Botiquin_Primeros_Auxilios, Barras_Proteccion_Lateral, Llanta_Repuesto, Control_Dinamico_Estabilidad, Sistema_ABS, Sensor_Colision, Reposacabezas_Regulables, Control_Airbag, Performance_Control, Union_ISOFIX, Pernos_Antirobo, SeguridadVehiculoID },
                type: sequelize.QueryTypes.UPDATE
            });
            res.status(200).json({ message: "Seguridad de vehiculo actualizado correctamente"});
        } catch (error) {
            console.log(error);
            console.log("Error al actualizar la seguridad de vehiculo");
            res.status(500).json("Error interno del servidor");
        }
    },
    eliminarSeguridadVehiculo: async (req, res) => {
        try {
            const { SeguridadVehiculoID } = req.params;
            await sequelize.query("DELETE FROM SeguridadVehiculo WHERE SeguridadID = :SeguridadVehiculoID",
            {
                replacements: { SeguridadVehiculoID },
                type: sequelize.QueryTypes.DELETE
            });
            res.status(200).json({ message: "Seguridad de vehiculo eliminado correctamente"});
        } catch (error) {
            console.log("Error al eliminar la seguridad de vehiculo");
            res.status(500).json("Error interno del servidor");
        }
    }
};

export default seguridadVehiculoController;