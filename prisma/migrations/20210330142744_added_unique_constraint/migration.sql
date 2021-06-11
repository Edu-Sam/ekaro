/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[typeName]` on the table `contractTypes`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[countyName]` on the table `counties`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[phone]` on the table `guardians`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[paymentRef]` on the table `payments`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[mpesaRef]` on the table `RawMpesaData`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[typeName]` on the table `schoolownerships`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[schoolCode]` on the table `schools`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[typeName]` on the table `schooltypes`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[typeName]` on the table `userTypes`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `contractTypes.typeName_unique` ON `contractTypes`(`typeName`);

-- CreateIndex
CREATE UNIQUE INDEX `counties.countyName_unique` ON `counties`(`countyName`);

-- CreateIndex
CREATE UNIQUE INDEX `guardians.phone_unique` ON `guardians`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `payments.paymentRef_unique` ON `payments`(`paymentRef`);

-- CreateIndex
CREATE UNIQUE INDEX `RawMpesaData.mpesaRef_unique` ON `RawMpesaData`(`mpesaRef`);

-- CreateIndex
CREATE UNIQUE INDEX `schoolownerships.typeName_unique` ON `schoolownerships`(`typeName`);

-- CreateIndex
CREATE UNIQUE INDEX `schools.schoolCode_unique` ON `schools`(`schoolCode`);

-- CreateIndex
CREATE UNIQUE INDEX `schooltypes.typeName_unique` ON `schooltypes`(`typeName`);

-- CreateIndex
CREATE UNIQUE INDEX `userTypes.typeName_unique` ON `userTypes`(`typeName`);
