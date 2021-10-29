const LoadingIcon = ({entireViewport = false}) =>{
    return (
        <div className={`loading-icon-container ${entireViewport ?"fill-viewport":""}`}>
            <div className="loading-icon" aria-label="loading"></div>
        </div>
    )
}
export default LoadingIcon