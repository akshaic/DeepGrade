-- CreateTable
CREATE TABLE "query" (
    "query_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roll" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "query_pkey" PRIMARY KEY ("query_id")
);

-- AddForeignKey
ALTER TABLE "query" ADD CONSTRAINT "query_name_fkey" FOREIGN KEY ("name") REFERENCES "questionpaper"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "query" ADD CONSTRAINT "query_roll_fkey" FOREIGN KEY ("roll") REFERENCES "Student"("roll") ON DELETE RESTRICT ON UPDATE CASCADE;
