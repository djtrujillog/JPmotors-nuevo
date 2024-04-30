import { Router } from "express";
import motorController from "../controllers/motorController.mjs";
import checkAuth from "../middleware/checkAuth.mjs";
const router = Router();

// Rutas para motores
router.get("/",checkAuth, motorController.getMotores);
router.post("/crearMotor",checkAuth, motorController.crearMotor);
router.put("/actualizarMotor/:MotorID",checkAuth, motorController.actualizarMotor);
router.delete("/eliminarMotor/:MotorID",checkAuth, motorController.eliminarMotor);

export default router;