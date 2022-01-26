import {ActivityTableOfContents} from './index';
//import Timer from '../utilities/timer/Timer';
import ProgressBar from '../utilities/progressBar/ProgressBar';
import { roundPercentToInt } from '../../helpers/calculatePercentage';
import GeneralBtn from '../utilities/generalBtn/GeneralBtn';

export const activitySecondarySideBarData = ({
    activityData,
    onInstructionsClick,
    onTableOfContentClick, 
    currQuestion
}) => {
    const sidebarData = [
        {
            type: "custom",
            content: <div className='flex-grow-1 d-flex flex-column align-items-center justify-content-around w-100'>
                <div className="activities-sidebar-activity-name">
                    {activityData.activityName}
                </div>
                <GeneralBtn 
                    customClassName={"activities-sidebar-btn"}
                    onClick={onInstructionsClick}
                    textContent = {"Instructions"} 
                />
                <ProgressBar 
                    percentage = {roundPercentToInt(currQuestion, (activityData.questions.length-1)) + "%"}
                    containerClassName={"activity-progress-bar-container"}
                    ariaLabel = "activity-progress-bar"
                    additionalContent={" completed"}
                />
                <hr style={{width: "70%", marginTop:"0"}}/>
            </div>
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