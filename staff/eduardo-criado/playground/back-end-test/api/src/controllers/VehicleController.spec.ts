import { expect } from "chai";
import { Request, Response, NextFunction } from "express";
import { VehicleController } from "./VehicleController.js";
import { VehicleService } from "../services/VehicleService.js";
import { IVehicleData, TipoVehiculo } from "../repositories/types.js";

interface MockResponse {
  statusCode: number;
  data: unknown;
  status(code: number): MockResponse;
  json(data: unknown): MockResponse;
}

function createMockResponse(): MockResponse {
  const mockRes: MockResponse = {
    statusCode: 0,
    data: null,
    status(code: number) {
      mockRes.statusCode = code;
      return mockRes;
    },
    json(data: unknown) {
      mockRes.data = data;
      return mockRes;
    },
  };
  return mockRes;
}

describe("VehicleController", () => {
  describe("createVehicle", () => {
    it("should create vehicle successfully when all fields are provided", async () => {
      const mockVehicle: IVehicleData = {
        id: "vehicle-123",
        marca: "Toyota",
        modelo: "Corolla",
        matricula: "ABC123",
        tipo: TipoVehiculo.COCHE,
        propietario_id: "user-123",
      };

      const mockService = {
        createVehicle: async () => mockVehicle,
      } as unknown as VehicleService;

      const controller = new VehicleController();
      (
        controller as unknown as { vehicleService: VehicleService }
      ).vehicleService = mockService;

      const req = {
        body: {
          marca: "Toyota",
          modelo: "Corolla",
          matricula: "ABC123",
          tipo: "coche",
          propietario_id: "user-123",
        },
      } as Request;

      const res = createMockResponse() as unknown as Response;
      const next = (() => {}) as NextFunction;

      await controller.createVehicle(req, res, next);

      expect((res as unknown as MockResponse).statusCode).to.equal(201);
      expect((res as unknown as MockResponse).data).to.deep.equal(mockVehicle);
    });

    it("should return 400 when required fields are missing", async () => {
      const controller = new VehicleController();

      const req = {
        body: {
          marca: "Toyota",
          modelo: "Corolla",
        },
      } as Request;

      const res = createMockResponse() as unknown as Response;
      const next = (() => {}) as NextFunction;

      await controller.createVehicle(req, res, next);

      expect((res as unknown as MockResponse).statusCode).to.equal(400);
      expect((res as unknown as MockResponse).data).to.have.property("error");
    });

    it("should call next with error when service throws", async () => {
      const mockError = new Error("Service error");

      const mockService = {
        createVehicle: async () => {
          throw mockError;
        },
      } as unknown as VehicleService;

      const controller = new VehicleController();
      (
        controller as unknown as { vehicleService: VehicleService }
      ).vehicleService = mockService;

      const req = {
        body: {
          marca: "Toyota",
          modelo: "Corolla",
          matricula: "ABC123",
          tipo: "coche",
          propietario_id: "user-123",
        },
      } as Request;

      const res = {} as Response;

      let nextCalled = false;
      let errorPassed: unknown = null;
      const next = ((error: unknown) => {
        nextCalled = true;
        errorPassed = error;
      }) as NextFunction;

      await controller.createVehicle(req, res, next);

      expect(nextCalled).to.be.true;
      expect(errorPassed).to.equal(mockError);
    });
  });

  describe("transferOwnership", () => {
    it("should transfer ownership successfully when all fields are provided", async () => {
      const mockVehicle: IVehicleData = {
        id: "vehicle-123",
        marca: "Toyota",
        modelo: "Corolla",
        matricula: "ABC123",
        tipo: TipoVehiculo.COCHE,
        propietario_id: "user-456",
      };

      const mockService = {
        transferOwnership: async () => mockVehicle,
      } as unknown as VehicleService;

      const controller = new VehicleController();
      (
        controller as unknown as { vehicleService: VehicleService }
      ).vehicleService = mockService;

      const req = {
        params: { id: "vehicle-123" },
        body: { nuevo_propietario_id: "user-456" },
      } as unknown as Request;

      const res = createMockResponse() as unknown as Response;
      const next = (() => {}) as NextFunction;

      await controller.transferOwnership(req, res, next);

      expect((res as unknown as MockResponse).statusCode).to.equal(200);
      expect((res as unknown as MockResponse).data).to.deep.equal(mockVehicle);
    });

    it("should return 400 when nuevo_propietario_id is missing", async () => {
      const controller = new VehicleController();

      const req = {
        params: { id: "vehicle-123" },
        body: {},
      } as unknown as Request;

      const res = createMockResponse() as unknown as Response;
      const next = (() => {}) as NextFunction;

      await controller.transferOwnership(req, res, next);

      expect((res as unknown as MockResponse).statusCode).to.equal(400);
      expect((res as unknown as MockResponse).data).to.have.property("error");
    });

    it("should call next with error when service throws", async () => {
      const mockError = new Error("Service error");

      const mockService = {
        transferOwnership: async () => {
          throw mockError;
        },
      } as unknown as VehicleService;

      const controller = new VehicleController();
      (
        controller as unknown as { vehicleService: VehicleService }
      ).vehicleService = mockService;

      const req = {
        params: { id: "vehicle-123" },
        body: { nuevo_propietario_id: "user-456" },
      } as unknown as Request;

      const res = {} as Response;

      let nextCalled = false;
      let errorPassed: unknown = null;
      const next = ((error: unknown) => {
        nextCalled = true;
        errorPassed = error;
      }) as NextFunction;

      await controller.transferOwnership(req, res, next);

      expect(nextCalled).to.be.true;
      expect(errorPassed).to.equal(mockError);
    });
  });

  describe("getAllVehicles", () => {
    it("should return all vehicles successfully", async () => {
      const mockVehicles: IVehicleData[] = [
        {
          id: "vehicle-1",
          marca: "Toyota",
          modelo: "Corolla",
          matricula: "ABC123",
          tipo: TipoVehiculo.COCHE,
          propietario_id: "user-1",
        },
        {
          id: "vehicle-2",
          marca: "Honda",
          modelo: "Civic",
          matricula: "XYZ789",
          tipo: TipoVehiculo.COCHE,
          propietario_id: "user-2",
        },
      ];

      const mockService = {
        getAllVehicles: async () => mockVehicles,
      } as unknown as VehicleService;

      const controller = new VehicleController();
      (
        controller as unknown as { vehicleService: VehicleService }
      ).vehicleService = mockService;

      const req = {} as Request;

      const res = createMockResponse() as unknown as Response;
      const next = (() => {}) as NextFunction;

      await controller.getAllVehicles(req, res, next);

      expect((res as unknown as MockResponse).statusCode).to.equal(200);
      expect((res as unknown as MockResponse).data).to.deep.equal(mockVehicles);
    });

    it("should call next with error when service throws", async () => {
      const mockError = new Error("Service error");

      const mockService = {
        getAllVehicles: async () => {
          throw mockError;
        },
      } as unknown as VehicleService;

      const controller = new VehicleController();
      (
        controller as unknown as { vehicleService: VehicleService }
      ).vehicleService = mockService;

      const req = {} as Request;
      const res = {} as Response;

      let nextCalled = false;
      let errorPassed: unknown = null;
      const next = ((error: unknown) => {
        nextCalled = true;
        errorPassed = error;
      }) as NextFunction;

      await controller.getAllVehicles(req, res, next);

      expect(nextCalled).to.be.true;
      expect(errorPassed).to.equal(mockError);
    });
  });
});
