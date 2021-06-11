/*
  Warnings:

  - Added the required column `userTypeID` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN     `userTypeID` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `userTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD FOREIGN KEY (`userTypeID`) REFERENCES `userTypes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
