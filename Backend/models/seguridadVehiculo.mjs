import { DataType } from sequelize
import sequelize from "../config/config.mjs";

const SeguridadVehiculo = sequelize.define('SeguridadVehiculo', {
    SeguridadID: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    VehiculoID: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    Asistente_Manejo: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Frenos_Ventilados: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Airbags_Laterales: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Cierre_Central: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Dispositivo_Alarma: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Interruptor_Bateria: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Rueda_Repuesto: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Botiquin_Primeros_Auxilios: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Barras_Proteccion_Lateral: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Llanta_Repuesto: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Control_Dinamico_Estabilidad: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Sistema_ABS: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Sensor_Colision: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Reposacabezas_Regulables: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Control_Airbags: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Performance_Control: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Union_ISOFIX: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Pernos_Antirobo: {
        type: DataType.STRING(200),
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'SeguridadVehiculo',
});

export default SeguridadVehiculo;