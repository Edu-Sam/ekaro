-- CreateTable
CREATE TABLE `schoolMpesaDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `schoolID` INTEGER NOT NULL,
    `businessShortcode` INTEGER NOT NULL,
    `consumerKey` VARCHAR(191) NOT NULL,
    `consumerSecret` VARCHAR(191) NOT NULL,
    `stkPassKey` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `schoolMpesaDetails` ADD FOREIGN KEY (`schoolID`) REFERENCES `schools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
