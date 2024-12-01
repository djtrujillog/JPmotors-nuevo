// ImageController.mjs
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import sequelize from '../../config/config.mjs'; // Asegúrate de importar tu configuración de Sequelize

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageController = {
  // Método para subir una imagen
  uploadImage: async (req, res) => {
    try {
      console.log("Archivo recibido en req.file:", req.file);

      if (!req.file) {
        return res.status(400).json({ message: 'No se ha cargado ninguna imagen' });
      }

      const imageUrl = `https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/image/${req.file.filename}`;
      res.status(201).json({ message: 'Imagen subida con éxito', imageUrl });
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error('Error: La carpeta de destino no existe');
        return res.status(500).json({ message: 'Error en la configuración del servidor: La carpeta de destino no existe' });
      }
      console.error('Error al subir la imagen:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  // Método para servir una imagen
  getImage: (req, res) => {
    const { nombreImagen } = req.params;
    const imagenPath = path.join(__dirname, '../../images', nombreImagen);

    res.sendFile(imagenPath, (err) => {
      if (err) {
        console.error('Error al enviar la imagen:', err);
        res.status(404).json({ message: 'Imagen no encontrada' });
      }
    });
  },
  // Método para servir una imagen del carusel

  getCarusel: (req, res) => {
    const { nombreImagen } = req.params;
    const imagenPath = path.join(__dirname, '../../images/carusel', nombreImagen);

    res.sendFile(imagenPath, (err) => {
      if (err) {
        console.error('Error al enviar la imagen:', err);
        res.status(404).json({ message: 'Imagen no encontrada' });
      }
    });
  },

  // Método para eliminar una imagen
  deleteImage: async (req, res) => {
    const { nombreImagen } = req.params;
    const imagenPath = path.join(__dirname, '../../images', nombreImagen);

    try {
      await fs.unlink(imagenPath);
      res.status(200).json({ message: 'Imagen eliminada con éxito' });
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      res.status(404).json({ message: 'Imagen no encontrada o error al eliminarla' });
    }
  },
   // Método para eliminar una imagen de carusel
   deleteImageCarusel: async (req, res) => {
    const { nombreImagen } = req.params;
    const imagenPath = path.join(__dirname, '../../images/carusel', nombreImagen);

    try {
      await fs.unlink(imagenPath);
      res.status(200).json({ message: 'Imagen eliminada de Carusel con éxito' });
    } catch (error) {
      console.error('Error al eliminar la imagen Carusel:', error);
      res.status(404).json({ message: 'Imagen no encontrada o error al eliminarla' });
    }
  },

  // Método para subir una imagen y crear un vehículo
  createVehicleWithImage: async (req, res) => {
    console.log(req.body); // Datos adicionales como Modelo, MarcaID, etc.
  console.log(req.file); // Información del archivo cargado
    try {
      // Verificar si se recibió un archivo
      if (!req.file) {
        return res.status(400).json({ message: 'No se ha cargado ninguna imagen' });
      }
  
      const { body } = req;
  
      // Log para depurar datos
      console.log("Cuerpo del request:", body);
  
      // Verificar si faltan campos requeridos
      const camposRequeridos = [
        'Modelo', 'Marca', 'Anio', 'PrecioGerente', 'PrecioWeb', 'PrecioLista', 'MarcaID', 'Condicion', 'Estado',
      ];
      for (const campo of camposRequeridos) {
        if (!body[campo]) {
          return res.status(400).json({ message: `Falta el campo requerido: ${campo}` });
        }
      }
  
      const imageUrl = `https://jpmotorsgtimg-afa7fve9gmarguep.centralus-01.azurewebsites.net/image/images${req.file.filename}`;
  
      // Insertar los datos del vehículo en la base de datos
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
            ImagenUrl: imageUrl,
            MarcaID: body.MarcaID,
            Condicion: body.Condicion,
            Estado: body.Estado,
          },
        }
      );
  
      res.status(201).json({ 
        message: 'Vehículo creado con éxito', 
        id: result[0], 
        imageUrl 
      });
    } catch (error) {
      console.error('Error al crear vehículo:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  //put

  updateVehicleWithImage: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
  
      // Validar campos requeridos
      const requiredFields = [
        "Modelo",
        "Marca",
        "Anio",
        "PrecioGerente",
        "PrecioWeb",
        "PrecioLista",
        "MarcaID",
        "Condicion",
        "Estado",
      ];
      for (const field of requiredFields) {
        if (!body[field]) {
          return res
            .status(400)
            .json({ message: `Falta el campo requerido: ${field}` });
        }
      }
  
      // Validar existencia del vehículo
      const [vehiculo] = await sequelize.query(
        `SELECT * FROM Vehiculos WHERE VehiculoID = :id`,
        { replacements: { id }, type: sequelize.QueryTypes.SELECT }
      );
      if (!vehiculo) {
        return res.status(404).json({ message: "Vehículo no encontrado" });
      }
  
      // Procesar imagen (si se envía)
      let imageUrl = vehiculo.ImagenUrl;
      if (req.file) {
        // Validar formato del archivo
        const validFormats = ["image/jpeg", "image/png", "image/jpg"];
        if (!validFormats.includes(req.file.mimetype)) {
          return res
            .status(400)
            .json({ message: "Formato de imagen no soportado." });
        }
        imageUrl = `https://cotizaciones-jpmotors.onrender.com/image/images/${req.file.filename}`;
      }
  
      // Actualizar en la base de datos
      const query = `
        UPDATE Vehiculos
        SET Modelo = :Modelo,
            Marca = :Marca,
            Anio = :Anio,
            PrecioGerente = :PrecioGerente,
            PrecioWeb = :PrecioWeb,
            PrecioLista = :PrecioLista,
            ImagenUrl = :ImagenUrl,
            MarcaID = :MarcaID,
            Condicion = :Condicion,
            Estado = :Estado
        WHERE VehiculoID = :id
      `;
      await sequelize.query(query, {
        replacements: {
          id,
          Modelo: body.Modelo,
          Marca: body.Marca,
          Anio: body.Anio,
          PrecioGerente: body.PrecioGerente,
          PrecioWeb: body.PrecioWeb,
          PrecioLista: body.PrecioLista,
          ImagenUrl: imageUrl,
          MarcaID: body.MarcaID,
          Condicion: body.Condicion,
          Estado: body.Estado,
        },
      });
  
      res.status(200).json({
        message: "Vehículo actualizado con éxito",
        vehiculo: { ...body, ImagenUrl: imageUrl },
      });
    } catch (error) {
      console.error("Error al actualizar vehículo:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

    // Método para obtener todas las imágenes disponibles
    getAllImages: async (req, res) => {
      try {
        const imageDir = path.join(__dirname, '../../images/carusel');
        const files = await fs.readdir(imageDir); // Listar todos los archivos del directorio
        
        const baseUrl = 'https://cotizaciones-jpmotors.onrender.com/image/caru';
        const images = files.map(file => ({
          name: file,
          url: `${baseUrl}/${file}`
        }));
  
        res.status(200).json({ message: 'Imágenes obtenidas con éxito', images });
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      }
    },
  

    // Método para obtener todas las imágenes con paginación
getAllImagesPag: async (req, res) => {
  try {
    const imageDir = path.join(__dirname, '../../images/carusel');
    const files = await fs.readdir(imageDir); // Listar todos los archivos del directorio
    
    // Parámetros de paginación desde la consulta
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 10; // Imágenes por página, por defecto 10

    // Calcular el índice inicial y final para la paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Recortar la lista de imágenes según los índices calculados
    const paginatedFiles = files.slice(startIndex, endIndex);

    // Construir URLs para las imágenes seleccionadas
    const baseUrl = 'https://cotizaciones-jpmotors.onrender.com/image/images';
    const images = paginatedFiles.map(file => ({
      name: file,
      url: `${baseUrl}/${file}`
    }));

    // Preparar respuesta con información de la paginación
    const totalPages = Math.ceil(files.length / limit);
    res.status(200).json({
      message: 'Imágenes obtenidas con éxito',
      currentPage: page,
      totalPages,
      totalImages: files.length,
      images
    });
  } catch (error) {
    console.error('Error al obtener las imágenes:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
},



};
  

export default imageController;
