// image.routes.mjs
import express from 'express';
import imageController from '../controllers/Imagen/ImageController.mjs';
import upload from '../middleware/upload.mjs';

const router = express.Router();

// Middleware de depuración para verificar `req.file`
router.post('/upload', (req, res) => {
  upload.single('imagen')(req, res, (err) => {
    if (err) {
      console.error("Error al subir el archivo:", err.message);
      return res.status(400).json({ message: `Error al subir el archivo: ${err.message}` });
    }
    
    // Log de éxito si el archivo se subió correctamente
    console.log('Archivo recibido correctamente en req.file:', req.file);
    res.status(200).json({ message: 'Archivo subido exitosamente', file: req.file });
  });
});

// Ruta para obtener una imagen
router.get('/:nombreImagen', imageController.getImage);

// Ruta para eliminar una imagen
router.delete('/:nombreImagen', imageController.deleteImage);

// Nueva ruta para subir una imagen y crear un vehículo
// router.post('/create', (req, res) => {
//   upload.single('imagen')(req, res, (err) => {
//     if (err) {
//       console.error("Error al subir el archivo:", err.message);
//       return res.status(400).json({ message: `Error al subir el archivo: ${err.message}` });
//     }
    
//     // Pasar el control al método del controlador para manejar la creación del vehículo
//     imageController.createVehicleWithImage(req, res);
//   });
// });
router.post('/create', upload.single('imagen'), imageController.createVehicleWithImage);

export default router;
