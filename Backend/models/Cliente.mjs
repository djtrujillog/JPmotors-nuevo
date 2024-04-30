import { DataType } from "sequelize";
import sequelize from "../config/config.mjs";

const Cliente = sequelize.define('Cliente', {
    ClienteID: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Nombre: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Apellido: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Direccion: {
        type: DataType.STRING(200),
        allowNull: false,
    },
    Telefono: {
        type: DataType.STRING(20),
        allowNull: false,
    },
    CorreoElectronico: {
        type: DataType.STRING(200),
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: 'Clientes',
});

export default Cliente;