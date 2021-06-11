/*
  Warnings:

  - You are about to drop the `classes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `classes` DROP FOREIGN KEY `classes_ibfk_1`;

-- DropForeignKey
ALTER TABLE `students` DROP FOREIGN KEY `students_ibfk_2`;

-- DropTable
DROP TABLE `classes`;

-- CreateTable
CREATE TABLE `classTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `classNumber` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `schoolTypeID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `classTypes` ADD FOREIGN KEY (`schoolTypeID`) REFERENCES `schooltypes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD FOREIGN KEY (`studentClassID`) REFERENCES `classTypes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
