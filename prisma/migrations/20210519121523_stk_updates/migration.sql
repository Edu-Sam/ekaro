/*
  Warnings:

  - You are about to drop the column `TransactionDate` on the `stkTransactions` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `stkTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stkTransactions` DROP COLUMN `TransactionDate`,
    ADD COLUMN     `updatedAt` DATETIME(3) NOT NULL;
