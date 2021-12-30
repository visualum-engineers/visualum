const UserProfile = ({
    avatar,
    name,
    accountType, 
    userContainerClass,
    progressBar = null
}) => {
    return(
        <div 
            className={userContainerClass}
        > 
            <div 
                className="user-profile-avatar-container d-flex justify-content-center align-items-center"
            >
                {avatar}
            </div> 
            <div
                 className="user-profile-name-container d-flex justify-content-center w-100"
            >
                <span>{name}</span>
            </div>
            <div
                 className="user-profile-account-type d-flex justify-content-center w-100"
            >
                <span>{accountType}</span>
            </div>
            {progressBar && 
                <div className="user-profile-progress-bar-container">
                    <div 
                        className="d-flex justify-content-between"
                    >
                        <span>Progress</span>
                        <span>{progressBar}</span>
                    </div> 
                    <div 
                        className="user-profile-progress-bar" 
                        style={{position: "relative"}}
                    >
                        <div 
                            className="user-profile-fill-bar"
                            style={{width:`${progressBar}`, position: "absolute"}}
                        > </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default UserProfile