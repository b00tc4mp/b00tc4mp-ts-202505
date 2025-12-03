import { prisma } from "../../database/prisma.js";
import { IVehicleRepository, IVehicleData } from "../types.js";

export class VehicleRepository implements IVehicleRepository {
  async create(vehicle: IVehicleData): Promise<IVehicleData> {
    const created = await prisma.vehiculo.create({
      data: vehicle,
    });
    return created as IVehicleData;
  }

  async get(id: string): Promise<IVehicleData> {
    const vehicle = await prisma.vehiculo.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new Error(`Vehículo con id ${id} no encontrado`);
    }

    return vehicle as IVehicleData;
  }

  async getAll(): Promise<IVehicleData[]> {
    const vehicles = await prisma.vehiculo.findMany();
    return vehicles as IVehicleData[];
  }

  async update(vehicle: IVehicleData): Promise<IVehicleData> {
    const updated = await prisma.vehiculo.update({
      where: { id: vehicle.id },
      data: vehicle,
    });
    return updated as IVehicleData;
  }

  async delete(id: string): Promise<void> {
    await prisma.vehiculo.delete({
      where: { id },
    });
  }

  // Métodos adicionales para los endpoints requeridos
  async findByMatricula(matricula: string): Promise<IVehicleData | null> {
    const vehicle = await prisma.vehiculo.findUnique({
      where: { matricula },
    });
    return vehicle as IVehicleData | null;
  }

  async findByOwnerId(propietario_id: string): Promise<IVehicleData[]> {
    const vehicles = await prisma.vehiculo.findMany({
      where: { propietario_id },
    });
    return vehicles as IVehicleData[];
  }

  async updateOwner(
    vehicleId: string,
    newOwnerId: string
  ): Promise<IVehicleData> {
    const updated = await prisma.vehiculo.update({
      where: { id: vehicleId },
      data: { propietario_id: newOwnerId },
    });
    return updated as IVehicleData;
  }
}
