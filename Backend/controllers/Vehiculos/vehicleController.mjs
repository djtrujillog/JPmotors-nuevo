//vehicleController.mjs

import path from 'path';
import { promises as fs } from 'fs'; // Importa fs/promises
import sequelize from "../../config/config.mjs";
import { fileURLToPath } from 'url'; // Necesario para obtener __dirname en ES Modules

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//obtener vehiculos
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
//obtener imagenes

  getImagen: (req, res) => {
    const { nombreImagen } = req.params;
    const imagenPath = path.join(__dirname, '../../images', nombreImagen);

    res.sendFile(imagenPath, (err) => {
      if (err) {
        console.error("Error al enviar la imagen:", err);
        res.status(404).json({ message: 'Imagen no encontrada' });
      }
    });
  },

  getVehiculosNuevos: async (req, res) => {
    try {
      // Consulta para obtener los datos de los vehículos
      const result = await sequelize.query("SELECT VehiculoID, Modelo, Marca, Anio, PrecioGerente, PrecioWeb, PrecioLista, ImagenUrl, MarcaID, Condicion, Estado FROM Vehiculos v WHERE Condicion = 'Nuevo' AND Estado ='Activo'", {
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length > 0) {
        const vehiculosConImagenes = await Promise.all(result.map(async (vehiculo) => {
          try {
            // Construir la ruta completa de la imagen
            const imagenPath = path.join(__dirname, '../../images', `${vehiculo.VehiculoID}.jpg`);
            
            // Verificar si la imagen existe y leerla en base64
            try {
              await fs.access(imagenPath);
              const imagenBase64 = await fs.readFile(imagenPath, { encoding: 'base64' });
              vehiculo.ImagenBase64 = `data:image/jpeg;base64,${imagenBase64}`;
            } catch (error) {
              vehiculo.ImagenBase64 = null; // Si la imagen no existe, asignar null
            }
          } catch (error) {
            console.error(`Error al leer la imagen para el vehículo ${vehiculo.VehiculoID}:`, error);
            vehiculo.ImagenBase64 = null;
          }

          return vehiculo;
        }));

        res.status(200).json(vehiculosConImagenes);
      } else {
        res.status(404).json({ message: "No hay vehículos nuevos" });
      }
    } catch (error) {
      console.error("Error al obtener vehículos nuevos:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
  
  getVehiculosUsados: async (req, res) => {
    try {
      const result = await sequelize.query(
        "SELECT VehiculoID, Modelo, Marca, Anio, PrecioGerente, PrecioWeb, PrecioLista, ImagenUrl, MarcaID, Condicion, Estado FROM Vehiculos v WHERE Condicion = 'Usado' AND Estado ='Activo'", 
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
  
      if (result.length > 0) {
        const vehiculosConImagenes = await Promise.all(result.map(async (vehiculo) => {
          try {
            // Extraer el nombre del archivo desde ImagenUrl
            const nombreImagen = vehiculo.ImagenUrl.split('/').pop();
            const imagenPath = path.join(__dirname, '../../images', nombreImagen);
  
            console.log('Ruta de la imagen:', imagenPath); // Debugging: Verificar la ruta
  
            // Verificar si la imagen existe
            await fs.access(imagenPath);
            console.log(`Imagen encontrada para el vehículo ${vehiculo.VehiculoID}`); // Debugging
  
            // Leer la imagen en base64
            const imagenBase64 = await fs.readFile(imagenPath, { encoding: 'base64' });
            vehiculo.ImagenBase64 = `data:image/jpeg;base64,${imagenBase64}`;
          } catch (error) {
            console.log(`Imagen no encontrada para el vehículo ${vehiculo.VehiculoID}:`, error); // Debugging
            vehiculo.ImagenBase64 = null; // Si la imagen no existe, asignar null
          }
  
          return vehiculo;
        }));
  
        res.status(200).json(vehiculosConImagenes);
      } else {
        res.status(404).json({ message: "No hay vehículos usados" });
      }
    } catch (error) {
      console.error("Error al obtener vehículos usados:", error);
      res.status(500).send("Error interno del servidor");
    }
  },


  
  // Backend - Cambios en el endpoint getVehiculos
getPaginar: async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const result = await sequelize.query(
      "SELECT * FROM Vehiculos LIMIT :limit OFFSET :offset",
      {
        replacements: { limit: parseInt(limit), offset: parseInt(offset) },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (result.length > 0) {
      // Opcionalmente, contar el total de vehículos
      const total = await sequelize.query("SELECT COUNT(*) as count FROM Vehiculos", {
        type: sequelize.QueryTypes.SELECT,
      });
      
      res.status(200).json({
        data: result,
        total: total[0].count,
        page: parseInt(page),
        limit: parseInt(limit)
      });
    } else {
      res.status(404).json({ message: "No hay vehículos" });
    }
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    res.status(500).send("Error interno del servidor");
  }
},


  getVehiculosNombre: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT VehiculoID,Modelo,Marca,Anio,PrecioGerente,PrecioWeb, PrecioLista, MarcaID FROM Vehiculos", {
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

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }

      const descriptionsObject = result[0];
      const motorDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Motor: motorDescriptions });
    } catch (error) {
      console.error("Error al obtener el los datos del motor:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculoSeguridad: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL GetSeguridadDescription(:id)", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length === 0) {
        res.status(404).send("Detalles no encontrados");
        return;
      }

      const descriptionsObject = result[0];
      const seguridadDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Seguridad: seguridadDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

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

      const descriptionsObject = result[0];
      const interiorDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Interior: interiorDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

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

      const descriptionsObject = result[0];
      const exteriorDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Exterior: exteriorDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

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

      const descriptionsObject = result[0];
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
        res.status(404).json({ message: "No se encontraron vehículos para esta marca" });
      }
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
//obtener vehiculo por ID
    // Obtener vehículo específico por ID
    getVehiculoPorID: async (req, res) => {
      const { id } = req.params;
    
      try {
        const result = await sequelize.query(
          "SELECT VehiculoID, Modelo, Marca, Anio, PrecioGerente, PrecioWeb, PrecioLista, ImagenUrl, MarcaID, Condicion, Estado FROM Vehiculos WHERE VehiculoID = :id AND Estado = 'Activo'",
          { replacements: { id }, type: sequelize.QueryTypes.SELECT }
        );
  
        if (result.length === 0) {
          return res.status(404).send("Vehículo no encontrado");
        }
  
        const vehiculo = result[0];
        const imagenPath = path.join(__dirname, '../../images', `${vehiculo.VehiculoID}.jpg`);
  
        try {
          await fs.access(imagenPath);
          const imagenBase64 = await fs.readFile(imagenPath, { encoding: 'base64' });
          vehiculo.ImagenBase64 = `data:image/jpeg;base64,${imagenBase64}`;
        } catch {
          vehiculo.ImagenBase64 = null;
        }
  
        res.json(vehiculo);
      } catch (error) {
        console.error("Error al obtener el vehículo por ID:", error);
        res.status(500).send("Error interno del servidor");
      }
    },
  

    post: async (req, res) => {
      try {
        const { body } = req;
        const imagenUrl = `https://cotizaciones-jpmotors.onrender.com/${Date.now()}.jpg`; // URL ficticia para el ejemplo
  
        const result = await sequelize.query(
          `INSERT INTO Vehiculos (Modelo, Marca, Anio, PrecioGerente, PrecioWeb, PrecioLista, ImagenUrl, MarcaID, Condicion, Estado)
          VALUES (:Modelo, :Marca, :Anio, :PrecioGerente, :PrecioWeb, :PrecioLista, :ImagenUrl, :MarcaID, :Condicion, :Estado)`,
          {
            replacements: {
              Modelo: body.Modelo,
              Marca: body.Marca,
              Anio: body.Anio,
              PrecioGerente: body.PrecioGerente,
              PrecioWeb: body.PrecioWeb,
              PrecioLista: body.PrecioLista,
              ImagenUrl: imagenUrl,
              MarcaID: body.MarcaID,
              Condicion: body.Condicion,
              Estado: body.Estado,
            },
          }
        );
  
        res.status(201).json({ message: 'Vehículo creado con éxito', id: result[0], imagenUrl });
      } catch (error) {
        console.error('Error al crear vehículo:', error);
        res.status(500).send('Error interno del servidor');
      }
    },

    put: async (req, res) => {
      try {
        const { id } = req.params;
        const { body } = req;
        let imagenUrl = null;
  
        // Convertir Base64 a imagen si se proporciona
        if (body.ImagenBase64) {
          const imagenBuffer = Buffer.from(body.ImagenBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
          const imagenPath = path.join(__dirname, '../../images', `${id}.jpg`);
  
          await fs.writeFile(imagenPath, imagenBuffer);
          imagenUrl = `images/${path.basename(imagenPath)}`;
        }
  
        const result = await sequelize.query(
          `UPDATE Vehiculos SET 
            Modelo = :Modelo, 
            Marca = :Marca, 
            Anio = :Anio, 
            PrecioGerente = :PrecioGerente, 
            PrecioWeb = :PrecioWeb, 
            PrecioLista = :PrecioLista, 
            ImagenUrl = IFNULL(:ImagenUrl, ImagenUrl), 
            MarcaID = :MarcaID,
            Condicion = :Condicion,
            Estado = :Estado
          WHERE VehiculoID = :id`,
          {
            replacements: {
              Modelo: body.Modelo,
              Marca: body.Marca,
              Anio: body.Anio,
              PrecioGerente: body.PrecioGerente,
              PrecioWeb: body.PrecioWeb,
              PrecioLista: body.PrecioLista,
              ImagenUrl: imagenUrl,
              MarcaID: body.MarcaID,
              id: id,
              Condicion: body.Condicion,
              Estado: body.Estado
            },
          }
        );
  
        res.json({ message: "Vehículo actualizado con éxito" });
      } catch (error) {
        console.error("Error al actualizar vehículo:", error);
        res.status(500).send("Error interno del servidor");
      }
    },

  delete: async (req, res) => {
    try {
      const { VehiculoID } = req.params;
      await sequelize.query("DELETE FROM Vehiculos WHERE VehiculoID = :VehiculoID", {
        replacements: { VehiculoID },
      });

      res.status(200).json({ message: "Vehículo eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
};

export default vehiculoController;
