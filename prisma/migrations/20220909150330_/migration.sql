/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "courseId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
