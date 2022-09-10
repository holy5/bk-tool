/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `courseId` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "courseId",
ADD COLUMN     "courseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
