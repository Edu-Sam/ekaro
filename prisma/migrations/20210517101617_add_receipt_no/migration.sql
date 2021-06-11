/*
  Warnings:

  - Added the required column `receiptNo` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payments` ADD COLUMN     `servedByID` INTEGER,
    ADD COLUMN     `receiptNo` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `payments` ADD FOREIGN KEY (`servedByID`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
