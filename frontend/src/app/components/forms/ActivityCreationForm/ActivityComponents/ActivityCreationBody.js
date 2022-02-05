 import { ActivityCreationQuestion } from "./index"
 import { useSelector} from "react-redux"
 const ActivityCreationBody = ({
    smallWindowWidth,
    mediumWindowWidth,
 }) =>{
    const sidebarToggle = useSelector(state => state.activityCreation.settings.sidebarToggled)

    return(
        <div className={`activity-creation-body`}>
            <div className={`activity-creation-question-container`
                            + `${sidebarToggle ? " move-left": ""}`
                            + `${smallWindowWidth ? " move-down": ""}`
                        }>
                <ActivityCreationQuestion
                    smallWindowWidth={smallWindowWidth}
                    mediumWindowWidth={mediumWindowWidth}
                />
            </div>
        </div>
    )
 }

 export default ActivityCreationBody