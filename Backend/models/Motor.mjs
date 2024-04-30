import { DataType } from "sequelize";
import sequelize from "../config/config.mjs";

const Motor = sequelize.define('Motor', {
    MotorID: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    VehiculoID: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    Tipo: {
        type: DataType.STRING(100),
        allowNull: false,
    },
    Cilindros: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Cilindrada: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Servotronic: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    TipoMotor: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Combustible: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    DetallesCilindros: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    FuncionEco: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    FuncionAutoStartStop: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    FrenoEstacionamiento: {
        type: DataType.STRING(200),
        allowNull: false,    
    },
    SistemaTraccion: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    CajaCambios: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Hp: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Torque: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Acelaracion0_100: {
        type: DataType.STRING(200),
        allowNull: false,
    },
},{
    timestamps: false,
    tableName: 'Motor',
});

export default Motor;