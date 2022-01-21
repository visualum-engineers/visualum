import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import {faCommentDots, faCircleQuestion} from '@fortawesome/free-regular-svg-icons'

export const secondarySideBarData = ({
    onInstructionsClick,
}) => [
    {
        type:"btn", 
        customClass:"activities-sidebar-btn", 
        content: "Instructions", 
        onClick: onInstructionsClick
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
]
export const secondarySidebarFooterData = () => [
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