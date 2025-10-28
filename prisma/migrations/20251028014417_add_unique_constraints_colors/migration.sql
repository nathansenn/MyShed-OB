/*
  Warnings:

  - You are about to drop the column `sidingType` on the `SidingColor` table. All the data in the column will be lost.
  - Added the required column `material` to the `SidingColor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RoofColor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "colorCode" TEXT,
    "imageUrl" TEXT,
    "additionalPrice" REAL DEFAULT 0,
    "allowedStyles" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RoofColor_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RoofColor" ("additionalPrice", "allowedStyles", "clientId", "colorCode", "createdAt", "id", "imageUrl", "name", "updatedAt") SELECT "additionalPrice", "allowedStyles", "clientId", "colorCode", "createdAt", "id", "imageUrl", "name", "updatedAt" FROM "RoofColor";
DROP TABLE "RoofColor";
ALTER TABLE "new_RoofColor" RENAME TO "RoofColor";
CREATE INDEX "RoofColor_clientId_idx" ON "RoofColor"("clientId");
CREATE UNIQUE INDEX "RoofColor_clientId_name_key" ON "RoofColor"("clientId", "name");
CREATE TABLE "new_SidingColor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "colorCode" TEXT,
    "imageUrl" TEXT,
    "additionalPrice" REAL DEFAULT 0,
    "material" TEXT NOT NULL,
    "allowedStyles" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SidingColor_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SidingColor" ("additionalPrice", "allowedStyles", "clientId", "colorCode", "createdAt", "id", "imageUrl", "name", "updatedAt") SELECT "additionalPrice", "allowedStyles", "clientId", "colorCode", "createdAt", "id", "imageUrl", "name", "updatedAt" FROM "SidingColor";
DROP TABLE "SidingColor";
ALTER TABLE "new_SidingColor" RENAME TO "SidingColor";
CREATE INDEX "SidingColor_clientId_idx" ON "SidingColor"("clientId");
CREATE UNIQUE INDEX "SidingColor_clientId_name_material_key" ON "SidingColor"("clientId", "name", "material");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
