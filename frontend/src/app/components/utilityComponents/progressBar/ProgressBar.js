const ProgressBar = ({
    containerClassName,
    progressBarClassName, 
    fillBarClassName,
    progressBar
}) =>{
    return (
        <div className={containerClassName}>
            <div 
                className="d-flex justify-content-between"
            >
                <span>Progress</span>
                <span>{progressBar}</span>
            </div> 
            <div 
                className={progressBarClassName}
                style={{position: "relative"}}
            >
                <div 
                    className={fillBarClassName}
                    style={{width:`${progressBar}`, position: "absolute"}}
                > </div>
            </div>
        </div>
    )
} 
export default ProgressBar