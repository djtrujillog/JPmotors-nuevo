import { Router } from "express";
import cotizacionController from "../controllers/cotizacionController.mjs";
import checkAuth from "../middleware/checkAuth.mjs";
const router = Router();

// Rutas para cotizaciones
router.get("/",checkAuth, cotizacionController.getCotizaciones);
router.post("/crearCotizacion",checkAuth, cotizacionController.crearCotizaciones);
router.put("/actualizarCotizacion/:CotizacionID",checkAuth, cotizacionController.actualizarCotizacion);
router.delete("/eliminarCotizacion/:CotizacionID",checkAuth, cotizacionController.eliminarCotizacion);

export default router;
