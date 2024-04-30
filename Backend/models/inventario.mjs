import { DataType } from "sequelize";
import sequelize from "../config/config.mjs";

const Inventario = sequelize.define('Inventario', {
    InventarioID: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    VehiculoID: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    CantidadStock: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    Ubicacion: {
        type: DataType.STRING(200),
        allowNull: false,
    }
},{
    timestamps: false,
    tableName: 'Inventario',
});

export default Inventario;