// routes/migracion.routes.mjs
import express from 'express';  // Importar express
import { migracionController } from '../controllers/migracion/controladorMigracion.mjs'; // Importar el controlador

const router = express.Router();  // Definir el enrutador

// Ruta para migrar las imágenes
router.get('/migrar-imagenes', migracionController.extraerYGuardarImagenes);

// Exportar el enrutador
export default router;
