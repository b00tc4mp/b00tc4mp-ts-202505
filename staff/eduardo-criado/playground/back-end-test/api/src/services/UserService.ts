import { UserRepository } from "../repositories/sql/UserRepository.js";
import { VehicleService } from "./VehicleService.js";
import { IVehicleData } from "../repositories/types.js";
import { NotFoundError } from "../utils/errors.js";

export class UserService {
  private userRepo: UserRepository;
  private vehicleService: VehicleService;

  constructor() {
    this.userRepo = new UserRepository();
    this.vehicleService = new VehicleService();
  }

  /**
   * GET /usuarios/:id/vehiculos
   * Listar vehículos de un usuario
   */
  async getUserVehicles(userId: string): Promise<IVehicleData[]> {
    // 1. Validar que el usuario existe
    try {
      await this.userRepo.get(userId);
    } catch (error) {
      throw new NotFoundError(`Usuario con id ${userId} no encontrado`);
    }

    // 2. Obtener los vehículos del usuario
    return await this.vehicleService.getVehiclesByOwnerId(userId);
  }
}
