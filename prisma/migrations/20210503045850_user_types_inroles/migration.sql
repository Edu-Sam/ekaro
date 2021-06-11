/*
  Warnings:

  - Added the required column `userTypeID` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `roles` ADD COLUMN     `userTypeID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `roles` ADD FOREIGN KEY (`userTypeID`) REFERENCES `userTypes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
