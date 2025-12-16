import { Router } from "express";
import vehicleRoutes from "./vehicleRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

// Montar las rutas
router.use("/vehiculos", vehicleRoutes);
router.use("/usuarios", userRoutes);

export default router;

//Este archivo central agrupa todas las rutas y las exporta juntas.
