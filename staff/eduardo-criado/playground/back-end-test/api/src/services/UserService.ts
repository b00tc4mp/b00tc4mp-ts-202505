import { UserRepository } from "../repositories/sql/UserRepository.js";
import { VehicleService } from "./VehicleService.js";
import { IUserData, IVehicleData } from "../repositories/types.js";
import { NotFoundError } from "../utils/errors.js";

export class UserService {
  private userRepo: UserRepository;
  private vehicleService: VehicleService;

  constructor(
    userRepo: UserRepository = new UserRepository(),
    vehicleService: VehicleService = new VehicleService()
  ) {
    this.userRepo = userRepo;
    this.vehicleService = vehicleService;
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

  /**
   * GET /usuarios
   * Listar todos los usuarios
   */
  async getAllUsers(): Promise<IUserData[]> {
    return await this.userRepo.getAll();
  }
}
