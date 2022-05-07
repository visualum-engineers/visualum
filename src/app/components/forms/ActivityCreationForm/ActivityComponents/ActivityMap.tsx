import SortActivityCreation from "../SortActivity/SortActivityCreation"
import MatchActivityCreation from "../MatchActivity/MatchActivityCreation"
import ShortAnswerCreation from "../ShortAnswer/ShortAnswerCreation"
import ControlledInputsCreation from "../ControlledInputs/ControlledInputsCreation"
import LabelPicturesCreation from "../LabelPictures/LabelPicturesCreation"
const activityMap = (props: any): {[key: string]: JSX.Element} =>{
    return {
        sort: <SortActivityCreation {...props} />,
        matching: <MatchActivityCreation {...props} />,
        shortAnswer: <ShortAnswerCreation {...props} />,
        radio: <ControlledInputsCreation {...props}  />,
        checkbox: <ControlledInputsCreation {...props} inputType = "checkbox" />,
        labelPictures: <LabelPicturesCreation {...props} />
    }
}
export default activityMap