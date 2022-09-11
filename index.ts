import {
    getCoursesId,
    getEvents,
    getMessages,
    notifyEvents,
    notifyMessages,
} from "./src/utils/dbFunctions";
import prisma from "./src/utils/prisma";
import { parseStringInputToTime } from "./src/utils/parseStringInputToTime";

const main = async (timeBeforeDue: string) => {
    const coursesIds = await getCoursesId();
    const GET_EVENTS_INTERVAL = parseStringInputToTime("1h")! * 1000;
    const NOTIFY_EVENTS_INTERVAL = parseStringInputToTime("1min")! * 1000;
    const GET_MESSAGES_INTERVAL = parseStringInputToTime("5min")! * 1000;
    const NOTIFY_MESSAGES_INTERVAL = parseStringInputToTime("5min")! * 1000;

    setInterval(async () => {
        await getEvents(coursesIds);
        console.log("Events fetched");
    }, GET_EVENTS_INTERVAL);

    setInterval(async () => {
        await notifyEvents(timeBeforeDue);
        console.log("Events notified");
    }, NOTIFY_EVENTS_INTERVAL);

    setInterval(async () => {
        await getMessages();
        console.log("Messages fetched");
    }, GET_MESSAGES_INTERVAL);

    setInterval(async () => {
        await notifyMessages();
        console.log("Messages notified");
    }, NOTIFY_MESSAGES_INTERVAL);
};

main("1w")
    .catch((e) => {
        console.log(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
