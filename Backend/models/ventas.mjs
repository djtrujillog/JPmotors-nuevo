import { DataType } from "sequelize";
import sequelize from "../config/config.mjs";

const Venta = sequelize.define('Venta', {
    VentaID: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    ClienteID: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    VehiculoID: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    EmpleadoID: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    FechaVenta: {
        type: DataType.DATE,
        allowNull: false,
    },
    PrecioVenta: {
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'Ventas',
});

export default Venta;