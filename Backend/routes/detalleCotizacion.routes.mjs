import { Router } from 'express';
import detalleCotizacionController from '../controllers/detalleCotizacionController.mjs';
import checkAuth from '../middleware/checkAuth.mjs';
const router = Router();

// Rutas para detalle de cotizaciones
router.get('/',checkAuth, detalleCotizacionController.getDetallesCotizaciones);
router.post('/crearDetalleCotizacion',checkAuth, detalleCotizacionController.crearDetalleCotizacion);
router.put('/actualizarDetalleCotizacion/:DetalleCotizacionID',checkAuth, detalleCotizacionController.actualizarDetalleCotizacion);
router.delete('/eliminarDetalleCotizacion/:DetalleCotizacionID',checkAuth, detalleCotizacionController.eliminarDetalleCotizacion);

export default router;