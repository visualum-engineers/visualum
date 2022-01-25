const ProgressBar = ({
    containerClassName,
    progressBarClassName, 
    fillBarClassName,
    percentage,
    ariaLabel,
    additionalContent,
}) =>{
    return (
        <div 
            className={containerClassName ? containerClassName :"progress-bar-container"} 
            aria-label={ariaLabel}
        >
            <div 
                className="d-flex justify-content-start"
            >
                <span>{percentage}{additionalContent}</span>
            </div> 
            <div 
                className={progressBarClassName ? progressBarClassName : "progress-bar"}
                style={{position: "relative"}}
            >
                <div 
                    className={fillBarClassName ? fillBarClassName : "progress-bar-fill-bar"}
                    style={{width:`${percentage}`, position: "absolute"}}
                > </div>
            </div>
        </div>
    )
} 
export default ProgressBar