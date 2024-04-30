import { Router } from 'express';
import marcaController from '../controllers/marcaController.mjs';
import checkAuth from '../middleware/checkAuth.mjs';
const router = Router();

// Rutas para marcas
router.get('/',checkAuth, marcaController.getMarcas);
router.post('/crearMarca',checkAuth, marcaController.crearMarca);
router.put('/actualizarMarca/:MarcaID',checkAuth, marcaController.actualizarMarca);
router.delete('/eliminarMarca/:MarcaID',checkAuth, marcaController.eliminarMarca);


export default router;