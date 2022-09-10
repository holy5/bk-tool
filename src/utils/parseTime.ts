export default function parseTime(time: number) {
    return new Date(time * 1000).toLocaleString("en-GB");
}
