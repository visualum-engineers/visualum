import {
    ActivityCreationOverallPopUp,
    ActivityCreationNavbar,
    ActivityCreationSidebar, 
    ActivityCreationBody,
} from "./ActivityComponents/index"
import { useWindowWidth } from "../../../hooks"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { updateActivityName } from "../../../../redux/features/activityCreation/activityCreationData"
const ActivityCreationForm = () =>{
    const smallWindowWidth = useWindowWidth(576) 
    const mediumWindowWidth = useWindowWidth(992)
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
        <>
            <ActivityCreationNavbar 
                smallWindowWidth={smallWindowWidth}
            /> 
            <ActivityCreationOverallPopUp
                smallWindowWidth={smallWindowWidth}
                mediumWindowWidth={mediumWindowWidth}
            /> 
            <ActivityCreationSidebar 
                mediumWindowWidth={mediumWindowWidth}
            />
            <ActivityCreationBody 
                smallWindowWidth = {smallWindowWidth}
                mediumWindowWidth ={mediumWindowWidth}
            />
        </>
    )
}

export default ActivityCreationForm