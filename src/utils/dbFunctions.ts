import { Course } from "../interface/course.inteface";
import { Groupedbycourse } from "../interface/event.interface";
import { Message } from "../interface/messages.interface";
import { parseStringInputToTime } from "./parseStringInputToTime";
import prisma from "./prisma";
import sendEmail from "./sendEmail";
import {
    fetchCalendarEventsByCourses,
    fetchCoursesByTimeline,
    fetchMessages,
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

export const writeMessagesToDb = async (messages: Message[]) => {
    for (let message of messages) {
        await prisma.message.upsert({
            where: {
                id: message.id,
            },
            update: {},
            create: {
                id: message.id,
                userFrom: message.userfromfullname,
                userTo: message.usertofullname,
                content: message.text,
                messageHtml: message.fullmessagehtml || message.text,
            },
        });
    }
};

export const getCoursesId = async (): Promise<number[]> => {
    const courses = (await fetchCoursesByTimeline("inprogress")).courses;
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
        await fetchCalendarEventsByCourses(coursesIdArray)
    ).groupedbycourse;
    await writeEventsToDb(groupedCoursesEvents);
};

export const notifyEvents = async (timeBeforeDue: string): Promise<void> => {
    const parsedTimeBeforeDue =
        parseStringInputToTime(timeBeforeDue) || parseStringInputToTime("1w");
    if (parsedTimeBeforeDue) {
        const eventsDues = await prisma.event.findMany({
            where: {
                AND: [
                    {
                        timeEnd: {
                            lte: Math.round(
                                Date.now() / 1000 + parsedTimeBeforeDue
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
            const emailOptions = {
                subject: `You have a due in ${eventDue.course.fullName}`,
                content: eventDue.name,
                messageHtml: `
                <div>
                <h2>${eventDue.course.fullName}</h2>
                <h3>${eventDue.name}</h3>
                <h3>Description:</h3>
                <p>${eventDue.description}</p>
                <h3>See:</h3>
                <a href=${eventDue.viewUrl}>${eventDue.viewUrl}</a>
                </div>
                `,
            };
            sendEmail(
                {
                    username: process.env.DUE_MAIL!,
                    password: process.env.DUE_MAIL_PASSWORD!,
                },
                emailOptions
            );
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

export const getMessages = async () => {
    const messages = (await fetchMessages()).messages;
    await writeMessagesToDb(messages);
    return messages;
};

export const notifyMessages = async () => {
    const messages = await prisma.message.findMany({
        where: {
            sent: false,
        },
    });
    for (const message of messages) {
        const emailOptions = {
            subject: `Forwarded message from ${message.userFrom}`,
            messageHtml: `<b>This is a forwarded message from ${message.userFrom} to ${message.userTo}</b>
            ${message.messageHtml}`,
        };
        sendEmail(
            {
                username: process.env.BKEL_MAIL!,
                password: process.env.BKEL_MAIL_PASSWORD!,
            },
            emailOptions
        );
        await prisma.message.update({
            where: {
                id: message.id,
            },
            data: {
                sent: true,
            },
        });
    }
};
