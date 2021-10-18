import { useState, useEffect } from "react";
const useShuffleArray = (array) => {
    const [shuffleArray, setShuffleArray] = useState()
    useEffect(() => {
        //shuffles our given pairs order
        const shuffleItems = (array) => {   
            let currentIndex = array.length,  randomIndex;
            // While there remain elements to shuffle...
            while (currentIndex !== 0) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
            setShuffleArray(array);
        }
        shuffleItems(array)
    }, [array, shuffleArray]);
    return shuffleArray
}
export default (useShuffleArray)