import { Request, Response, NextFunction } from "express";

/**
 * Middleware para manejar errores de JSON mal formado
 */
export function jsonParserError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      error: "JSON mal formado en el body de la petición",
    });
  }
  next(err);
}
