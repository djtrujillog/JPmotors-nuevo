import { DataTypes } from 'sequelize';
import sequelize from '../config/config.mjs';

const Marca = sequelize.define('Marca', {
    MarcaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,        
    },
    NombreMarca: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }    
},{
    timestamps: false,
    tableName: 'Marca',
});

export default Marca;