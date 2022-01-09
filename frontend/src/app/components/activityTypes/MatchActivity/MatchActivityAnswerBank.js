import MoreInfoBtn from '../../utilities/moreInfoBtn/MoreInfoBtn';
import DroppableArea from "../../utilities/dragAndDrop/ReactBeautifulDnD/DroppableArea";

const AnswerBank = ({
    data, 
    firstElTap, 
    mediumWindowWidth, 
    moreInfoOnClick, 
    disableDnD, 
    onTap, 
    moreInfoBtn,
    removedEl
}) => {
    return (
        <div className={`match-activity-columns d-flex justify-content-center${mediumWindowWidth? " full-size": " w-100"}`}>
            <div className="match-activity-keys-column w-50 d-flex flex-column align-items-center">
                <h2 className="match-activity-column-titles">Key</h2>
                {Object.keys(data.keyPairs).map((content,index)=>{
                    let last = index===Object.keys(data.keyPairs).length-1
                    return (
                        <div 
                            key={index} 
                            className="d-flex w-100"
                        >
                            <div  
                                className={`match-activity-keys flex-grow-1 d-flex align-items-center justify-content-center`
                                        + `${last? " last-item":""}`}
                            >
                                <p 
                                    className="w-100 d-flex flex-column justify-content-center align-items-center">
                                        {content}
                                </p>
                            </div>
                            {/* <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="match-activity-key-arrows"
                                viewBox="0 0 351 148" 
                                fill="none"
                            >
                                <path 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    d="M2.92893 66.9289C-0.976311 70.8342 -0.976311 77.1658 2.92893 81.0711L66.5685 144.711C70.4738 148.616 76.8054 148.616 80.7107 144.711C84.6159 140.805 84.6159 134.474 80.7107 130.569L24.1421 74L80.7107 17.4315C84.6159 13.5262 84.6159 7.19456 80.7107 3.28932C76.8054 -0.615921 70.4738 -0.615921 66.5685 3.28932L2.92893 66.9289ZM348.071 81.0711C351.976 77.1658 351.976 70.8342 348.071 66.9289L284.431 3.28932C280.526 -0.615921 274.195 -0.615921 270.289 3.28932C266.384 7.19456 266.384 13.5262 270.289 17.4315L326.858 74L270.289 130.569C266.384 134.474 266.384 140.805 270.289 144.711C274.195 148.616 280.526 148.616 284.431 144.711L348.071 81.0711ZM10 84H341V64H10V84Z" 
                                />
                            </svg> */}
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="match-activity-key-arrows"
                                viewBox="0 0 378 186" 
                                fill="none"
                            >
                                <path 
                                    d="M373.839 101.839C378.72 96.9573 378.72 89.0427 373.839 84.1612L294.289 4.61165C289.408 -0.269901 281.493 -0.269901 276.612 4.61165C271.73 9.49321 271.73 17.4078 276.612 22.2893L347.322 93L276.612 163.711C271.73 168.592 271.73 176.507 276.612 181.388C281.493 186.27 289.408 186.27 294.289 181.388L373.839 101.839ZM4.16117 84.1612C-0.720388 89.0427 -0.720388 96.9573 4.16117 101.839L83.7107 181.388C88.5922 186.27 96.5068 186.27 101.388 181.388C106.27 176.507 106.27 168.592 101.388 163.711L30.6777 93L101.388 22.2893C106.27 17.4078 106.27 9.49321 101.388 4.61165C96.5068 -0.269901 88.5922 -0.269901 83.7107 4.61165L4.16117 84.1612ZM365 80.5L13 80.5V105.5L365 105.5V80.5Z"
                                />
                            </svg>
                            
                        </div>
                        
                    )
                })}
            </div>
        
            <div className="match-activity-answers-column w-50 d-flex flex-column align-items-center">
                <div className="match-activity-column-titles">
                    <div className="match-activity-instructions-position">
                        <MoreInfoBtn 
                            textContent = "View Instructions"
                            customContainerClass = "match-activity-instructions"
                            customContainerAriaLabel = "activity-instructions"
                            customDropDownID = "match-activity-instructions"
                            setTimeoutOnMount = {!moreInfoBtn? 4000: 0}
                            onClick = {moreInfoOnClick}
                        />
                    </div>
                    Answer
                </div>
                
                {Object.keys(data.keyPairs).map((content, index)=>{
                    let last = index===Object.keys(data.keyPairs).length-1
                    return (
                        <DroppableArea
                            firstElTap = {firstElTap} 
                            key={data.categoryIDs[content]} 
                            id={data.categoryIDs[content]}
                            content = {data.keyPairs[content]}
                            droppableClassName = {`match-activity-answers-droppables w-100${last? " last-item":""}`}
                            draggableClassName = {"match-activity-draggables d-flex align-items-center justify-content-center"}
                            innerDroppableClassName = {`${disableDnD && firstElTap? "match-activity-tap-active ": ""}match-activity-inner-droppable w-100 h-100 d-flex flex-column justify-content-start align-items-center`}
                            draggingOverClass={"match-activity-draggable-over"}
                            isDraggingClass={"match-activity-dragging"}
                            onTap={disableDnD? onTap: null}
                            removedEl = {removedEl && removedEl[0]}                        
                        />
                    )
                })}
            </div>
        </div>
    )
}
export default AnswerBank