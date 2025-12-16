import { VehicleRepository } from "../repositories/sql/VehicleRepository.js";
import { UserRepository } from "../repositories/sql/UserRepository.js";
import {
  IVehicleData,
  PERMISO_VEHICULO_MAP,
  TransferOwnershipData,
} from "../repositories/types.js";
import {
  BadRequestError,
  ValidationError,
  NotFoundError,
  ConflictError,
} from "../utils/errors.js";
import { randomUUID } from "crypto";

export class VehicleService {
  private vehicleRepo: VehicleRepository;
  private userRepo: UserRepository;

  constructor(
    vehicleRepo: VehicleRepository = new VehicleRepository(),
    userRepo: UserRepository = new UserRepository()
  ) {
    this.vehicleRepo = vehicleRepo;
    this.userRepo = userRepo;
  }

  /**
   * POST /vehiculos
   * Registrar un nuevo vehículo
   */
  async createVehicle(data: Omit<IVehicleData, "id">): Promise<IVehicleData> {
    const { marca, modelo, matricula, tipo, propietario_id } = data;

    // 1. Validar que el propietario existe
    let propietario;
    try {
      propietario = await this.userRepo.get(propietario_id);
    } catch {
      throw new NotFoundError(
        `Propietario con id ${propietario_id} no encontrado`
      );
    }

    // 2. Validar que la matrícula es única
    const existingVehicle = await this.vehicleRepo.findByMatricula(matricula);
    if (existingVehicle) {
      throw new ConflictError(
        `Ya existe un vehículo con la matrícula ${matricula}`
      );
    }

    // 3. Validar que el propietario tiene el permiso adecuado para el tipo de vehículo
    const permisoRequerido = PERMISO_VEHICULO_MAP[propietario.tipo_permiso];
    if (permisoRequerido !== tipo) {
      throw new ValidationError(
        `El propietario tiene permiso tipo ${propietario.tipo_permiso} que solo permite conducir vehículos tipo ${permisoRequerido}, no ${tipo}`
      );
    }

    // 4. Validar que el permiso no está expirado
    const fechaActual = new Date();
    const fechaExpiracion = new Date(propietario.permiso_valido_hasta);
    if (fechaExpiracion <= fechaActual) {
      throw new ValidationError(
        `El permiso del propietario expiró el ${fechaExpiracion.toISOString()}`
      );
    }

    // Si todas las validaciones pasan, crear el vehículo
    const newVehicle: IVehicleData = {
      id: randomUUID(),
      marca,
      modelo,
      matricula,
      tipo,
      propietario_id,
    };

    return await this.vehicleRepo.create(newVehicle);
  }

  /**
   * PUT /vehiculos/:id/propietario
   * Transferir propiedad de un vehículo
   */
  async transferOwnership(
    vehicleId: string,
    data: TransferOwnershipData
  ): Promise<IVehicleData> {
    const { newOwnerId } = data;

    // 1. Validar que el vehículo existe
    let vehicle;
    try {
      vehicle = await this.vehicleRepo.get(vehicleId);
    } catch {
      throw new NotFoundError(`Vehículo con id ${vehicleId} no encontrado`);
    }

    // 2. Validar que el nuevo propietario existe
    let newOwner;
    try {
      newOwner = await this.userRepo.get(newOwnerId);
    } catch {
      throw new NotFoundError(
        `Nuevo propietario con id ${newOwnerId} no encontrado`
      );
    }

    // 3. Validar que el nuevo propietario es diferente del actual
    if (vehicle.propietario_id === newOwnerId) {
      throw new BadRequestError(
        "El nuevo propietario no puede ser el mismo que el actual"
      );
    }

    // 4. Validar que el nuevo propietario tiene el permiso adecuado
    const permisoRequerido = PERMISO_VEHICULO_MAP[newOwner.tipo_permiso];
    if (permisoRequerido !== vehicle.tipo) {
      throw new ValidationError(
        `El nuevo propietario tiene permiso tipo ${newOwner.tipo_permiso} que solo permite conducir vehículos tipo ${permisoRequerido}, no ${vehicle.tipo}`
      );
    }

    // 5. Validar que el permiso del nuevo propietario no está expirado
    const fechaActual = new Date();
    const fechaExpiracion = new Date(newOwner.permiso_valido_hasta);
    if (fechaExpiracion <= fechaActual) {
      throw new ValidationError(
        `El permiso del nuevo propietario expiró el ${fechaExpiracion.toISOString()}`
      );
    }

    // Si todas las validaciones pasan, transferir la propiedad
    return await this.vehicleRepo.updateOwner(vehicleId, newOwnerId);
  }

  /**
   * Método auxiliar para obtener vehículos por propietario
   */
  async getVehiclesByOwnerId(ownerId: string): Promise<IVehicleData[]> {
    return await this.vehicleRepo.findByOwnerId(ownerId);
  }

  async getAllVehicles(): Promise<IVehicleData[]> {
    return await this.vehicleRepo.getAll();
  }
}
