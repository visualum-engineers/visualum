const shuffleItems = (array: []) => {
    let newArr = [...array]   
    let currentIndex = newArr.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [newArr[currentIndex], newArr[randomIndex]] = [
        newArr[randomIndex], newArr[currentIndex]];
    }
    return newArr
}
export default (shuffleItems)