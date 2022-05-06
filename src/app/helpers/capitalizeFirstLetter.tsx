const capitalizeFirstLetter = (str) =>{
    const newStr = str[0].toUpperCase() + str.slice(1, str.length)
    return newStr
}
export default capitalizeFirstLetter