-- CreateTable
CREATE TABLE "Messages" (
    "id" INTEGER NOT NULL,
    "userFrom" TEXT NOT NULL,
    "userTo" TEXT NOT NULL,
    "content" TEXT,
    "messageHtml" TEXT,
    "sent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);
