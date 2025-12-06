import { expect } from "chai";
import { UserService } from "./UserService.js";
import { UserRepository } from "../repositories/sql/UserRepository.js";
import { VehicleService } from "./VehicleService.js";
import {
  IUserData,
  IVehicleData,
  TipoPermiso,
  TipoVehiculo,
} from "../repositories/types.js";

describe("UserService", () => {
  describe("getUserVehicles", () => {
    it("should return vehicles when user exists", async () => {
      const validUser: IUserData = {
        id: "user-1",
        nombre: "Juan Perez",
        email: "juan@example.com",
        tipo_permiso: TipoPermiso.B,
        permiso_valido_hasta: new Date("2026-12-31"),
      };

      const userVehicles: IVehicleData[] = [
        {
          id: "vehicle-1",
          marca: "Toyota",
          modelo: "Corolla",
          matricula: "ABC123",
          tipo: TipoVehiculo.COCHE,
          propietario_id: "user-1",
        },
      ];

      const mockUserRepo = {
        get: async (_id: string) => validUser,
      } as UserRepository;

      const mockVehicleService = {
        getVehiclesByOwnerId: async (_ownerId: string) => userVehicles,
      } as VehicleService;

      const service = new UserService(mockUserRepo, mockVehicleService);

      const result = await service.getUserVehicles("user-1");

      expect(result).to.have.lengthOf(1);
      expect(result[0].marca).to.equal("Toyota");
    });

    it("should throw NotFoundError when user does not exist", async () => {
      const mockUserRepo = {
        get: async (_id: string) => {
          throw new Error("User not found");
        },
      } as unknown as UserRepository;

      const mockVehicleService = {} as VehicleService;

      const service = new UserService(mockUserRepo, mockVehicleService);

      try {
        await service.getUserVehicles("non-existent-user");
        expect.fail("Should have thrown NotFoundError");
      } catch (error: any) {
        expect(error.name).to.equal("NotFoundError");
        expect(error.message).to.include("non-existent-user");
      }
    });
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const users: IUserData[] = [
        {
          id: "user-1",
          nombre: "Juan Perez",
          email: "juan@example.com",
          tipo_permiso: TipoPermiso.B,
          permiso_valido_hasta: new Date("2026-12-31"),
        },
        {
          id: "user-2",
          nombre: "Maria Garcia",
          email: "maria@example.com",
          tipo_permiso: TipoPermiso.A,
          permiso_valido_hasta: new Date("2026-12-31"),
        },
      ];

      const mockUserRepo = {
        getAll: async () => users,
      } as UserRepository;

      const mockVehicleService = {} as VehicleService;

      const service = new UserService(mockUserRepo, mockVehicleService);

      const result = await service.getAllUsers();

      expect(result).to.have.lengthOf(2);
      expect(result[0].nombre).to.equal("Juan Perez");
      expect(result[1].nombre).to.equal("Maria Garcia");
    });
  });
});
