import { DataType } from "sequelize";
import sequelize from "../config/config.mjs";

const Garantia = sequelize.define('Garantia', {
    GarantiaID: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    VehiculoID: {
        type: DataType.INTEGER,        
        allowNull: false,
    },
    Duracion : {
        type: DataType.STRING(50),
        allowNull: false,
    },
    Condiciones: {
        type: DataType.STRING(200),
        allowNull: false,
    },    
},{
    timestamps: false,
    tableName: 'Garantia',
});

export default Garantia;