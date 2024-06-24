import express from "express";
import multer from "multer";
import { connectFTP, uploadFile } from './ftpClient.mjs';  // Importa la función uploadFile para subir archivos al FTP
import sequelize from "../config/config.mjs";

const vehiculosRouter = express.Router();
vehiculosRouter.use(express.urlencoded({ extended: true }));
vehiculosRouter.use(express.json());

// Almacena los archivos en memoria en lugar de en disco
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const vehiculoController = {
  post: [upload.single('imagen'), async (req, res) => {
    // Extraer la información del vehículo desde la solicitud
    const { Modelo, Marca, Anio, PrecioGerente, PresioWeb, PrecioLista, MarcaID, Condicion } = req.body;

    // Obtener la imagen del cuerpo de la solicitud
    const Imagen = req.file ? `${Date.now()}-${req.file.originalname}` : null;
    
    try {
      // Insertar el vehículo en la base de datos
      const query = `
        INSERT INTO Vehiculos (Modelo, Marca, Anio, PrecioGerente, PresioWeb, PrecioLista, MarcaID, Imagen, Condicion) 
        VALUES ('${Modelo}', '${Marca}', ${Anio}, ${PrecioGerente}, ${PresioWeb}, ${PrecioLista}, ${MarcaID}, '${Imagen}', '${Condicion}')
      `;
      console.log(query);
      const result = await sequelize.query(query, {
        type: sequelize.QueryTypes.INSERT
      });

      // Subir la imagen al servidor FTP
      if (req.file) {
        await uploadFile(Imagen, req.file.buffer);
      }

      // Enviar una respuesta exitosa al cliente
      res.json({
        message: "Vehiculo agregado con éxito",
        vehiculo: {
          Modelo,
          Marca,
          Anio,
          PrecioGerente,
          PresioWeb,
          PrecioLista,
          MarcaID,
          Imagen
        },
      });
    } catch (error) {
      console.error("Error al agregar vehiculo:", error);
      res.status(500).send("Error interno del servidor");
    }
  }],
  getVehiculos: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT * FROM Vehiculos",
      {
        type: sequelize.QueryTypes.SELECT
      });

      if(result.length > 0){
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay vehículos" });
      }      
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculoMotorDetalle : async (req, res) => {
      try {
        const { id } = req.params;
        const result = await sequelize.query("CALL GetMotorDescription(:id);", 
        {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT
        });
        
        if (result.length === 0) {
          res.status(404).send("Vehiculo no encontrado");
          return;
        }
        // Ajustar la respuesta para enviar solo el objeto del vehículo
        console.log(result);
        res.json(result[0][0]);
      } catch (error) {
        console.error("Error al obtener el Vehiculo:", error);
        res.status(500).send("Error interno del servidor");
      }
  },
  getVehiculoSeguridadDetalle : async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL GetSeguridadDescription(:id);", 
      {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT
      });
      
      if (result.length === 0) {
        res.status(404).send("Vehiculo no encontrado");
        return;
      }
      // Ajustar la respuesta para enviar solo el objeto del vehículo
      console.log(result);
      res.json(result[0][0]);
    } catch (error) {
      console.error("Error al obtener el Vehiculo:", error);
      res.status(500).send("Error interno del servidor");
    }
},
getVehiculoInteriorDetalle : async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sequelize.query("CALL GetInteriorDescription(:id);", 
    {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT
    });
    
    if (result.length === 0) {
      res.status(404).send("Vehiculo no encontrado");
      return;
    }
    // Ajustar la respuesta para enviar solo el objeto del vehículo
    console.log(result);
    res.json(result[0][0]);
  } catch (error) {
    console.error("Error al obtener el Vehiculo:", error);
    res.status(500).send("Error interno del servidor");
  }
},
getVehiculoExteriorDetalle : async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sequelize.query("CALL GetExteriorDescription(:id);", 
    {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT
    });
    
    if (result.length === 0) {
      res.status(404).send("Vehiculo no encontrado");
      return;
    }
    // Ajustar la respuesta para enviar solo el objeto del vehículo
    console.log(result);
    res.json(result[0][0]);
  } catch (error) {
    console.error("Error al obtener el Vehiculo:", error);
    res.status(500).send("Error interno del servidor");
  }
},
getVehiculoDimensionesrDetalle : async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sequelize.query("CALL GetDimensionesDescription(:id);", 
    {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT
    });
    
    if (result.length === 0) {
      res.status(404).send("Vehiculo no encontrado");
      return;
    }
    // Ajustar la respuesta para enviar solo el objeto del vehículo
    console.log(result);
    res.json(result[0][0]);
  } catch (error) {
    console.error("Error al obtener el Vehiculo:", error);
    res.status(500).send("Error interno del servidor");
  }
},
  getVehiculosPorMarca: async (req, res) => {
    try {
        const { marca } = req.query;
        console.log(req);
        let result = [];
        if( marca == 'all'){
            result = await sequelize.query("SELECT * FROM Vehiculos",{
                type: sequelize.QueryTypes.SELECT
            });                
        } else {
            result = await sequelize.query("SELECT V.VehiculoID, V.Modelo, V.Marca, V.Anio, V.PrecioGerente, V.PresioWeb, V.PrecioLista, V.Imagen, V.MarcaID FROM Vehiculos V INNER JOIN Marca M ON V.MarcaID = M.MarcaID WHERE M.MarcaID = :marca",{
                replacements: { marca },
                type: sequelize.QueryTypes.SELECT
            });
        }
        if(result.length > 0){
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "No hay vehículos de esa marca" });
        }
    } catch (error) {
        console.error("Error al obtener los vehículos de la marca:", error);
        res.status(500).send("Error interno del servidor");
    }
  },
  getVehiculoPorID: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("SELECT * FROM Vehiculos WHERE VehiculoID = :id",
      {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT
      });
      
      if (result.length === 0) {
        res.status(404).send("Vehiculo no encontrado");
        return;
      }
      res.json(result[0]);
    } catch (error) {
      console.error("Error al obtener el Vehiculo:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
}

export default vehiculoController;