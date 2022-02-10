import { newMatchKeyPair } from "../dataFormats";
import removeWhiteSpace from "../../../../app/helpers/removeWhiteSpace";

const updateMatchQuestion = ({
    oldData,
    newData
}) =>{
    //console.log(oldData)
    let updatedData,
    keyPairs,
    keyPair,
    keyPairsIndex,
    newKeyValue,
    newAnswerValue

    switch(newData.updateType){
        case "add-key-pair":
            keyPairs = [...oldData.keyPairs]
            keyPairs.push(newMatchKeyPair())
            updatedData = {
                ...oldData, 
                keyPairs: keyPairs
            }
            break;
        case "update-key-pair":
            keyPairsIndex = parseInt(newData.newData.keyPairsIndex)
            keyPair = {...oldData.keyPairs[keyPairsIndex]}

            if(keyPair.id !== newData.newData.id) return
            
            //update with new content
            newKeyValue = removeWhiteSpace(newData.newData.keyValue)
            newAnswerValue = removeWhiteSpace(newData.newData.answerValue)
            keyPair.key.content = newKeyValue
            keyPair.answer.content = newAnswerValue

            //clone objects
            keyPairs = [...oldData.keyPairs]
            keyPairs[keyPairsIndex] = keyPair

            //build a new copy of question data
            updatedData = {
                ...oldData, 
                keyPairs: keyPairs
            }
            break
        case "delete-key-pair":
            keyPairsIndex = newData.newData.keyPairIndex
            keyPairs = [...oldData.keyPairs]
            keyPairs.splice(keyPairsIndex, 1)
            updatedData = {
                ...oldData,
                keyPairs: keyPairs
            }
            break;
        default:
            console.error("invalid update type")
            break
    }
    return updatedData
}
export default updateMatchQuestion