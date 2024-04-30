import { Router } from "express";
import DetalleVentaController from "../controllers/detalleVentaController.mjs";
import checkAuth from "../middleware/checkAuth.mjs";
const router = Router();

router.get("/", checkAuth, DetalleVentaController.getDetalleVentas);
router.get("/:id", checkAuth, DetalleVentaController.getDetalleVenta);
router.post("/", checkAuth, DetalleVentaController.crearDetalleVenta);
router.put("/:id", checkAuth, DetalleVentaController.actualizarDetalleVenta);
router.delete("/:id", checkAuth, DetalleVentaController.eliminarDetalleVenta);

export default router;