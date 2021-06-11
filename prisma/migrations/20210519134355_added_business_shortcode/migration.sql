/*
  Warnings:

  - Added the required column `BusinessShortCode` to the `stkTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stkTransactions` ADD COLUMN     `BusinessShortCode` VARCHAR(191) NOT NULL;
