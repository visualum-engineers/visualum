import ActivityCreationOverallPopUp from "./ActivityOverviewPopUp/ActivityCreationOverallPopUp"
import { useWindowWidth } from "../../../hooks"
const ActivityCreationForm = () =>{
    const smallWindowWidth = useWindowWidth(576) 
    const mediumWindowWidth = useWindowWidth(992)
    return(
        <div>
            <ActivityCreationOverallPopUp 
                smallWindowWidth={smallWindowWidth}
                mediumWindowWidth={mediumWindowWidth}
            />
            <div>   
            
            </div>
            <div>

            </div>
        </div>
    )
}

export default ActivityCreationForm