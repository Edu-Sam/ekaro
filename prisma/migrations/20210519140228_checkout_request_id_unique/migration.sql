/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[CheckoutRequestID]` on the table `stkTransactions`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `stkTransactions.CheckoutRequestID_unique` ON `stkTransactions`(`CheckoutRequestID`);
