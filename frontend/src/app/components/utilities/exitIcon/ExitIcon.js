const ExitIcon = () =>{
    return(
        <svg 
            className="exit-icon" 
            viewBox="0 0 100 100"
            strokeWidth = {"0.3rem"}
            strokeLinecap = {"round"}
        >
            <line x1="10" x2="90" y1="10" y2="90"/>
            <line x1="90" x2="10" y1="10" y2="90"/>
        </svg>
    )
}
export default ExitIcon