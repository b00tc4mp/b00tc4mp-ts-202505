import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "./jsonwebtoken-promised.js";

const { JsonWebTokenError, TokenExpiredError } = jsonwebtoken;
const SECRET = process.env.JWT_SECRET || "";

export async function validateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Missing or invalid Authorization header" });
    }

    const token = authHeader.split(" ")[1];
    const payload = await jsonwebtoken.verify(token, SECRET);

    (req as any).userId = (payload as any).userId;

    next(); // token válido, continua con la ruta
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    }
    // Otros errores
    console.error(error);
    return res.status(500).json({ error: "Token verification failed" });
  }
}

const validateJWTWrapper = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateJWT(req, res, next);
};

export { validateJWTWrapper };
