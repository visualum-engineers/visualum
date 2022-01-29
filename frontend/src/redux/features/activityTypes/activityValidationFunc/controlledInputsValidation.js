 import _ from "lodash"
 const controlledInputsValidation = (data) =>{
    //return true if unfinished
    return _.isEmpty(data)
}
export default controlledInputsValidation