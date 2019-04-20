export default function (direction, current, total) {
    if (direction === "forward") {
        return (current < total) ? (current + 1) : current
    }
    if (direction === "backward") {
        return (current > 0) ? (current - 1) : current
    }
}