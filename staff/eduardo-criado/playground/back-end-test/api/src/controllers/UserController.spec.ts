import { expect } from "chai";
import { Request, Response, NextFunction } from "express";
import { UserController } from "./UserController.js";
import { UserService } from "../services/UserService.js";
import {
  IUserData,
  IVehicleData,
  TipoPermiso,
  TipoVehiculo,
} from "../repositories/types.js";

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

describe("UserController", () => {
  describe("getUserVehicles", () => {
    it("should return user vehicles successfully", async () => {
      const mockVehicles: IVehicleData[] = [
        {
          id: "vehicle-1",
          marca: "Toyota",
          modelo: "Corolla",
          matricula: "ABC123",
          tipo: TipoVehiculo.COCHE,
          propietario_id: "user-123",
        },
      ];

      const mockService = {
        getUserVehicles: async () => mockVehicles,
      } as unknown as UserService;

      const controller = new UserController();
      (controller as unknown as { userService: UserService }).userService =
        mockService;

      const req = {
        params: { id: "user-123" },
      } as unknown as Request;

      const res = createMockResponse() as unknown as Response;
      const next = (() => {}) as NextFunction;

      await controller.getUserVehicles(req, res, next);

      expect((res as unknown as MockResponse).statusCode).to.equal(200);
      expect((res as unknown as MockResponse).data).to.deep.equal(mockVehicles);
    });

    it("should call next with error when service throws", async () => {
      const mockError = new Error("Service error");

      const mockService = {
        getUserVehicles: async () => {
          throw mockError;
        },
      } as unknown as UserService;

      const controller = new UserController();
      (controller as unknown as { userService: UserService }).userService =
        mockService;

      const req = {
        params: { id: "user-123" },
      } as unknown as Request;

      const res = {} as Response;

      let nextCalled = false;
      let errorPassed: unknown = null;
      const next = ((error: unknown) => {
        nextCalled = true;
        errorPassed = error;
      }) as NextFunction;

      await controller.getUserVehicles(req, res, next);

      expect(nextCalled).to.be.true;
      expect(errorPassed).to.equal(mockError);
    });
  });

  describe("getAllUsers", () => {
    it("should return all users successfully", async () => {
      const mockUsers: IUserData[] = [
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

      const mockService = {
        getAllUsers: async () => mockUsers,
      } as unknown as UserService;

      const controller = new UserController();
      (controller as unknown as { userService: UserService }).userService =
        mockService;

      const req = {} as Request;

      const res = createMockResponse() as unknown as Response;
      const next = (() => {}) as NextFunction;

      await controller.getAllUsers(req, res, next);

      expect((res as unknown as MockResponse).statusCode).to.equal(200);
      expect((res as unknown as MockResponse).data).to.deep.equal(mockUsers);
    });

    it("should call next with error when service throws", async () => {
      const mockError = new Error("Service error");

      const mockService = {
        getAllUsers: async () => {
          throw mockError;
        },
      } as unknown as UserService;

      const controller = new UserController();
      (controller as unknown as { userService: UserService }).userService =
        mockService;

      const req = {} as Request;
      const res = {} as Response;

      let nextCalled = false;
      let errorPassed: unknown = null;
      const next = ((error: unknown) => {
        nextCalled = true;
        errorPassed = error;
      }) as NextFunction;

      await controller.getAllUsers(req, res, next);

      expect(nextCalled).to.be.true;
      expect(errorPassed).to.equal(mockError);
    });
  });
});
