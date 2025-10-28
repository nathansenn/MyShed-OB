-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "ownerName" TEXT,
    "contactNumber" TEXT,
    "emailAddress" TEXT,
    "websiteLink" TEXT,
    "fullAddress" TEXT,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "overallProgress" REAL NOT NULL DEFAULT 0,
    "completedFields" INTEGER NOT NULL DEFAULT 0,
    "totalFields" INTEGER NOT NULL DEFAULT 84,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "zipCode" TEXT,
    "phoneNumber" TEXT,
    "storeHours" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Store_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SystemUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "emailAddress" TEXT,
    "phoneNumbers" TEXT,
    "salesCommission" TEXT,
    "assignedStore" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SystemUser_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BuildingStyle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "myshedCatalogCode" TEXT,
    "description" TEXT,
    "images" TEXT,
    "progress" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'incomplete',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "compatibleDoors" TEXT,
    "compatibleWindows" TEXT,
    "compatibleRoofing" TEXT,
    "compatibleSiding" TEXT,
    CONSTRAINT "BuildingStyle_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PricingMatrix" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buildingStyleId" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "depth" INTEGER NOT NULL,
    "material" TEXT NOT NULL,
    "basePrice" REAL NOT NULL,
    "sku" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PricingMatrix_buildingStyleId_fkey" FOREIGN KEY ("buildingStyleId") REFERENCES "BuildingStyle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Door" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "myshedCatalogCode" TEXT,
    "myshedCatalogImage" TEXT,
    "basePrice" REAL,
    "pricingType" TEXT,
    "isStandard" BOOLEAN NOT NULL DEFAULT false,
    "allowedStyles" TEXT,
    "progress" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'incomplete',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Door_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Window" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "myshedCatalogCode" TEXT,
    "myshedCatalogImage" TEXT,
    "basePrice" REAL,
    "pricingType" TEXT,
    "isStandard" BOOLEAN NOT NULL DEFAULT false,
    "allowedStyles" TEXT,
    "progress" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'incomplete',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Window_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RoofColor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "colorCode" TEXT,
    "imageUrl" TEXT,
    "additionalPrice" REAL,
    "allowedStyles" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RoofColor_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SidingColor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "colorCode" TEXT,
    "imageUrl" TEXT,
    "additionalPrice" REAL,
    "sidingType" TEXT,
    "allowedStyles" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SidingColor_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TrimColor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "colorCode" TEXT,
    "imageUrl" TEXT,
    "additionalPrice" REAL,
    "trimType" TEXT,
    "allowedStyles" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TrimColor_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InteriorOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "optionType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT,
    "pricePerFoot" REAL,
    "basePrice" REAL,
    "allowedStyles" TEXT,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "InteriorOption_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PorchOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "myshedCatalogCode" TEXT,
    "porchType" TEXT,
    "basePrice" REAL,
    "pricePerFoot" REAL,
    "isStained" BOOLEAN NOT NULL DEFAULT false,
    "paintColors" TEXT,
    "allowedStyles" TEXT,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PorchOption_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompanyDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "mainAddress" TEXT,
    "phoneNumber" TEXT,
    "emailAddress" TEXT,
    "timezone" TEXT,
    "businessHours" TEXT,
    "companyBackground" TEXT,
    "logoUrl" TEXT,
    "disclaimers" TEXT,
    "buildingSerialFormat" TEXT,
    "stripePublishableKey" TEXT,
    "stripeSecretKey" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CompanyDetails_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TaxInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "taxPercentage" REAL,
    "useTaxJar" BOOLEAN NOT NULL DEFAULT false,
    "taxJarApiToken" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TaxInfo_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DeliveryOptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "offersDelivery" BOOLEAN NOT NULL DEFAULT true,
    "freeDeliveryRadius" INTEGER,
    "pricePerMile" REAL,
    "deliveryMethod" TEXT,
    "buildTimeline" TEXT,
    "siteRequirements" TEXT,
    "serviceArea" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DeliveryOptions_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FinancingOptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "offersFinancing" BOOLEAN NOT NULL DEFAULT false,
    "financingDetails" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FinancingOptions_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PaymentInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "acceptedMethods" TEXT,
    "depositPercentage" INTEGER,
    "depositRefundable" BOOLEAN NOT NULL DEFAULT true,
    "cancellationPolicy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PaymentInfo_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CatalogDoor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CatalogWindow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CatalogBuildingStyle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "category" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CatalogPorch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CatalogSiding" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CatalogTrim" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CatalogRoofing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CatalogShelf" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_slug_key" ON "Client"("slug");

-- CreateIndex
CREATE INDEX "Store_clientId_idx" ON "Store"("clientId");

-- CreateIndex
CREATE INDEX "SystemUser_clientId_idx" ON "SystemUser"("clientId");

-- CreateIndex
CREATE INDEX "BuildingStyle_clientId_idx" ON "BuildingStyle"("clientId");

-- CreateIndex
CREATE INDEX "PricingMatrix_buildingStyleId_idx" ON "PricingMatrix"("buildingStyleId");

-- CreateIndex
CREATE INDEX "Door_clientId_idx" ON "Door"("clientId");

-- CreateIndex
CREATE INDEX "Window_clientId_idx" ON "Window"("clientId");

-- CreateIndex
CREATE INDEX "RoofColor_clientId_idx" ON "RoofColor"("clientId");

-- CreateIndex
CREATE INDEX "SidingColor_clientId_idx" ON "SidingColor"("clientId");

-- CreateIndex
CREATE INDEX "TrimColor_clientId_idx" ON "TrimColor"("clientId");

-- CreateIndex
CREATE INDEX "InteriorOption_clientId_idx" ON "InteriorOption"("clientId");

-- CreateIndex
CREATE INDEX "PorchOption_clientId_idx" ON "PorchOption"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyDetails_clientId_key" ON "CompanyDetails"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "TaxInfo_clientId_key" ON "TaxInfo"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryOptions_clientId_key" ON "DeliveryOptions"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "FinancingOptions_clientId_key" ON "FinancingOptions"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentInfo_clientId_key" ON "PaymentInfo"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogDoor_code_key" ON "CatalogDoor"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogWindow_code_key" ON "CatalogWindow"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogBuildingStyle_code_key" ON "CatalogBuildingStyle"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogPorch_code_key" ON "CatalogPorch"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogSiding_code_key" ON "CatalogSiding"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogTrim_code_key" ON "CatalogTrim"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogRoofing_code_key" ON "CatalogRoofing"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogShelf_code_key" ON "CatalogShelf"("code");
