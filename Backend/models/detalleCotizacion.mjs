import { DataTypes } from "sequelize";
import sequelize from "../config/config.mjs";

const DetalleCotizacion = sequelize.define('DetalleCotizaciones', {
    DetalleCotizacionID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    CotizacionID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    VehiculoID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    timestamps: false,
    tableName: 'DetalleCotizaciones',
});

export default DetalleCotizacion;