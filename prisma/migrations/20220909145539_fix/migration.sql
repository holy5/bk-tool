/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `courseId` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "courseId" SET DATA TYPE INTEGER;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
