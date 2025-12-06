import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors.js";

/**
 * Middleware global de manejo de errores
 * Debe ir al final de todas las rutas en Express
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Si es un error personalizado (ApiError), usar su código de estado
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Si es un error de Prisma (no encontrado)
  if (err.name === "NotFoundError") {
    return res.status(404).json({
      error: err.message,
    });
  }

  // Si es un error de validación de Prisma
  if (err.name === "PrismaClientValidationError") {
    return res.status(400).json({
      error: "Datos de entrada inválidos",
    });
  }

  // Log del error para debugging (en producción usarías un logger)
  console.error("Error no controlado:", err);

  // Error genérico 500
  return res.status(500).json({
    error: "Error interno del servidor",
  });
}

/*
- Captura todos los errores que llegan a través de next(error)
- Si es un ApiError (nuestros errores personalizados), devuelve el código HTTP apropiado
- Si es otro tipo de error, devuelve 500 Internal Server Error
- IMPORTANTE: Este middleware debe ir DESPUÉS de todas las rutas en Express
*/
