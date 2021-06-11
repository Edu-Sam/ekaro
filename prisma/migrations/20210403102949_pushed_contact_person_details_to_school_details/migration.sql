/*
  Warnings:

  - You are about to drop the column `typeID` on the `schools` table. All the data in the column will be lost.
  - You are about to drop the column `contactPersonID` on the `schools` table. All the data in the column will be lost.
  - Added the required column `contactPersonRole` to the `schoolDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPersonName` to the `schoolDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPersonPhone` to the `schoolDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolTypeID` to the `schools` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `schools` DROP FOREIGN KEY `schools_ibfk_5`;

-- DropForeignKey
ALTER TABLE `schools` DROP FOREIGN KEY `schools_ibfk_1`;

-- AlterTable
ALTER TABLE `schoolDetails` ADD COLUMN     `contactPersonRole` VARCHAR(191) NOT NULL,
    ADD COLUMN     `contactPersonName` VARCHAR(191) NOT NULL,
    ADD COLUMN     `contactPersonPhone` VARCHAR(191) NOT NULL,
    ADD COLUMN     `contactPersonEmail` VARCHAR(191);

-- AlterTable
ALTER TABLE `schools` DROP COLUMN `typeID`,
    DROP COLUMN `contactPersonID`,
    ADD COLUMN     `schoolTypeID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `schools` ADD FOREIGN KEY (`schoolTypeID`) REFERENCES `schooltypes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
