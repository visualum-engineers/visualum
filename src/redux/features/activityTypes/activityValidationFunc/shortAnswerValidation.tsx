const shortAnswerValidation = (data) =>{
    if(!data.clientAnswer) return true
    //remove whitespace
    const answer = data.clientAnswer.replace(/\s/g, "");

    //return true if answer is unfinished
    //remember empty string are falsey
    return !answer
}
export default shortAnswerValidation