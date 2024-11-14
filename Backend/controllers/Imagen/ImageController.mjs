// ImageController.mjs
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageController = {
  // Método para subir una imagen
  uploadImage: async (req, res) => {
    try {
      // Log para verificar el archivo recibido
      console.log("Archivo recibido en req.file:", req.file);
      console.log("Carpeta destino:", path.join(__dirname, '../../images'));

      // Si no se recibe ningún archivo
      if (!req.file) {
        return res.status(400).json({ message: 'No se ha cargado ninguna imagen' });
      }

      const imageUrl = `http://localhost:4000/image/${req.file.filename}`;
      res.status(201).json({ message: 'Imagen subida con éxito', imageUrl });
    } catch (error) {
      // Error específico si la carpeta no existe
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
};

export default imageController;
