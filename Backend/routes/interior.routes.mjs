import { Router } from "express";
import interiorController from "../controllers/interiorController.mjs";
import checkAuth from "../middleware/checkAuth.mjs";
const router = Router();

// Rutas para interiores
router.get("/",checkAuth, interiorController.getInteriores);
router.post("/crearInterior",checkAuth, interiorController.crearInterior);
router.put("/actualizarInterior/:InteriorID",checkAuth, interiorController.actualizarInterior);
router.delete("/eliminarInterior/:InteriorID",checkAuth, interiorController.eliminarInterior);

export default router;