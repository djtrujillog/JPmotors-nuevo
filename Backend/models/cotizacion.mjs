import { DataTypes } from "sequelize";
import sequelize from "../config/config.mjs";

const Cotizacion = sequelize.define('Cotizaciones', {
    CotizacionID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    EmpleadoID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ClienteID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    VehiculoID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    FechaCotizacion: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    EstadoCotizacion: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    FechaSeguimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: 'Cotizaciones',
});

export default Cotizacion;