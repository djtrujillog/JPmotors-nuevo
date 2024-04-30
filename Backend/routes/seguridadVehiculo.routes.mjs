import { Router } from "express";
import seguridadVehiculoController from "../controllers/seguridadVehiculoController.mjs";
import checkAuth from "../middleware/checkAuth.mjs";
const router = Router();

// Rutas para seguridadVehiculo
router.get("/",checkAuth, seguridadVehiculoController.getSeguridadVehiculos);
router.post("/crearSeguridadVehiculo",checkAuth, seguridadVehiculoController.crearSeguridadVehiculo);
router.put("/actualizarSeguridadVehiculo/:SeguridadVehiculoID",checkAuth, seguridadVehiculoController.actualizarSeguridadVehiculo);
router.delete("/eliminarSeguridadVehiculo/:SeguridadVehiculoID",checkAuth, seguridadVehiculoController.eliminarSeguridadVehiculo);

export default router;
