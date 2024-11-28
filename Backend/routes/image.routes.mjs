// image.routes.mjs
import express from 'express';
import imageController from '../controllers/Imagen/ImageController.mjs';
import upload from '../middleware/upload.mjs';
import uploadg from '../middleware/uploadg.mjs';


const router = express.Router();

// ** Rutas relacionadas con vehículos **

// Crear un vehículo con imagen
router.post('/create', upload.single('image'), imageController.createVehicleWithImage);

// Actualizar un vehículo con imagen
router.put('/create/:id', upload.single('image'), imageController.updateVehicleWithImage);

// Obtener todas las imágenes
router.get('/all', imageController.getAllImages);

// Obtener todas las imágenes
router.get('/pag', imageController.getAllImagesPag);


// ** Rutas relacionadas con imágenes **

// Subir una imagen directamente
router.post('/upload', (req, res) => {
  upload.single('imagen')(req, res, (err) => {
    if (err) {
      console.error('Error al subir el archivo:', err.message);
      return res.status(400).json({ message: `Error al subir el archivo: ${err.message}` });
    }

    // Log de éxito si el archivo se subió correctamente
    console.log('Archivo recibido correctamente en req.file:', req.file);
    res.status(200).json({ message: 'Archivo subido exitosamente', file: req.file });
  });
});

// Subir una imagen directamente
router.post('/uploadg', (req, res) => {
  uploadg.single('imagen')(req, res, (err) => {
    if (err) {
      console.error('Error al subir el archivo:', err.message);
      return res.status(400).json({ message: `Error al subir el archivo: ${err.message}` });
    }

    // Log de éxito si el archivo se subió correctamente
    console.log('Archivo recibido correctamente en req.file:', req.file);
    res.status(200).json({ message: 'Archivo subido exitosamente', file: req.file });
  });
});

// Obtener una imagen por su nombre
router.get('/images/:nombreImagen', imageController.getImage);

// Obtener una imagen por su nombre
router.get('/caru/:nombreImagen', imageController.getCarusel);

// Eliminar una imagen por su nombre
router.delete('/images/:nombreImagen', imageController.deleteImage);

// Eliminar una imagen por su nombre
router.delete('/imagesg/:nombreImagen', imageController.deleteImageCarusel);

export default router;
