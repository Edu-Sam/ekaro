/*
  Warnings:

  - Added the required column `schoolTypeID` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `classes` ADD COLUMN     `schoolTypeID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `classes` ADD FOREIGN KEY (`schoolTypeID`) REFERENCES `schooltypes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
