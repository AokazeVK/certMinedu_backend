-- CreateTable
CREATE TABLE "certificacion" (
    "id" INTEGER NOT NULL,
    "nombre" TEXT,
    "paterno" TEXT,
    "materno" TEXT,
    "cedula" TEXT,
    "taller" TEXT,
    "codigo_esfm" INTEGER,
    "esfm" TEXT,
    "departamento" TEXT,
    "lengua_originaria" TEXT,
    "nivel" TEXT,
    "carga_horaria" INTEGER,
    "gestion" INTEGER,
    "fecha_inicio" TIMESTAMP(3),
    "codigo_estudiante" TEXT,
    "taller2" TEXT,
    "valida_datos" INTEGER,
    "cantidad_datos" INTEGER,
    "dato_corregido" INTEGER,
    "tacfi" TEXT,
    "especialidad" TEXT,
    "hoja_ruta" INTEGER,

    CONSTRAINT "certificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificacion_persona" (
    "cod_pers" TEXT NOT NULL,
    "nombre" TEXT,
    "paterno" TEXT,
    "materno" TEXT,
    "cedula" TEXT,

    CONSTRAINT "certificacion_persona_pkey" PRIMARY KEY ("cod_pers")
);

-- CreateTable
CREATE TABLE "certificacionTACFI" (
    "id" INTEGER NOT NULL,
    "nombre" TEXT,
    "paterno" TEXT,
    "materno" TEXT,
    "cedula" TEXT,
    "taller" TEXT,
    "codigo_esfm" INTEGER,
    "esfm" TEXT,
    "departamento" TEXT,
    "lengua_originaria" TEXT,
    "nivel" TEXT,
    "carga_horaria" INTEGER,
    "gestion" INTEGER,
    "fecha_inicio" TIMESTAMP(3),
    "codigo_estudiante" TEXT,
    "observacion" TEXT,
    "dato_corregido" INTEGER,
    "tacfi" TEXT,
    "especialidad" TEXT,
    "hoja_ruta" INTEGER,

    CONSTRAINT "certificacionTACFI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificacionTCLO" (
    "id" INTEGER NOT NULL,
    "nombre" TEXT,
    "paterno" TEXT,
    "materno" TEXT,
    "cedula" TEXT,
    "taller" TEXT,
    "codigo_esfm" INTEGER,
    "esfm" TEXT,
    "departamento" TEXT,
    "lengua_originaria" TEXT,
    "nivel" TEXT,
    "carga_horaria" INTEGER,
    "gestion" INTEGER,
    "fecha_inicio" TIMESTAMP(3),
    "codigo_estudiante" TEXT,
    "observacion" TEXT,
    "dato_corregido" INTEGER,
    "hoja_ruta" INTEGER,

    CONSTRAINT "certificacionTCLO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "esfms" (
    "id" INTEGER NOT NULL,
    "cod_esfm" INTEGER NOT NULL,
    "type_esfm" TEXT,
    "name" TEXT,
    "department_id" INTEGER,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "address" TEXT,
    "nombre_cert" TEXT,
    "nombre_cert_tclo" TEXT,

    CONSTRAINT "esfms_pkey" PRIMARY KEY ("id")
);
