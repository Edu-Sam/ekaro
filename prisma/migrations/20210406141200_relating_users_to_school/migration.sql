/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[schoolID]` on the table `users`. If there are existing duplicate values, the migration will fail.
  - Added the required column `schoolID` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN     `schoolID` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_schoolID_unique` ON `users`(`schoolID`);

-- AddForeignKey
ALTER TABLE `users` ADD FOREIGN KEY (`schoolID`) REFERENCES `schools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
