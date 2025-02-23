/*
  Warnings:

  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `sid` on the `studentanswers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roll]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[qpid,roll,q_no]` on the table `studentanswers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roll` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roll` to the `studentanswers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "studentanswers" DROP CONSTRAINT "studentanswers_sid_fkey";

-- DropIndex
DROP INDEX "studentanswers_qpid_sid_q_no_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "roll" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "studentanswers" DROP COLUMN "sid",
ADD COLUMN     "roll" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_roll_key" ON "Student"("roll");

-- CreateIndex
CREATE UNIQUE INDEX "studentanswers_qpid_roll_q_no_key" ON "studentanswers"("qpid", "roll", "q_no");

-- AddForeignKey
ALTER TABLE "studentanswers" ADD CONSTRAINT "studentanswers_roll_fkey" FOREIGN KEY ("roll") REFERENCES "Student"("roll") ON DELETE RESTRICT ON UPDATE CASCADE;
