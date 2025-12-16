import { Router } from "express";
import { VehicleController } from "../controllers/VehicleController.js";

const router = Router();
const vehicleController = new VehicleController();

// GET /vehiculos - Obtener todos los vehículos
router.get("/", vehicleController.getAllVehicles);

// POST /vehiculos - Registrar un nuevo vehículo
router.post("/", vehicleController.createVehicle);

// PUT /vehiculos/:id/propietario - Transferir propiedad
router.put("/:id/propietario", vehicleController.transferOwnership);

export default router;

// POST / → será /vehiculos cuando se monte en el servidor
// PUT /:id/propietario → será /vehiculos/:id/propietario

//Las rutas conectan las URLs HTTP con los métodos de los controladores.
