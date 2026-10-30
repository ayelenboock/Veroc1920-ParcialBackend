/*
  Warnings:

  - A unique constraint covering the columns `[nombre,provincia]` on the table `ciudades` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `nombre_ciudad_unico` ON `ciudades`;

-- AlterTable
ALTER TABLE `ciudades` ADD COLUMN `codigo_postal` VARCHAR(8) NULL,
    ADD COLUMN `provincia` VARCHAR(50) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ciudad_provincia_unica` ON `ciudades`(`nombre`, `provincia`);
