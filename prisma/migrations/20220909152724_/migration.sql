/*
  Warnings:

  - You are about to alter the column `startDate` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `endDate` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `timeEnd` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `timeDuration` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `timeUserMidnight` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `timeModified` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "startDate" SET DATA TYPE INTEGER,
ALTER COLUMN "endDate" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "timeEnd" SET DATA TYPE INTEGER,
ALTER COLUMN "timeDuration" SET DATA TYPE INTEGER,
ALTER COLUMN "timeUserMidnight" SET DATA TYPE INTEGER,
ALTER COLUMN "timeModified" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");
