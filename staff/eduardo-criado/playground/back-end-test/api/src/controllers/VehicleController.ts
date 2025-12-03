import { Request, Response, NextFunction } from "express";
import { VehicleService } from "../services/VehicleService.js";

export class VehicleController {
  private vehicleService: VehicleService;

  constructor() {
    this.vehicleService = new VehicleService();
  }

  /**
   * POST /vehiculos
   * Registrar un nuevo vehículo
   */
  createVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { marca, modelo, matricula, tipo, propietario_id } = req.body;

      // Validar que los campos requeridos están presentes
      if (!marca || !modelo || !matricula || !tipo || !propietario_id) {
        return res.status(400).json({
          error:
            "Todos los campos son requeridos: marca, modelo, matricula, tipo, propietario_id",
        });
      }

      const vehicle = await this.vehicleService.createVehicle({
        marca,
        modelo,
        matricula,
        tipo,
        propietario_id,
      });

      return res.status(201).json(vehicle);
    } catch (error) {
      next(error);
    }
  };

  /**
   * PUT /vehiculos/:id/propietario
   * Transferir propiedad de un vehículo
   */
  transferOwnership = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { nuevo_propietario_id } = req.body;

      // Validar que el nuevo propietario está presente
      if (!nuevo_propietario_id) {
        return res.status(400).json({
          error: "El campo nuevo_propietario_id es requerido",
        });
      }

      const vehicle = await this.vehicleService.transferOwnership(id, {
        vehicleId: id,
        newOwnerId: nuevo_propietario_id,
      });

      return res.status(200).json(vehicle);
    } catch (error) {
      next(error);
    }
  };
}

/*
2 endpoints

    - createVehicle: Endpoint POST / vehiculos → valida campos y llama al servicio 
    -transferOwnership: Endpoint PUT /vehiculos/:id/propietario → valida y llama al servicio 
    - next(error): Pasa los errores al middleware de errores (lo crearemos después)
    - Uso de arrow functions = para mantener el contexto de this
*/

/*

createVehicle:

- Valida que todos los campos están presentes
- Llama al servicio para crear el vehículo
- Devuelve 201 Created si todo está bien

transferOwnership:

- Extrae el ID del vehículo de req.params.id
- Extrae el nuevo propietario de req.body.nuevo_propietario_id
- Llama al servicio para transferir
- Devuelve 200 OK si todo está bien

*/

/*

Manejo de errores:
Todos usan next(error) para pasar los errores al middleware
Los errores personalizados (BadRequestError, etc.) serán manejados en el middleware

*/
