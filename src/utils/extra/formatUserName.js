export default user => {
    const username = user.display_name.split(" ")[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
}