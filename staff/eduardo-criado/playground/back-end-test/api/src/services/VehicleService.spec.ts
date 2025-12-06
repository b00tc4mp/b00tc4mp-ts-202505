import { expect } from "chai";
import { VehicleService } from "./VehicleService.js";
import { VehicleRepository } from "../repositories/sql/VehicleRepository.js";
import { UserRepository } from "../repositories/sql/UserRepository.js";
import {
  IUserData,
  IVehicleData,
  TipoPermiso,
  TipoVehiculo,
} from "../repositories/types.js";

describe("VehicleService", () => {
  describe("createVehicle", () => {
    it("should create vehicle when owner has valid permit", async () => {
      const validOwner: IUserData = {
        id: "user-1",
        nombre: "Juan Perez",
        email: "juan@example.com",
        tipo_permiso: TipoPermiso.B,
        permiso_valido_hasta: new Date("2026-12-31"),
      };

      const vehicleData = {
        marca: "Toyota",
        modelo: "Corolla",
        matricula: "ABC123",
        tipo: TipoVehiculo.COCHE,
        propietario_id: "user-1",
      };

      const mockUserRepo = {
        get: async (_id: string) => validOwner,
      } as UserRepository;

      const mockVehicleRepo = {
        findByMatricula: async (_matricula: string) => null,
        create: async (vehicle: IVehicleData) => vehicle,
      } as VehicleRepository;

      const service = new VehicleService(mockVehicleRepo, mockUserRepo);

      const result = await service.createVehicle(vehicleData);

      expect(result.marca).to.equal("Toyota");
      expect(result.modelo).to.equal("Corolla");
      expect(result.matricula).to.equal("ABC123");
      expect(result.tipo).to.equal(TipoVehiculo.COCHE);
      expect(result.propietario_id).to.equal("user-1");
    });

    it("should throw NotFoundError when owner does not exist", async () => {
      const vehicleData = {
        marca: "Toyota",
        modelo: "Corolla",
        matricula: "ABC123",
        tipo: TipoVehiculo.COCHE,
        propietario_id: "non-existent-user",
      };

      const mockUserRepo = {
        get: async (_id: string) => {
          throw new Error("User not found");
        },
      } as unknown as UserRepository;

      const mockVehicleRepo = {} as VehicleRepository;

      const service = new VehicleService(mockVehicleRepo, mockUserRepo);

      try {
        await service.createVehicle(vehicleData);
        expect.fail("Should have thrown NotFoundError");
      } catch (error: any) {
        expect(error.name).to.equal("NotFoundError");
        expect(error.message).to.include("non-existent-user");
      }
    });

    it("should throw ConflictError when matricula already exists", async () => {
      const validOwner: IUserData = {
        id: "user-1",
        nombre: "Juan Perez",
        email: "juan@example.com",
        tipo_permiso: TipoPermiso.B,
        permiso_valido_hasta: new Date("2026-12-31"),
      };

      const vehicleData = {
        marca: "Toyota",
        modelo: "Corolla",
        matricula: "ABC123",
        tipo: TipoVehiculo.COCHE,
        propietario_id: "user-1",
      };

      const existingVehicle: IVehicleData = {
        id: "vehicle-1",
        marca: "Honda",
        modelo: "Civic",
        matricula: "ABC123",
        tipo: TipoVehiculo.COCHE,
        propietario_id: "user-2",
      };

      const mockUserRepo = {
        get: async (_id: string) => validOwner,
      } as UserRepository;

      const mockVehicleRepo = {
        findByMatricula: async (_matricula: string) => existingVehicle,
      } as VehicleRepository;

      const service = new VehicleService(mockVehicleRepo, mockUserRepo);

      try {
        await service.createVehicle(vehicleData);
        expect.fail("Should have thrown ConflictError");
      } catch (error: any) {
        expect(error.name).to.equal("ConflictError");
        expect(error.message).to.include("ABC123");
      }
    });

    it("should throw BadRequestError when owner has wrong permit type", async () => {
      const ownerWithWrongPermit: IUserData = {
        id: "user-1",
        nombre: "Juan Perez",
        email: "juan@example.com",
        tipo_permiso: TipoPermiso.A,
        permiso_valido_hasta: new Date("2026-12-31"),
      };

      const vehicleData = {
        marca: "Toyota",
        modelo: "Corolla",
        matricula: "ABC123",
        tipo: TipoVehiculo.COCHE,
        propietario_id: "user-1",
      };

      const mockUserRepo = {
        get: async (_id: string) => ownerWithWrongPermit,
      } as UserRepository;

      const mockVehicleRepo = {
        findByMatricula: async (_matricula: string) => null,
      } as VehicleRepository;

      const service = new VehicleService(mockVehicleRepo, mockUserRepo);

      try {
        await service.createVehicle(vehicleData);
        expect.fail("Should have thrown BadRequestError");
      } catch (error: any) {
        expect(error.name).to.equal("BadRequestError");
        expect(error.message).to.include("permiso tipo A");
      }
    });

    it("should throw BadRequestError when owner permit is expired", async () => {
      const ownerWithExpiredPermit: IUserData = {
        id: "user-1",
        nombre: "Juan Perez",
        email: "juan@example.com",
        tipo_permiso: TipoPermiso.B,
        permiso_valido_hasta: new Date("2020-01-01"),
      };

      const vehicleData = {
        marca: "Toyota",
        modelo: "Corolla",
        matricula: "ABC123",
        tipo: TipoVehiculo.COCHE,
        propietario_id: "user-1",
      };

      const mockUserRepo = {
        get: async (_id: string) => ownerWithExpiredPermit,
      } as UserRepository;

      const mockVehicleRepo = {
        findByMatricula: async (_matricula: string) => null,
      } as VehicleRepository;

      const service = new VehicleService(mockVehicleRepo, mockUserRepo);

      try {
        await service.createVehicle(vehicleData);
        expect.fail("Should have thrown BadRequestError");
      } catch (error: any) {
        expect(error.name).to.equal("BadRequestError");
        expect(error.message).to.include("expiró");
      }
    });
  });

  describe("transferOwnership", () => {
    it("should transfer ownership when new owner has valid permit", async () => {
      const existingVehicle: IVehicleData = {
        id: "vehicle-1",
        marca: "Toyota",
        modelo: "Corolla",
        matricula: "ABC123",
        tipo: TipoVehiculo.COCHE,
        propietario_id: "user-1",
      };

      const newOwner: IUserData = {
        id: "user-2",
        nombre: "Maria Garcia",
        email: "maria@example.com",
        tipo_permiso: TipoPermiso.B,
        permiso_valido_hasta: new Date("2026-12-31"),
      };

      const mockVehicleRepo = {
        get: async (_id: string) => existingVehicle,
        updateOwner: async (_vehicleId: string, newOwnerId: string) => ({
          ...existingVehicle,
          propietario_id: newOwnerId,
        }),
      } as VehicleRepository;

      const mockUserRepo = {
        get: async (_id: string) => newOwner,
      } as UserRepository;

      const service = new VehicleService(mockVehicleRepo, mockUserRepo);

      const result = await service.transferOwnership("vehicle-1", {
        vehicleId: "vehicle-1",
        newOwnerId: "user-2",
      });

      expect(result.propietario_id).to.equal("user-2");
    });

    it("should throw BadRequestError when new owner is same as current", async () => {
      const existingVehicle: IVehicleData = {
        id: "vehicle-1",
        marca: "Toyota",
        modelo: "Corolla",
        matricula: "ABC123",
        tipo: TipoVehiculo.COCHE,
        propietario_id: "user-1",
      };

      const owner: IUserData = {
        id: "user-1",
        nombre: "Juan Perez",
        email: "juan@example.com",
        tipo_permiso: TipoPermiso.B,
        permiso_valido_hasta: new Date("2026-12-31"),
      };

      const mockVehicleRepo = {
        get: async (_id: string) => existingVehicle,
      } as VehicleRepository;

      const mockUserRepo = {
        get: async (_id: string) => owner,
      } as UserRepository;

      const service = new VehicleService(mockVehicleRepo, mockUserRepo);

      try {
        await service.transferOwnership("vehicle-1", {
          vehicleId: "vehicle-1",
          newOwnerId: "user-1",
        });
        expect.fail("Should have thrown BadRequestError");
      } catch (error: any) {
        expect(error.name).to.equal("BadRequestError");
        expect(error.message).to.include("mismo");
      }
    });

    it("should throw BadRequestError when new owner has wrong permit", async () => {
      const existingVehicle: IVehicleData = {
        id: "vehicle-1",
        marca: "Toyota",
        modelo: "Corolla",
        matricula: "ABC123",
        tipo: TipoVehiculo.COCHE,
        propietario_id: "user-1",
      };

      const newOwnerWrongPermit: IUserData = {
        id: "user-2",
        nombre: "Maria Garcia",
        email: "maria@example.com",
        tipo_permiso: TipoPermiso.A,
        permiso_valido_hasta: new Date("2026-12-31"),
      };

      const mockVehicleRepo = {
        get: async (_id: string) => existingVehicle,
      } as VehicleRepository;

      const mockUserRepo = {
        get: async (_id: string) => newOwnerWrongPermit,
      } as UserRepository;

      const service = new VehicleService(mockVehicleRepo, mockUserRepo);

      try {
        await service.transferOwnership("vehicle-1", {
          vehicleId: "vehicle-1",
          newOwnerId: "user-2",
        });
        expect.fail("Should have thrown BadRequestError");
      } catch (error: any) {
        expect(error.name).to.equal("BadRequestError");
        expect(error.message).to.include("permiso tipo A");
      }
    });
  });
});
