/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userTypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_2`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;

-- DropTable
DROP TABLE `users`;

-- DropTable
DROP TABLE `userTypes`;

-- CreateTable
CREATE TABLE `fintchUsers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
UNIQUE INDEX `fintchUsers.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schoolUsers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `schoolID` INTEGER NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
UNIQUE INDEX `schoolUsers.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `schoolUsers` ADD FOREIGN KEY (`schoolID`) REFERENCES `schools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
