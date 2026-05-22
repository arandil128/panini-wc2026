-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Sticker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sectionId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "playerName" TEXT,
    "description" TEXT,
    "isSpecial" BOOLEAN NOT NULL DEFAULT false,
    "isBadge" BOOLEAN NOT NULL DEFAULT false,
    "isTeamPhoto" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Sticker_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CollectionEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stickerId" TEXT NOT NULL,
    "pastedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CollectionEntry_stickerId_fkey" FOREIGN KEY ("stickerId") REFERENCES "Sticker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Duplicate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stickerId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Duplicate_stickerId_fkey" FOREIGN KEY ("stickerId") REFERENCES "Sticker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Section_order_key" ON "Section"("order");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionEntry_stickerId_key" ON "CollectionEntry"("stickerId");

-- CreateIndex
CREATE UNIQUE INDEX "Duplicate_stickerId_key" ON "Duplicate"("stickerId");
