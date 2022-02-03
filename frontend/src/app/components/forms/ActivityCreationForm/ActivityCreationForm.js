import ActivityCreationOverallPopUp from "./ActivityOverviewPopUp/ActivityCreationOverallPopUp"
import MiniScreenSideBar from "../../utilities/miniScreenSidebar/MiniScreenSiderbar"
import useActivityMiniScreenData from "./hooks/use-activity-miniscreen-data"

import { useWindowWidth } from "../../../hooks"
const ActivityCreationForm = () =>{
    const smallWindowWidth = useWindowWidth(576) 
    const mediumWindowWidth = useWindowWidth(992)
    const miniScreenData = useActivityMiniScreenData()
    return(
        <div>
            <ActivityCreationOverallPopUp 
                smallWindowWidth={smallWindowWidth}
                mediumWindowWidth={mediumWindowWidth}
            />
            <MiniScreenSideBar 
                {...miniScreenData}
            />
            <div>   
            
            </div>
            <div>

            </div>
        </div>
    )
}

export default ActivityCreationForm