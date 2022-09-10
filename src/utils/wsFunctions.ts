import instance from "../axios/instance";
import dotenv from "dotenv";
dotenv.config();
import { wsFunctions } from "../functions/index";
import { serializeString } from "./serializeString";
import { ICourse } from "../interface/course.inteface";
import { IEvent } from "../interface/event.interface";

declare type Timeline = "past" | "inprogress" | "future";

export const getCoursesByTimeline = async (
    timeline: Timeline
): Promise<ICourse> => {
    const res = await instance.post(
        `?wstoken=${process.env.TOKEN}&wsfunction=${wsFunctions.getEnrolledCoursesByTimeLine}&classification=${timeline}&moodlewsrestformat=json`
    );
    return res.data;
};

export const getCalendarEventsByCourses = async (
    courses: number[]
): Promise<IEvent> => {
    const serializedCourses = serializeString("courseids", courses);

    const res = await instance.post(
        `?wstoken=${process.env.TOKEN}&wsfunction=${wsFunctions.getCalendarEventsByCourses}&${serializedCourses}&moodlewsrestformat=json`
    );
    return res.data;
};
