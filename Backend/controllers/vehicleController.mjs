import express from "express";
import multer from "multer";
import sequelize from "../config/config.mjs";
import { connectFTP, uploadFile } from '../controllers/ftpClient.mjs';

const vehiculosRouter = express.Router();
vehiculosRouter.use(express.urlencoded({ extended: true }));
vehiculosRouter.use(express.json());

// Configuración de Multer para almacenar en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const vehiculoController = {
  getVehiculos: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT * FROM Vehiculos", {
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay vehículos" });
      }
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculoMotor: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL GetMotorDescription(:id)", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      });

      //console.log(result); // Registro para depuración

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }

      // El primer elemento del array 'result' contiene las descripciones
      const descriptionsObject = result[0];

      // Extraer las descripciones del objeto
      const motorDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Motor: motorDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Seguridad detalle
  getVehiculoSeguridad: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL GetSeguridadDescription(:id)", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      });
      //console.log(result); // Registro para depuración
      if (result.length === 0) {
        res.status(404).send("Detalles no encontrados");
        return;
      }
      // El primer elemento del array 'result' contiene las descripciones
      const descriptionsObject = result[0];

      // Extraer las descripciones del objeto
      const seguridadDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Seguridad: seguridadDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Interior detalle
  getVehiculoInterior: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL GetInteriorDescription(:id)", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }

      // El primer elemento del array 'result' contiene las descripciones
      const descriptionsObject = result[0];

      // Extraer las descripciones del objeto
      const interiorDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Interior: interiorDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Exterior detalle
  getVehiculoExterior: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL GetExteriorDescription(:id)", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }
      // El primer elemento del array 'result' contiene las descripciones
      const descriptionsObject = result[0];

      // Extraer las descripciones del objeto
      const exteriorDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Exterior: exteriorDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Dimensiones detalle
  getVehiculoDimensiones: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query(
        "CALL GetDimensionesDescription(:id)",
        {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }
      // El primer elemento del array 'result' contiene las descripciones
      const descriptionsObject = result[0];

      // Extraer las descripciones del objeto
      const dimensionesDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Dimensiones: dimensionesDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculosPorMarca: async (req, res) => {
    try {
      const { marca } = req.query;
      let result = [];
      if (marca === "all") {
        result = await sequelize.query("SELECT * FROM Vehiculos", {
          type: sequelize.QueryTypes.SELECT,
        });
      } else {
        result = await sequelize.query(
          `SELECT V.VehiculoID, V.Modelo, V.Marca, V.Anio, V.PrecioGerente, 
          V.PrecioWeb, V.PrecioLista, V.Imagen, V.MarcaID 
          FROM Vehiculos V 
          INNER JOIN Marca M ON V.MarcaID = M.MarcaID 
          WHERE M.MarcaID = :marca`,
          { replacements: { marca }, type: sequelize.QueryTypes.SELECT }
        );
      }
      if (result.length > 0) {
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
      const result = await sequelize.query(
        "SELECT * FROM Vehiculos WHERE VehiculoID = :id",
        {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }
      res.json(result[0]);
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Actualizar un vehículo existente
  put: async (req, res) => {
    const { Modelo, Marca, Anio, PrecioGerente, PrecioWeb, PrecioLista, MarcaID, Condicion } = req.body;
    const { id } = req.params;

    try {
      let imagen = null;

      if (req.file) {
        imagen = req.file.originalname;

        // Conecta al servidor FTP y sube el archivo
        await connectFTP();
        await uploadFile(imagen, req.file.buffer);
      }

      // Construir la consulta SQL para actualizar el vehículo
      const query = `
        UPDATE Vehiculos 
        SET Modelo = ?, Marca = ?, Anio = ?, PrecioGerente = ?, PrecioWeb = ?, PrecioLista = ?, MarcaID = ?, Condicion = ?, Imagen = ?
        WHERE VehiculoID = ?
      `;

      const result = await sequelize.query(query, {
        replacements: [Modelo, Marca, Anio, PrecioGerente, PrecioWeb, PrecioLista, MarcaID, Condicion, imagen, id],
        type: sequelize.QueryTypes.UPDATE,
      });

      if (result[1] > 0) {
        res.json({ message: "Vehículo actualizado con éxito" });
      } else {
        res.status(404).json({ message: `No se encontró ningún vehículo con ID ${id}` });
      }
    } catch (error) {
      console.error("Error al actualizar vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // METODO PARA AGREGAR VEHICULO A LA BD
  post: async (req, res) => {
    const { Modelo, Marca, Anio, PrecioGerente, PrecioWeb, PrecioLista, MarcaID } = req.body;
    const Imagen = req.file ? req.file.originalname : null;

    try {
      // Conecta al servidor FTP y sube el archivo
      if (req.file) {
        await connectFTP();
        await uploadFile(Imagen, req.file.buffer);
      }

      const query = `
        INSERT INTO Vehiculos (Modelo, Marca, Anio, PrecioGerente, PrecioWeb, PrecioLista, MarcaID, Imagen, Condicion) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const result = await sequelize.query(query, {
        replacements: [Modelo, Marca, Anio, PrecioGerente, PrecioWeb, PrecioLista, MarcaID, Imagen, req.body.Condicion],
        type: sequelize.QueryTypes.INSERT,
      });

      res.json({
        message: "Vehiculo agregado con éxito",
        vehiculo: {
          Modelo,
          Marca,
          Anio,
          PrecioGerente,
          PrecioWeb,
          PrecioLista,
          MarcaID,
          Imagen
        },
      });
    } catch (error) {
      console.error("Error al agregar vehiculo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  delete: async (req, res) => {
    const { VehiculoID } = req.params;
  
    if (!VehiculoID) {
      return res.status(400).json({ message: "VehículoID no proporcionado" });
    }
  
    try {
      // Consulta SQL directa para verificar la existencia del registro
      const [existingVehicle] = await sequelize.query(
        'SELECT * FROM Vehiculos WHERE VehiculoID = :VehiculoID',
        {
          replacements: { VehiculoID },
          type: sequelize.QueryTypes.SELECT,
        }
      );
  
      if (!existingVehicle) {
        return res.status(404).json({ message: `No se encontró ningún vehículo con VehiculoID ${VehiculoID}` });
      }
  
      // Procede con la eliminación si el vehículo existe
      const result = await sequelize.query(
        'DELETE FROM Vehiculos WHERE VehiculoID = :VehiculoID',
        {
          replacements: { VehiculoID },
          type: sequelize.QueryTypes.DELETE,
        }
      );
  
      // Imprimir el resultado para verificar su estructura
      console.log('Resultado de la consulta DELETE:', result);
  
      // Verificar si el vehículo fue eliminado
      if (result && result[0] && result[0].affectedRows === 0) {
        res.status(404).json({ message: `No se encontró ningún vehículo con VehiculoID ${VehiculoID}` });
      } else {
        res.json({ message: "Vehículo eliminado con éxito" });
      }
    } catch (error) {
      console.error("Error al eliminar el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
  

  // Código de Wlickez
  /*
  post: async (req, res) => {
    // Extraer la información del vehículo desde la solicitud
    const { Modelo, Marca, Anio, PrecioGerente, PrecioWeb, PrecioLista, MarcaID } =
      req.body;

    // Obtener la imagen del cuerpo de la solicitud
    const Imagen = req.file ? req.file.filename : null;

    try {
      // Insertar el vehículo en la base de datos

      var query = "INSERT INTO Vehiculos (Modelo, Marca, Anio, PrecioGerente, PrecioWeb, PrecioLista, MarcaID, Imagen, Condicion) VALUES (" + req.body.Modelo + ", '" + req.body.Marca + "', " + req.body.Anio + ", " + req.body.PrecioGerente + "," + req.body.PrecioWeb + "," + req.body.PrecioLista + "," + req.body.MarcaID + ",'" + req.body.Imagen + "', '" + req.body.Condicion + "')";
      console.log(query);
      const result = await sequelize.query(query, {
        type: sequelize.QueryTypes.INSERT
      });

      // Enviar una respuesta exitosa al cliente
      res.json({
        message: "Vehiculo agregado con éxito",
        vehiculo: {
          // VehiculoID: result.insertId,
          Modelo,
          Marca,
          Anio,
          PrecioGerente,
          PrecioWeb,
          PrecioLista,
          MarcaID,
          Imagen
        },
      });
    } catch (error) {
      console.error("Error al agregar vehiculo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
  */
};

export default vehiculoController;
