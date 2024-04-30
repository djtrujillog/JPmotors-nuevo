import { Router } from 'express';
import VentaController from '../controllers/ventaController.mjs';
import checkAuth from '../middleware/checkAuth.mjs';
const router = Router();

router.get('/', checkAuth, VentaController.getVentas);
router.get('/:id', checkAuth, VentaController.getVentaDetalle);
router.post('/', checkAuth, VentaController.crearVenta);
router.put('/:id', checkAuth, VentaController.actualizarVenta);
router.delete('/:id', checkAuth, VentaController.eliminarVenta);

export default router;