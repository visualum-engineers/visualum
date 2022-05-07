
import { ActivityQuestionHeader } from "./"

import activitiesMap from "./ActivityMap"
const ActivityCreationQuestion = (props: any) =>{
    const activityMap = activitiesMap(props)
    return (
        <div className={`activity-creation-question` 
                    +`${props.preview ? " preview-slide":""}`
                }>
            {!props.preview && 
                <ActivityQuestionHeader 
                    {...props}
                />
            }

            <div className="activity-creation-question-body">
                {activityMap[props.questionType]}
            </div>
        </div>
    )
}

export default ActivityCreationQuestion