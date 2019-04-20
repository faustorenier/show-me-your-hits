export default message => {
    if (window.confirm(message)) {
        localStorage.removeItem("syh_access_token");
        window.location.href = "/";
    }
    else { console.log("not confirmed"); }
}



