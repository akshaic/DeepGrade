/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `questionpaper` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `questionpaper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questionpaper" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "questionpaper_name_key" ON "questionpaper"("name");
