-- AlterTable
ALTER TABLE `Address` MODIFY `additionalInfos` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('admin', 'owner', 'tenant') NULL;

-- CreateTable
CREATE TABLE `Owner` (
    `userId` INTEGER NOT NULL,
    `addressId` INTEGER NULL,

    UNIQUE INDEX `Owner_userId_key`(`userId`),
    UNIQUE INDEX `Owner_addressId_key`(`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tenant` (
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Tenant_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ownership` (
    `ownerId` INTEGER NOT NULL,
    `locationId` INTEGER NOT NULL,
    `acquiredAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ownerId`, `locationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tenancy` (
    `tenantId` INTEGER NOT NULL,
    `locationId` INTEGER NOT NULL,
    `moveInDate` DATETIME(3) NOT NULL,
    `moveOutDate` DATETIME(3) NULL,

    PRIMARY KEY (`tenantId`, `locationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `type` ENUM('appartment', 'house', 'room', 'parking', 'storage') NULL,
    `rooms` INTEGER NULL,
    `addressId` INTEGER NOT NULL,
    `EPD` ENUM('A', 'B', 'C', 'D', 'E', 'F', 'G') NULL,
    `surface` INTEGER NULL,
    `furnished` BOOLEAN NOT NULL DEFAULT false,
    `rented` BOOLEAN NOT NULL DEFAULT false,
    `rent` DECIMAL(65, 30) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Owner` ADD CONSTRAINT `Owner_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Owner` ADD CONSTRAINT `Owner_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tenant` ADD CONSTRAINT `Tenant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ownership` ADD CONSTRAINT `Ownership_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Owner`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ownership` ADD CONSTRAINT `Ownership_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tenancy` ADD CONSTRAINT `Tenancy_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tenancy` ADD CONSTRAINT `Tenancy_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
