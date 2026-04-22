-- CreateTable
CREATE TABLE `t_personas` (
    `cod_pers` VARCHAR(191) NOT NULL,
    `nombre1` VARCHAR(191) NULL,
    `nombre2` VARCHAR(191) NULL,
    `apellido1` VARCHAR(191) NULL,
    `apellido2` VARCHAR(191) NULL,
    `nro_docum` VARCHAR(191) NULL,

    PRIMARY KEY (`cod_pers`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_ins` (
    `cod_ins` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NULL,
    `nom_ins` VARCHAR(191) NULL,
    `cod_dep` INTEGER NULL,

    PRIMARY KEY (`cod_ins`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
