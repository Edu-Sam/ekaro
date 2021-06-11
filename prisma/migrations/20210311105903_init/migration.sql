-- CreateTable
CREATE TABLE `userTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `userTypeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
UNIQUE INDEX `users.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schooltypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schoolownerships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `counties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `countyCode` INTEGER NOT NULL,
    `countyName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contractTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `schoolCode` VARCHAR(191) NOT NULL,
    `typeID` INTEGER NOT NULL,
    `ownershipID` INTEGER NOT NULL,
    `countyID` INTEGER NOT NULL,
    `contractTypeID` INTEGER NOT NULL,
    `contractValue` DECIMAL(65, 30) NOT NULL,
    `contactPersonID` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
UNIQUE INDEX `schools_contactPersonID_unique`(`contactPersonID`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schoolDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `schoolID` INTEGER NOT NULL,
    `postalAddress` VARCHAR(191) NOT NULL,
    `physicalAddress` VARCHAR(191) NOT NULL,
    `county` VARCHAR(191) NOT NULL,
    `subCounty` VARCHAR(191) NOT NULL,
    `mpesaPaybill` INTEGER NOT NULL,
    `bank` VARCHAR(191) NOT NULL,
    `branch` VARCHAR(191) NOT NULL,
    `bankAccount` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
UNIQUE INDEX `schoolDetails_schoolID_unique`(`schoolID`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `classNumber` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `StudentID` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `schoolID` INTEGER NOT NULL,
    `studentClassID` INTEGER NOT NULL,
    `feebalance` DECIMAL(65, 30) NOT NULL,
    `gurdianName` VARCHAR(191) NOT NULL,
    `guardianPhone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `charges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chargeName` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `appliesToID` INTEGER NOT NULL,
    `schoolID` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
UNIQUE INDEX `charges_appliesToID_unique`(`appliesToID`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChargeAppliesTo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appliesToName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppliedCharges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chargeTypeID` INTEGER NOT NULL,
    `AppliesToID` INTEGER NOT NULL,
    `schoolID` INTEGER NOT NULL,
    `affectedStudents` INTEGER NOT NULL,
    `chargeAmount` DECIMAL(65, 30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
UNIQUE INDEX `AppliedCharges_AppliesToID_unique`(`AppliesToID`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentLedger` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentID` INTEGER NOT NULL,
    `transactionType` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `chargeType` VARCHAR(191) NOT NULL,
    `transactionDescription` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `transationDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentID` INTEGER NOT NULL,
    `schoolID` INTEGER NOT NULL,
    `paymentMode` VARCHAR(191) NOT NULL,
    `paymentRef` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `chargeTpeID` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `transationDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RawMpesaData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mpesaRef` VARCHAR(191) NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `senderNames` VARCHAR(191) NOT NULL,
    `account` VARCHAR(191),
    `processedStatus` BOOLEAN NOT NULL DEFAULT false,
    `processingResponse` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guardians` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD FOREIGN KEY (`userTypeId`) REFERENCES `userTypes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schools` ADD FOREIGN KEY (`typeID`) REFERENCES `schooltypes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schools` ADD FOREIGN KEY (`ownershipID`) REFERENCES `schoolownerships`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schools` ADD FOREIGN KEY (`countyID`) REFERENCES `counties`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schools` ADD FOREIGN KEY (`contractTypeID`) REFERENCES `contractTypes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schools` ADD FOREIGN KEY (`contactPersonID`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schoolDetails` ADD FOREIGN KEY (`schoolID`) REFERENCES `schools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD FOREIGN KEY (`schoolID`) REFERENCES `schools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD FOREIGN KEY (`studentClassID`) REFERENCES `classes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `charges` ADD FOREIGN KEY (`appliesToID`) REFERENCES `ChargeAppliesTo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `charges` ADD FOREIGN KEY (`schoolID`) REFERENCES `schools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppliedCharges` ADD FOREIGN KEY (`chargeTypeID`) REFERENCES `charges`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppliedCharges` ADD FOREIGN KEY (`AppliesToID`) REFERENCES `ChargeAppliesTo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppliedCharges` ADD FOREIGN KEY (`schoolID`) REFERENCES `schools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentLedger` ADD FOREIGN KEY (`studentID`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD FOREIGN KEY (`studentID`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD FOREIGN KEY (`schoolID`) REFERENCES `schools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD FOREIGN KEY (`chargeTpeID`) REFERENCES `charges`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
