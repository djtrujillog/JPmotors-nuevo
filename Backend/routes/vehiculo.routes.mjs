import { Router } from "express";
// import vehiculoController from "../controllers/vehiculoController.mjs";
import vehiculoController from "../controllers/vehicleController.mjs";
const router = Router();

// Rutas para vehículos
router.get("/", vehiculoController.getVehiculos);
router.get('/motor/:id', vehiculoController.getVehiculoMotor);
router.get('/seguridad/:id', vehiculoController.getVehiculoSeguridad);
router.get('/interior/:id', vehiculoController.getVehiculoInterior);
router.get('/exterior/:id', vehiculoController.getVehiculoExterior);
router.get('/dimensiones/:id', vehiculoController.getVehiculoDimensiones);
router.get('/porMarca', vehiculoController.getVehiculosPorMarca);
router.get('/:id', vehiculoController.getVehiculoPorID);
router.post('/', vehiculoController.post);

export default router;
