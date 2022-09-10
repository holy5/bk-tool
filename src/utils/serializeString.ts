export const serializeString = (stringPrefix: string, data: any) => {
    const stringArray = data.map((item: any, index: number) => {
        return `${stringPrefix}[${index}]=${item}`;
    });
    return stringArray.join("&");
};
