import instance from "../axios/instance";
import dotenv from "dotenv";
dotenv.config();
import { wsFunctions } from "../functions/index";
import { serializeString } from "./serializeString";
import { ICourse } from "../interface/course.inteface";
import { IEvent } from "../interface/event.interface";
import { IMessage } from "../interface/messages.interface";

declare type Timeline = "past" | "inprogress" | "future";

export const fetchCoursesByTimeline = async (
    timeline: Timeline
): Promise<ICourse> => {
    const res = await instance.post(
        `?wstoken=${process.env.TOKEN}&wsfunction=${wsFunctions.getEnrolledCoursesByTimeLine}&classification=${timeline}&moodlewsrestformat=json`
    );
    return res.data;
};

export const fetchCalendarEventsByCourses = async (
    courses: number[]
): Promise<IEvent> => {
    const serializedCourses = serializeString("courseids", courses);

    const res = await instance.post(
        `?wstoken=${process.env.TOKEN}&wsfunction=${wsFunctions.getCalendarEventsByCourses}&${serializedCourses}&moodlewsrestformat=json`
    );
    return res.data;
};

export const fetchMessages = async (): Promise<IMessage> => {
    const res = await instance.get(
        `?wstoken=${process.env.TOKEN}&wsfunction=${wsFunctions.getMessages}&useridto=${process.env.USER_ID}&read=0&type=both&moodlewsrestformat=json`
    );
    return res.data;
};
