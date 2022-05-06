/* spaces out a long str of camel case
* into seperate words, and capitalizes first word in string
*/
const spaceOutCamelCase = (str) =>{
    //create array of words in upper case
    const firstWordRegex = /[a-z]*/
    const allOtherWordsRegex = /[A-Z][a-z]*/g
    const firstWord = str.match(firstWordRegex)
    const allOtherWords = str.match(allOtherWordsRegex)
    const words =  allOtherWords ? [...firstWord, ...allOtherWords] : [...firstWord]

    const newStr = words.reduce((prev,curr) => {
        const capitalize = curr[0].toUpperCase() + curr.substring(1, curr.length)   
        return prev + " " + capitalize
    }, "")
    return newStr
}

export default spaceOutCamelCase