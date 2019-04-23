export default function (type) {
    return {
        message: type === "artists" ? "What about the best tracks? :O" : "Did you see the top artists yet? :Q__",
        cta: type === "artists" ? "See top tracks" : "See top artists",
        link: type === "artists" ? "/tracks" : "/artists"
    }
}