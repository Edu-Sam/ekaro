/*
  Warnings:

  - You are about to drop the column `mpesaRef` on the `RawMpesaData` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDate` on the `RawMpesaData` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `RawMpesaData` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `RawMpesaData` table. All the data in the column will be lost.
  - You are about to drop the column `senderNames` on the `RawMpesaData` table. All the data in the column will be lost.
  - You are about to drop the column `account` on the `RawMpesaData` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[TransID]` on the table `RawMpesaData`. If there are existing duplicate values, the migration will fail.
  - Added the required column `TransID` to the `RawMpesaData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessShortCode` to the `RawMpesaData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TransactionType` to the `RawMpesaData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TransTime` to the `RawMpesaData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MSISDN` to the `RawMpesaData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TransAmount` to the `RawMpesaData` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `RawMpesaData.mpesaRef_unique` ON `RawMpesaData`;

-- AlterTable
ALTER TABLE `RawMpesaData` DROP COLUMN `mpesaRef`,
    DROP COLUMN `paymentDate`,
    DROP COLUMN `phone`,
    DROP COLUMN `amount`,
    DROP COLUMN `senderNames`,
    DROP COLUMN `account`,
    ADD COLUMN     `TransID` VARCHAR(191) NOT NULL,
    ADD COLUMN     `BusinessShortCode` VARCHAR(191) NOT NULL,
    ADD COLUMN     `TransactionType` VARCHAR(191) NOT NULL,
    ADD COLUMN     `TransTime` BIGINT NOT NULL,
    ADD COLUMN     `MSISDN` VARCHAR(191) NOT NULL,
    ADD COLUMN     `TransAmount` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN     `OrgAccountBalance` DECIMAL(65, 30),
    ADD COLUMN     `payeeNames` VARCHAR(191),
    ADD COLUMN     `BillRefNumber` VARCHAR(191),
    ADD COLUMN     `processedTime` DATETIME(3);

-- AlterTable
ALTER TABLE `stkTransactions` ADD COLUMN     `processedTime` DATETIME(3),
    ADD COLUMN     `processingResponse` VARCHAR(191);

-- CreateIndex
CREATE UNIQUE INDEX `RawMpesaData.TransID_unique` ON `RawMpesaData`(`TransID`);
