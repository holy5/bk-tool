import { Course } from "../interface/course.inteface";
import { Groupedbycourse } from "../interface/event.interface";
import { parseStringInputToTime } from "./parseStringInputToTime";
import prisma from "./prisma";
import sendEmail from "./sendEmail";
import {
    getCalendarEventsByCourses,
    getCoursesByTimeline,
} from "./wsFunctions";

export const writeCoursesToDb = async (courses: Course[]) => {
    for (let course of courses) {
        await prisma.course.upsert({
            where: {
                id: course.id,
            },
            update: {},
            create: {
                id: course.id,
                fullName: course.fullname,
                shortName: course.shortname,
                startDate: course.startdate,
                endDate: course.enddate,
                viewUrl: course.viewurl,
            },
        });
    }
};

export const writeEventsToDb = async (eventGroup: Groupedbycourse[]) => {
    for (let eventObj of eventGroup) {
        for (let event of eventObj.events) {
            if (event) {
                await prisma.event.upsert({
                    where: {
                        id: event.id,
                    },
                    update: {},
                    create: {
                        id: event.id,
                        name: event.name,
                        description: event.description,
                        moduleName: event.modulename,
                        activityName: event.activityname,
                        eventType: event.eventtype,
                        timeEnd: event.timestart,
                        timeDuration: event.timeduration,
                        timeUserMidnight: event.timeusermidnight,
                        timeModified: event.timemodified,
                        viewUrl: event.viewurl,
                        course: {
                            connect: {
                                id: event.course.id,
                            },
                        },
                    },
                });
            }
        }
    }
};

export const getCoursesId = async (): Promise<number[]> => {
    const courses = (await getCoursesByTimeline("inprogress")).courses;
    await writeCoursesToDb(courses);
    const coursesIdObj = await prisma.course.findMany({
        select: {
            id: true,
        },
    });
    const coursesIdArray = coursesIdObj.map(
        (courseId: { id: number }) => courseId.id
    );
    return coursesIdArray;
};

export const getEvents = async (coursesIdArray: number[]) => {
    const groupedCoursesEvents = (
        await getCalendarEventsByCourses(coursesIdArray)
    ).groupedbycourse;
    await writeEventsToDb(groupedCoursesEvents);
};

export const notifyEvents = async (timeToNotify: string): Promise<void> => {
    const parsedTimeToNotify =
        parseStringInputToTime(timeToNotify) || parseStringInputToTime("1w");
    if (parsedTimeToNotify) {
        const eventsDues = await prisma.event.findMany({
            where: {
                AND: [
                    {
                        timeEnd: {
                            lte: Math.round(
                                Date.now() / 1000 + parsedTimeToNotify
                            ),
                        },
                    },
                    {
                        sent: false,
                    },
                ],
            },
            include: {
                course: true,
            },
        });
        for (const eventDue of eventsDues) {
            sendEmail({
                content: eventDue.name,
                subjectName: eventDue.course.fullName,
                name: eventDue.name,
                html: eventDue.description,
                viewUrl: eventDue.viewUrl,
            });
            await prisma.event.update({
                where: {
                    id: eventDue.id,
                },
                data: {
                    sent: true,
                },
            });
        }
    }
};
