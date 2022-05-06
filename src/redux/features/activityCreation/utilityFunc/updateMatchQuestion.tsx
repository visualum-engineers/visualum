import { newMatchKeyPair } from "../dataFormats";
import removeWhiteSpace from "../../../../app/helpers/removeWhiteSpace";

const updateMatchQuestion = ({
    oldData,
    newData
}) =>{
    //console.log(oldData)
    let updatedData,
    oldKeyPair,
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
            //update with new content
            newKeyValue = removeWhiteSpace(newData.newData.keyValue)
            newAnswerValue = removeWhiteSpace(newData.newData.answerValue)
            keyPairsIndex = parseInt(newData.newData.keyPairsIndex)

            oldKeyPair = oldData.keyPairs[keyPairsIndex]

            //means nothing has changed
            //this also maintains history stack
            if(newKeyValue === oldKeyPair.key.content && newAnswerValue === oldKeyPair.answer.content) return

            keyPair = {...oldKeyPair}
            if(keyPair.id !== newData.newData.id) return
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