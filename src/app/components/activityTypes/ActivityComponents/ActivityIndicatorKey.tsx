const ActivityIndicatorKey = ({
    btnIndicatorClass,
}) =>{
    const indicators = [
        {label: "Current", class: " question-active"},
        {label: "Unopened", class: " question-never-opened"},
        {label: "In Progress", class: " question-in-progress"},
        {label: "Completed", class: " question-completed"}
    ]
    return(
        <div className="activity-indicator-key-container">
            
            <div className="activity-indicator-key">
                <span>Key: </span> 
            {indicators.map((indicator) =>{
                return(
                    <div
                        key ={"indicator" + indicator.label} 
                        className={"indicator-key-value" + indicator.class}
                    >
                        <svg 
                            className={btnIndicatorClass + indicator.class}
                            viewBox="0 0 100 100"
                        >
                        <circle 
                            className="radio-outer-circle"
                            cx="50" 
                            cy="50" 
                            r="45" 
                        ></circle>
                    </svg>
                    <label>{indicator.label}</label>
                </div>
                )
            })}
            </div>
        </div>
    )
}
export default ActivityIndicatorKey