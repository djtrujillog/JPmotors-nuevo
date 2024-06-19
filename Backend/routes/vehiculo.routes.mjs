import { Router } from "express";
import vehiculoController from "../controllers/vehicleController.mjs";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // const directorio = path.join(__dirname, "../../public/images");
    const directorio = path.resolve("C:/proyectos/jpmotors-nuevo/jpmotors-nuevo/public/images");


    // Verificar si el directorio existe, si no, crearlo
    if (!fs.existsSync(directorio)) {
      fs.mkdirSync(directorio, { recursive: true });
    }
    
    cb(null, directorio);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = Router();

// Rutas para vehículos
router.get("/", vehiculoController.getVehiculos);
router.get("/motor/:id", vehiculoController.getVehiculoMotor);
router.get("/seguridad/:id", vehiculoController.getVehiculoSeguridad);
router.get("/interior/:id", vehiculoController.getVehiculoInterior);
router.get("/exterior/:id", vehiculoController.getVehiculoExterior);
router.get("/dimensiones/:id", vehiculoController.getVehiculoDimensiones);
router.get("/porMarca", vehiculoController.getVehiculosPorMarca);
router.get("/:id", vehiculoController.getVehiculoPorID);
router.post("/", upload.single("file"), vehiculoController.post);
router.put("/:id", upload.single("file"), vehiculoController.put);

export default router;
