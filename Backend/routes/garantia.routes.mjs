import { Router } from "express";
import garantiaController from "../controllers/garantiaController.mjs";
import checkAuth from "../middleware/checkAuth.mjs";
const router = Router();

// Rutas para garantias
router.get("/",checkAuth, garantiaController.getGarantias);
router.post("/crearGarantia",checkAuth, garantiaController.crearGarantia);
router.put("/actualizarGarantia/:GarantiaID",checkAuth, garantiaController.actualizarGarantia);
router.delete("/eliminarGarantia/:GarantiaID",checkAuth, garantiaController.eliminarGarantia);

export default router;