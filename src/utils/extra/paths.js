const goodPath =
    window.location.pathname === "/artists" ||
    window.location.pathname === "/tracks" ||
    window.location.pathname === "/not-found" ||
    window.location.pathname === "/";

export default goodPath;