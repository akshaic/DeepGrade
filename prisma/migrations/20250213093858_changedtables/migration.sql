/*
  Warnings:

  - The primary key for the `QuestionPaper` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `QuestionPaper` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `QuestionPaper` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `QuestionPaper` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EvaluationCriteria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `QuestionPaper` table without a default value. This is not possible if the table is not empty.
  - The required column `qpid` was added to the `QuestionPaper` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.
  - The required column `sid` was added to the `Student` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_studentId_fkey";

-- DropForeignKey
ALTER TABLE "EvaluationCriteria" DROP CONSTRAINT "EvaluationCriteria_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_questionPaperId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionPaper" DROP CONSTRAINT "QuestionPaper_subjectId_fkey";

-- AlterTable
ALTER TABLE "QuestionPaper" DROP CONSTRAINT "QuestionPaper_pkey",
DROP COLUMN "id",
DROP COLUMN "subjectId",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "qpid" TEXT NOT NULL,
ADD CONSTRAINT "QuestionPaper_pkey" PRIMARY KEY ("qpid");

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "id",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "sid" TEXT NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("sid");

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "EvaluationCriteria";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "Subject";

-- CreateTable
CREATE TABLE "QuestionDetails" (
    "qd_id" TEXT NOT NULL,
    "qpid" TEXT NOT NULL,
    "q_no" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "evaluationCriteria" TEXT NOT NULL,

    CONSTRAINT "QuestionDetails_pkey" PRIMARY KEY ("qd_id")
);

-- CreateTable
CREATE TABLE "StudentAnswers" (
    "sa_id" TEXT NOT NULL,
    "qpid" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "q_no" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "StudentAnswers_pkey" PRIMARY KEY ("sa_id")
);

-- AddForeignKey
ALTER TABLE "QuestionDetails" ADD CONSTRAINT "QuestionDetails_qpid_fkey" FOREIGN KEY ("qpid") REFERENCES "QuestionPaper"("qpid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswers" ADD CONSTRAINT "StudentAnswers_qpid_fkey" FOREIGN KEY ("qpid") REFERENCES "QuestionPaper"("qpid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswers" ADD CONSTRAINT "StudentAnswers_sid_fkey" FOREIGN KEY ("sid") REFERENCES "Student"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;
