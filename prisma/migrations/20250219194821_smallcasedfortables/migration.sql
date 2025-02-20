/*
  Warnings:

  - You are about to drop the `QuestionDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionPaper` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentAnswers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionDetails" DROP CONSTRAINT "QuestionDetails_qpid_fkey";

-- DropForeignKey
ALTER TABLE "StudentAnswers" DROP CONSTRAINT "StudentAnswers_qpid_fkey";

-- DropForeignKey
ALTER TABLE "StudentAnswers" DROP CONSTRAINT "StudentAnswers_sid_fkey";

-- DropTable
DROP TABLE "QuestionDetails";

-- DropTable
DROP TABLE "QuestionPaper";

-- DropTable
DROP TABLE "StudentAnswers";

-- CreateTable
CREATE TABLE "questionpaper" (
    "qpid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "questionpaper_pkey" PRIMARY KEY ("qpid")
);

-- CreateTable
CREATE TABLE "questiondetails" (
    "qd_id" TEXT NOT NULL,
    "qpid" TEXT NOT NULL,
    "q_no" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "evaluationCriteria" TEXT NOT NULL,

    CONSTRAINT "questiondetails_pkey" PRIMARY KEY ("qd_id")
);

-- CreateTable
CREATE TABLE "studentanswers" (
    "sa_id" TEXT NOT NULL,
    "qpid" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "q_no" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "studentanswers_pkey" PRIMARY KEY ("sa_id")
);

-- AddForeignKey
ALTER TABLE "questiondetails" ADD CONSTRAINT "questiondetails_qpid_fkey" FOREIGN KEY ("qpid") REFERENCES "questionpaper"("qpid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentanswers" ADD CONSTRAINT "studentanswers_qpid_fkey" FOREIGN KEY ("qpid") REFERENCES "questionpaper"("qpid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentanswers" ADD CONSTRAINT "studentanswers_sid_fkey" FOREIGN KEY ("sid") REFERENCES "Student"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;
