export default (array, current) => {
    array = Array.from(array);
    const target = array.find(el => el.id === current.id);
    const index = array.indexOf(target);
    return array.slice(index + 1).slice(0, 4)
}