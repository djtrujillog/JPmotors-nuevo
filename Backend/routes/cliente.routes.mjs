import { Router } from "express";
import clienteController from "../controllers/clienteController.mjs";
import checkAuth from "../middleware/checkAuth.mjs";
const router = Router();

// Rutas para clientes
router.get("/",checkAuth, clienteController.getClientes);
router.post("/crearCliente",checkAuth, clienteController.crearCliente);
router.put("/actualizarCliente/:ClienteID",checkAuth, clienteController.actualizarCliente);
router.delete("/eliminarCliente/:ClienteID",checkAuth, clienteController.eliminarCliente);

export default router;