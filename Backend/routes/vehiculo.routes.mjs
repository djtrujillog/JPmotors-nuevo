import { Router } from "express";
import vehiculoController from "../controllers/vehiculoController.mjs";
import multer from 'multer';
import checkAuth from '../middleware/checkAuth.mjs';

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../JpMotor/Images/nuevos/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
  
const upload = multer({ storage: storage });

// Rutas para vehículos
router.get("/", checkAuth, vehiculoController.getVehiculos);
router.get('/detalle/:id', checkAuth, vehiculoController.getVehiculoDetalle);
router.get('/porMarca', checkAuth, vehiculoController.getVehiculosPorMarca);
router.get('/:id', checkAuth, vehiculoController.getVehiculoPorID);
router.post('/crearVehiculo', upload.single('Imagen'), checkAuth, vehiculoController.crearVehiculo);
router.put('/actualizarVehiculo/:VehiculoID', checkAuth, upload.single('Imagen'), vehiculoController.actualizarVehiculo);
router.delete('/eliminarVehiculo/:VehiculoID', checkAuth, vehiculoController.eliminarVehiculo);

export default router;