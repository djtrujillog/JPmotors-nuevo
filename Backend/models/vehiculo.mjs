import { DataType } from "sequelize";
import sequelize from "../config/config.mjs";

const Vehiculo = sequelize.define('Vehiculo', {
    VehiculoID: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Modelo: {
        type: DataType.STRING(100),
        allowNull: false,
    },
    Marca: {
        type: DataType.STRING(100),
        allowNull: false,
    },
    Anio: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    PrecioGerente: {
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    },
    PresioWeb: {
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    },
    PrecioLista: {
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    },
    Imagen: {
        type: DataType.STRING(100),
        allowNull: false,
    },
    MarcaID: {
        type: DataType.INTEGER,
        allowNull: false,
    },
},{
    timestamps: false,
    tableName: 'Vehiculos',
});

export default Vehiculo;