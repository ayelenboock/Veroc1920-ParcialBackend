/*
  Warnings:

  - Made the column `codigo_postal` on table `ciudades` required. This step will fail if there are existing NULL values in that column.
  - Made the column `provincia` on table `ciudades` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ciudades` MODIFY `codigo_postal` VARCHAR(8) NOT NULL,
    MODIFY `provincia` VARCHAR(50) NOT NULL;
