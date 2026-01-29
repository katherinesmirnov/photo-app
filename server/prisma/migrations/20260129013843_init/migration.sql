-- CreateTable
CREATE TABLE "Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filePath" TEXT NOT NULL,
    "takenDate" DATETIME NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "sectionId" INTEGER,
    CONSTRAINT "Photo_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "totalItems" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Photo_filePath_key" ON "Photo"("filePath");
