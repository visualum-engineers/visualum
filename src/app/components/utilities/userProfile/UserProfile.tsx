import ProgressBar from "../progressBar/ProgressBar"

const UserProfile = ({
    avatar,
    userContainerClass,
    name = null,
    accountType = null, 
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
            
            {name && 
                <div
                    className="user-profile-name-container d-flex justify-content-center w-100"
                >
                    <span>{name}</span>
                </div>
            }
            
            {accountType &&  
                <div
                    className="user-profile-account-type d-flex justify-content-center w-100"
                >
                    <span>{accountType}</span>
                </div>
            }
            {progressBar && 
                <ProgressBar 
                    containerClassName={"user-profile-progress-bar-container"}
                    progressBarClassName={"user-profile-progress-bar"}
                    fillBarClassName={"user-profile-fill-bar"}
                    progressBar={progressBar.percentage}
                    ariaLabel={progressBar.ariaLabel}
                />
            }
        </div>
    )
}
export default UserProfile