/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `roles`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[name]` on the table `userTypes`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `roles.name_unique` ON `roles`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `userTypes.name_unique` ON `userTypes`(`name`);
