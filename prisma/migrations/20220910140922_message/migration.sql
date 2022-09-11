/*
  Warnings:

  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Messages";

-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL,
    "userFrom" TEXT NOT NULL,
    "userTo" TEXT NOT NULL,
    "content" TEXT,
    "messageHtml" TEXT,
    "sent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
