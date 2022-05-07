/*
    removes all leading and trailing whitespace, 
    and any additional whitespace inside a string
    that isnt being used to space out a word
*/
const removeAddedWhiteSpace = (str: string) =>{
    const newStr = str.replace(/\s+/g, ' ').trim()
    return newStr
}
export default removeAddedWhiteSpace