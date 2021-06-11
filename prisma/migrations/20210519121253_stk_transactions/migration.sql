-- CreateTable
CREATE TABLE `stkTransactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `accountReference` VARCHAR(191) NOT NULL,
    `transactionDesc` VARCHAR(191) NOT NULL,
    `MerchantRequestID` VARCHAR(191) NOT NULL,
    `CheckoutRequestID` VARCHAR(191) NOT NULL,
    `initResponseCode` VARCHAR(191) NOT NULL,
    `ResponseDescription` VARCHAR(191) NOT NULL,
    `cbResultCode` VARCHAR(191),
    `cbResultDesc` VARCHAR(191),
    `MpesaReceiptNumber` VARCHAR(191),
    `TransactionDate` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cbMetaData` JSON,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
