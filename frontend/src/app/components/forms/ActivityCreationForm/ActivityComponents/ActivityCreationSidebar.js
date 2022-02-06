import MiniScreenSideBar from "../../../utilities/miniScreenSidebar/MiniScreenSiderbar"
import useActivityMiniScreenData from "../hooks/use-activity-miniscreen-data"
import { updateSidebarToggle } from "../../../../../redux/features/activityCreation/activityCreationSettings"
import { 
   changeQuestionPos, 
   addQuestion, 
   deleteQuestion,
} from "../../../../../redux/features/activityCreation/activityCreationData"
import { useDispatch, useSelector } from "react-redux"
import PopUpBg from "../../../utilities/popUp/PopUpBackground"
import { useEffect } from "react"
const ActivityCreationSidebar = ({
    mediumWindowWidth
}) =>{
    const dispatch = useDispatch()
    const sidebarToggled = useSelector((state) => state.activityCreation.settings.sidebarToggled)
    const miniScreenData = useActivityMiniScreenData({
        reduxSelectorFunc: state => state.activityCreation.data.saved.present.questions,
        changeQuestionPos: changeQuestionPos,
        addQuestion: addQuestion,
        deleteQuestion: deleteQuestion
    })
    useEffect(() =>{
        if(!mediumWindowWidth) dispatch(updateSidebarToggle(false))
        else dispatch(updateSidebarToggle(true))
    }, [dispatch, mediumWindowWidth])
    return(
        <>
            {!mediumWindowWidth && sidebarToggled && <PopUpBg
                onClick = {() => dispatch(updateSidebarToggle(false))}
                ariaLabel = {"close-sidebar"}
                
            />}
            <MiniScreenSideBar 
                sidebarToggle={!sidebarToggled}
                customClass = "activity-creation-sidebar"
                {...miniScreenData}
            /> 
        </>
    )
}
export default ActivityCreationSidebar