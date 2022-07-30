/*
  Warnings:

  - You are about to drop the column `category` on the `Mood` table. All the data in the column will be lost.
  - Added the required column `categories` to the `Mood` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mood" DROP COLUMN "category",
ADD COLUMN     "categories" TEXT NOT NULL;
