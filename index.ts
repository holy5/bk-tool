import { getCoursesId, getEvents, notifyEvents } from "./src/utils/dbFunctions";
import prisma from "./src/utils/prisma";
import { parseStringInputToTime } from "./src/utils/parseStringInputToTime";

const main = async (timeToNotify: string) => {
    const coursesIds = await getCoursesId();
    const GET_EVENTS_INTERVAL = parseStringInputToTime("1h")! * 1000;
    const NOTIFY_INTERVAL = parseStringInputToTime("1min")! * 1000;

    setInterval(async () => {
        await getEvents(coursesIds);
    }, GET_EVENTS_INTERVAL);

    setInterval(async () => {
        await notifyEvents(timeToNotify);
    }, NOTIFY_INTERVAL);
};

main("1w")
    .catch((e) => {
        console.log(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
