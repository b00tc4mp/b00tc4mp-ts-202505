import jsonwebtoken from "./jsonwebtoken-promised.js";
const { JsonWebTokenError, TokenExpiredError } = jsonwebtoken;
const SECRET = process.env.JWT_SECRET || "";
export async function validateJWT(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ error: "Missing or invalid Authorization header" });
        }
        const token = authHeader.split(" ")[1];
        const payload = await jsonwebtoken.verify(token, SECRET);
        req.userId = payload.userId;
        next(); // token válido, continua con la ruta
    }
    catch (error) {
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
const validateJWTWrapper = (req, res, next) => {
    validateJWT(req, res, next);
};
export { validateJWTWrapper };
//# sourceMappingURL=validatejwt.js.map