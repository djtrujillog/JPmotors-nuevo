import { DataType } from "sequelize";
import sequelize from "../config/config.mjs";

const DetalleVenta = sequelize.define('DetalleVenta', {
    DetalleVentaID: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    VentaID: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    VehiculoID: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    Cantidad: {
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'DetalleVentas',
});

export default DetalleVenta;