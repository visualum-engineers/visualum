import ActivityCreationOverallPopUp from "./ActivityOverviewPopUp/ActivityCreationOverallPopUp"
import MiniScreenSideBar from "../../utilities/miniScreenSidebar/MiniScreenSiderbar"
import useActivityMiniScreenData from "./hooks/use-activity-miniscreen-data"

import { useWindowWidth } from "../../../hooks"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { updateActivityName } from "../../../../redux/features/activityCreation/activityCreationData"
const ActivityCreationForm = () =>{
    const smallWindowWidth = useWindowWidth(576) 
    const mediumWindowWidth = useWindowWidth(992)
    const miniScreenData = useActivityMiniScreenData()
    const dispatch = useDispatch()
    const activityName = useSelector(state=>state.activityCreation.data.saved.present.activityName)
    
    useEffect(()=>{
        let isMounted = true
        
        if((!activityName || activityName.length <= 0) && isMounted){
            dispatch(updateActivityName("Untitled"))
        }
        return() => {isMounted = false}
    }, [dispatch, activityName])
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