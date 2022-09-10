-- CreateTable
CREATE TABLE "Course" (
    "id" BIGINT NOT NULL,
    "fullName" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "startDate" BIGINT NOT NULL,
    "endDate" BIGINT NOT NULL,
    "viewUrl" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,
    "activityName" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "timeEnd" BIGINT NOT NULL,
    "timeDuration" BIGINT NOT NULL,
    "timeUserMidnight" BIGINT NOT NULL,
    "timeModified" BIGINT NOT NULL,
    "courseId" BIGINT NOT NULL,
    "viewUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
