import MiniScreenSideBar from "../../../utilities/miniScreenSidebar/MiniScreenSiderbar"
import useActivityMiniScreenData from "../hooks/use-activity-miniscreen-data"
import { 
   changeQuestionPos, 
   addQuestion, 
   deleteQuestion,
} from "../../../../../redux/features/activityCreation/activityCreationData"
import { useSelector } from "react-redux"
const ActivityCreationSidebar = () =>{
    const sidebarToggled = useSelector((state) => state.activityCreation.settings.sidebarToggled)
    const miniScreenData = useActivityMiniScreenData({
        reduxSelectorFunc: state => state.activityCreation.data.saved.present.questions,
        changeQuestionPos: changeQuestionPos,
        addQuestion: addQuestion,
        deleteQuestion: deleteQuestion
    })

    return(
        <MiniScreenSideBar 
            sidebarToggle={!sidebarToggled}
            customClass = "activity-creation-sidebar"
            {...miniScreenData}
        /> 
    )
}
export default ActivityCreationSidebar