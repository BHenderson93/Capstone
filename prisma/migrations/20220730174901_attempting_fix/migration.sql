/*
  Warnings:

  - You are about to drop the column `categories` on the `Mood` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mood" DROP COLUMN "categories",
ADD COLUMN     "category" TEXT[];
