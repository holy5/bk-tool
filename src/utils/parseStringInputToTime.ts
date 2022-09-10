export const parseStringInputToTime = (input: string): number | undefined => {
    const time = input.match(/^\d+/g);
    const subfix = input.match(/[A-Za-z]+/g);

    switch (subfix![0]) {
        case "m":
            return +time![0] * 30 * 24 * 60 * 60;
        case "d":
            return +time![0] * 24 * 60 * 60;
        case "w":
            return +time![0] * 7 * 24 * 60 * 60;
        case "h":
            return +time![0] * 60 * 60;
        case "min":
            return +time![0] * 60;
        default:
            return undefined;
    }
};
