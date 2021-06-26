/*
  Warnings:

  - You are about to drop the column `paymentMode` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `chargeTpeID` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `chargeType` on the `studentledger` table. All the data in the column will be lost.
  - You are about to drop the `appliedcharges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chargeappliesto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `charges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodID` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runningBalance` to the `StudentLedger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `appliedcharges` DROP FOREIGN KEY `appliedcharges_ibfk_2`;

-- DropForeignKey
ALTER TABLE `appliedcharges` DROP FOREIGN KEY `appliedcharges_ibfk_1`;

-- DropForeignKey
ALTER TABLE `appliedcharges` DROP FOREIGN KEY `appliedcharges_ibfk_3`;

-- DropForeignKey
ALTER TABLE `charges` DROP FOREIGN KEY `charges_ibfk_1`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_ibfk_3`;

-- AlterTable
ALTER TABLE `charges` ADD COLUMN     `description` VARCHAR(191) NOT NULL,
    ADD COLUMN     `classID` INTEGER,
    ADD COLUMN     `studentID` INTEGER;

-- AlterTable
ALTER TABLE `payments` DROP COLUMN `paymentMode`,
    DROP COLUMN `chargeTpeID`,
    ADD COLUMN     `paymentMethodID` INTEGER NOT NULL,
    MODIFY `description` VARCHAR(191);

-- AlterTable
ALTER TABLE `studentledger` DROP COLUMN `chargeType`,
    ADD COLUMN     `chargeID` INTEGER,
    ADD COLUMN     `paymentID` INTEGER,
    ADD COLUMN     `runningBalance` DECIMAL(65, 30) NOT NULL,
    MODIFY `transactionDescription` VARCHAR(191);

-- DropTable
DROP TABLE `appliedcharges`;

-- DropTable
DROP TABLE `chargeappliesto`;

-- CreateTable
CREATE TABLE `applyCharge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `paymentMethods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191),
UNIQUE INDEX `paymentMethods.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `charges` ADD FOREIGN KEY (`appliesToID`) REFERENCES `applyCharge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `charges` ADD FOREIGN KEY (`classID`) REFERENCES `classTypes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `charges` ADD FOREIGN KEY (`studentID`) REFERENCES `students`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD FOREIGN KEY (`paymentMethodID`) REFERENCES `paymentMethods`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentLedger` ADD FOREIGN KEY (`chargeID`) REFERENCES `charges`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentLedger` ADD FOREIGN KEY (`paymentID`) REFERENCES `payments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
