-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mood" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    CONSTRAINT "Mood_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Mood" ("categories", "createdById", "id", "name", "price") SELECT "categories", "createdById", "id", "name", "price" FROM "Mood";
DROP TABLE "Mood";
ALTER TABLE "new_Mood" RENAME TO "Mood";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
