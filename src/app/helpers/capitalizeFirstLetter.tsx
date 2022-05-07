const capitalizeFirstLetter = (str: string) =>{
    const newStr = str[0].toUpperCase() + str.slice(1, str.length)
    return newStr
}
export default capitalizeFirstLetter