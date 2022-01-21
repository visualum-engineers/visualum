import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import {faCommentDots, faCircleQuestion} from '@fortawesome/free-regular-svg-icons'
import ActivityTableOfContents from './ActivityTableOfContents';
export const activitySecondarySideBarData = ({
    activityData,
    onInstructionsClick,
    onTableOfContentClick, 
    currQuestion
}) => [
    {
        type:"btn", 
        customClass:"activities-sidebar-btn", 
        content: "Instructions", 
        onClick: onInstructionsClick
    },
    {
        type: "custom",
        content: <ActivityTableOfContents 
            currQuestion = {parseInt(currQuestion)}
            data ={activityData}
            onClick = {onTableOfContentClick}
            customClass={"activities-table-of-contents"}
            btnCustomClass = "activities-sidebar-table-btns"
            btnActiveClass = {"question-active"}
            btnInnerCustomClass={"table-btns-inner-container"}
        />
    },
    {
        type:"link", 
        url: "/", 
        customClass:"activities-sidebar-link", 
        content: 
        <>
            <span className="icon-container"><FontAwesomeIcon icon = {faCommentDots}/></span>
            <span className="ms-1">Feedback</span>
        </>
    },
    {
        type: "link",
        url: "/",
        customClass:'activities-sidebar-link',
        content: <>
            <span className="icon-container"><FontAwesomeIcon icon = {faCog}/></span>
            <span className="ms-1">Settings</span>
        </> ,
        
    },
    {
        type: "link",
        customClass: 'activities-sidebar-link',
        url: "/", 
        content: <>
            <span className="icon-container"><FontAwesomeIcon icon = {faCircleQuestion}/></span>
            <span className="ms-1">Help Center</span>
        </>,
        
    }
]
export const activitySecondarySidebarFooterData = () => [
    
]