/*
  Warnings:

  - A unique constraint covering the columns `[qpid,sid,q_no]` on the table `studentanswers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "studentanswers_qpid_sid_q_no_key" ON "studentanswers"("qpid", "sid", "q_no");
