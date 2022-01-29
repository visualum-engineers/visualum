import {ActivityTableOfContents} from './index';
import ProgressBar from '../utilities/progressBar/ProgressBar';
import { roundPercentToInt } from '../../helpers/calculatePercentage';
import { useSelector } from 'react-redux';
import GeneralBtn from '../utilities/generalBtn/GeneralBtn';

export const useActivitySecondarySideBarData = ({
    activityData,
    onInstructionsClick,
    onTableOfContentClick, 
    currQuestion
}) => {
    //progress data
    const {completed, /*inProgress, neverOpened*/} = useSelector((state) => state.activities.data.clientData.present.trackCompletion)
    const completedLength = Object.keys(completed).length
    // const inProgressLength = Object.keys(inProgress).length
    // const neverOpenedLength = Object.keys(neverOpened). length

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
                    percentage = {roundPercentToInt(completedLength, (activityData.questions.length-1)) + "%"}
                    containerClassName={"activity-progress-bar-container"}
                    ariaLabel = "activity-progress-bar"
                    additionalContent={`${completedLength}/${activityData.questions.length} completed`}
                    showContent={true}
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