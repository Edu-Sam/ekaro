/*
  Warnings:

  - You are about to drop the column `transationDate` on the `payments` table. All the data in the column will be lost.
  - Added the required column `transactionDate` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payments` DROP COLUMN `transationDate`,
    ADD COLUMN     `transactionDate` DATETIME(3) NOT NULL;
