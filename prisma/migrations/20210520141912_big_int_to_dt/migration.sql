/*
  Warnings:

  - Changed the type of `TransTime` on the `RawMpesaData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `RawMpesaData` DROP COLUMN `TransTime`,
    ADD COLUMN     `TransTime` DATETIME(3) NOT NULL;
