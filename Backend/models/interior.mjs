import { DataTypes } from "sequelize";
import sequelize from "../config/config.mjs";

const Interior = sequelize.define('Interior', {
    InteriorID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    VehiculoID:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Control_Crucero_Frenado:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Preparacion_Apple_CarPlay:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Alfombras_Velours:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Asientos_Traseros_Abatibles:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Boton_Arranque_Encendido:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Retrovisor_Interior_Ajuste_Automatico:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Volante_Multifuncion:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Aire_Acondicionado_Regulacion_Zonas:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Reglaje_Electrico_Asientos_Conductor_Memoria:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Computadora_Abordo:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Apoya_Cabezas_Traseros:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Molduras_Interiores_Negras:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Paquete_Compartimientos:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Asientos_Deportivos_Conductor_Acompanante:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Vidrios_Electricos_Apertura_Cierre_Automatico:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Apoyabrazos_Delantero:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Toma_Corriente_12V:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Access_Comfort:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Interfaz_USB:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    IDrive_Controller:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Luces_Bienvenida:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Asiento_Acompanante_Ajuste_Altura:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Cargador_Inalambrico_Celular:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Panel_Instrumentos_Lujo:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Pantalla_Panoramica:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Pantalla_Panoramica_Interior_10_25_Pulgadas:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Pantalla_CID_Display_10_7_Pulgadas:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Sistema_Altavoces_Stereo_6_Altavoces:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Tapiceria_Cuero_Vegano_Veganza_Perforated:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    BMW_Live_Cockpit_Professional:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },    
},{
    timestamps: false,
    tableName: 'Interior',
});

export default Interior;