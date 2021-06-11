/*
  Warnings:

  - You are about to drop the column `StudentID` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `feebalance` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `gurdianName` on the `students` table. All the data in the column will be lost.
  - Added the required column `studentID` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feeBalance` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guardianName` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `students` DROP COLUMN `StudentID`,
    DROP COLUMN `feebalance`,
    DROP COLUMN `gurdianName`,
    ADD COLUMN     `studentID` VARCHAR(191) NOT NULL,
    ADD COLUMN     `feeBalance` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN     `guardianName` VARCHAR(191) NOT NULL;
