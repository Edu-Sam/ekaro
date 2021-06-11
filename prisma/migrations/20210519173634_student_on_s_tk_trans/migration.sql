/*
  Warnings:

  - Added the required column `studentRegNo` to the `stkTransactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolID` to the `stkTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stkTransactions` ADD COLUMN     `studentRegNo` VARCHAR(191) NOT NULL,
    ADD COLUMN     `schoolID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `stkTransactions` ADD FOREIGN KEY (`schoolID`) REFERENCES `schools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
