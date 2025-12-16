import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

const router = Router();
const userController = new UserController();

// GET /usuarios - Listar todos los usuarios
router.get("/", userController.getAllUsers);

// GET /usuarios/:id/vehiculos - Listar vehículos de un usuario
router.get("/:id/vehiculos", userController.getUserVehicles);

export default router;

// GET /:id/vehiculos → será /usuarios/:id/vehiculos cuando se monte en el servidor

//Las rutas conectan las URLs HTTP con los métodos de los controladores.
