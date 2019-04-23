import posed from "react-pose";

export const modal = {
    bg: posed.div({
        enter: { opacity: 0.9, delay: 250 },
        exit: { opacity: 0, delay: 250 }
    }),
    content: posed.div({
        enter: {
            y: 0,
            opacity: 1,
            transition: {
                default: { type: "spring", stiffness: 300, damping: 15, delay: 500 }
            }
        },
        exit: {
            y: 50,
            opacity: 0,
            transition: {
                y: { type: "spring", stiffness: 300, damping: 15 },
                default: { duration: 250 }
            }
        }
    })
}