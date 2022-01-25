import {ActivityTableOfContents} from './index';
import Timer from '../utilities/timer/Timer';
import ProgressBar from '../utilities/progressBar/ProgressBar';
import { roundPercentToInt } from '../../helpers/calculatePercentage';

export const activitySecondarySideBarData = ({
    activityData,
    onInstructionsClick,
    onTableOfContentClick, 
    currQuestion
}) => {
    const sidebarData = [
        {
            type: "custom",
            content: activityData.activityTimer && 
                <div className={`activity-timer d-flex justify-content-center align-items-center`}>
                    <span>TIME:</span>
                    <Timer
                        timer={activityData.activityTimer}
                        autoStart={false}
                    />
                </div>
        },
        {
            type: "custom",
            content: <div className="activities-sidebar-activity-name">{activityData.activityName}</div>
        },
        {
            type:"btn", 
            customClass:"activities-sidebar-btn", 
            content: "Instructions", 
            onClick: onInstructionsClick
        },
        
        {   
            type: "custom",
            content: <ProgressBar 
                        percentage = {roundPercentToInt(currQuestion, (activityData.questions.length-1)) + "%"}
                        containerClassName={"activity-progress-bar-container"}
                        ariaLabel = "activity-progress-bar"
                        additionalContent={" completed"}
                    />
        },
        
        
        {
            type:"custom",
            content: <hr style={{width: "70%", marginTop:"0"}}/>,
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
                header = {
                    <>
                    <h3 className="activity-table-of-contents-header">
                        Activity Questions</h3>
                    </>
            }
            />
        },
    ]
    return sidebarData
}
export const activitySecondarySidebarFooterData = () => [
    
]

/*
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
        
    },
*/