import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService.js";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * GET /usuarios/:id/vehiculos
   * Listar vehículos de un usuario
   */
  getUserVehicles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const vehicles = await this.userService.getUserVehicles(id);

      return res.status(200).json(vehicles);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /usuarios
   * Listar todos los usuarios
   */
  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };
}

/*
1 endpoint

- getUserVehicles: Endpoint GET /usuarios/:id/vehiculos
- Extrae el id de los parámetros de la URL
- Devuelve un array de vehículos (puede estar vacío si el usuario no tiene vehículos)
*/

/*

getUserVehicles:

- Extrae el ID del usuario de req.params.id
- Llama al servicio para obtener sus vehículos
- Devuelve 200 OK con un array (vacío o con vehículos)

*/

/*

Manejo de errores:
Todos usan next(error) para pasar los errores al middleware
Los errores personalizados (BadRequestError, etc.) serán manejados en el middleware

*/
