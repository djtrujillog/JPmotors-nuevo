import { Router } from "express";
import inventarioController from "../controllers/inventarioController.mjs";
import checkAuth from "../middleware/checkAuth.mjs";
const router = Router();

// Rutas para inventario
router.get("/",checkAuth, inventarioController.getInventario);
router.post("/crearInventario",checkAuth, inventarioController.crearInventario);
router.put("/actualizarInventario/:InventarioID",checkAuth, inventarioController.actualizarInventario);
router.delete("/eliminarInventario/:InventarioID",checkAuth, inventarioController.eliminarInventario);

export default router;