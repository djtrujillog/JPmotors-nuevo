import { Router } from 'express';
import marcaController from '../controllers/Marcas/marcaController.mjs';
const router = Router();

// Rutas para marcas
router.get('/', marcaController.getMarcas);
router.get('/:id', marcaController.getMarcaById);
router.get('/byNombre/:nombre', marcaController.getMarcaByNombre);

export default router;