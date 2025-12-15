import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler, jsonParserError } from "./middleware/index.js";
import { disconnect } from "./database/prisma.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parser de JSON
app.use(jsonParserError); // Manejar errores de JSON mal formado

// Ruta de health check (debe ir ANTES de las rutas /api)
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "API de vehículos funcionando" });
});

// Rutas
app.use("/api", routes); // Todas las rutas bajo /api

// Middleware de manejo de errores (DEBE ir al final)
app.use(errorHandler);

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🚗 API endpoints:`);
  console.log(`   POST   http://localhost:${PORT}/api/vehiculos`);
  console.log(
    `   PUT    http://localhost:${PORT}/api/vehiculos/:id/propietario`
  );
  console.log(`   GET    http://localhost:${PORT}/api/usuarios/:id/vehiculos`);
});

// Manejo de cierre graceful
process.on("SIGINT", async () => {
  console.log("\n🛑 Cerrando servidor...");
  server.close(async () => {
    await disconnect();
    console.log("✅ Servidor cerrado correctamente");
    process.exit(0);
  });
});

export default app;

/*

- express.json(): Parser automático de JSON en los requests
- cors(): Permite peticiones desde otros dominios
- /api: Todas las rutas están bajo este prefijo
- /health: Endpoint para verificar que el servidor funciona
- errorHandler: Debe ir al final para capturar todos los errores
- Cierre graceful: Cierra la conexión de Prisma correctamente al terminar


*/
