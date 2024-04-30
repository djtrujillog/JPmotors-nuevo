import { Router } from "express";
import empleadoController from "../controllers/empleadoController.mjs";
import checkAuth from '../middleware/checkAuth.mjs';

const router = Router();

// Rutas para empleados
router.get("/", checkAuth, empleadoController.getEmpleados);
router.post("/crearEmpleado", checkAuth, empleadoController.crearEmpleado);
router.put("/actualizarEmpleado/:EmpleadoID", checkAuth, empleadoController.actualizarEmpleado);
router.delete("/eliminarEmpleado/:EmpleadoID", checkAuth, empleadoController.eliminarEmpleado);

export default router;