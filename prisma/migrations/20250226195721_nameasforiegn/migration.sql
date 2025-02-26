/*
  Warnings:

  - You are about to drop the column `qpid` on the `questiondetails` table. All the data in the column will be lost.
  - You are about to drop the column `qpid` on the `studentanswers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,roll,q_no]` on the table `studentanswers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `questiondetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `studentanswers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "questiondetails" DROP CONSTRAINT "questiondetails_qpid_fkey";

-- DropForeignKey
ALTER TABLE "studentanswers" DROP CONSTRAINT "studentanswers_qpid_fkey";

-- DropIndex
DROP INDEX "studentanswers_qpid_roll_q_no_key";

-- AlterTable
ALTER TABLE "questiondetails" DROP COLUMN "qpid",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "studentanswers" DROP COLUMN "qpid",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "studentanswers_name_roll_q_no_key" ON "studentanswers"("name", "roll", "q_no");

-- AddForeignKey
ALTER TABLE "questiondetails" ADD CONSTRAINT "questiondetails_name_fkey" FOREIGN KEY ("name") REFERENCES "questionpaper"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentanswers" ADD CONSTRAINT "studentanswers_name_fkey" FOREIGN KEY ("name") REFERENCES "questionpaper"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
