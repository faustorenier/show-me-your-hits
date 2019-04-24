export default str => {
    return (str.length > 35) ? (str.slice(0, 35) + "...") : str;
}