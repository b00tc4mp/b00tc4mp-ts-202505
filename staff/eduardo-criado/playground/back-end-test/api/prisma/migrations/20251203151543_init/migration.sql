-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tipo_permiso" TEXT NOT NULL,
    "permiso_valido_hasta" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "vehiculos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "propietario_id" TEXT NOT NULL,
    CONSTRAINT "vehiculos_propietario_id_fkey" FOREIGN KEY ("propietario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vehiculos_matricula_key" ON "vehiculos"("matricula");
