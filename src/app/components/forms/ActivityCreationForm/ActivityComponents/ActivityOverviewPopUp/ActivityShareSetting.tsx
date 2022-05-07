import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import { RootState } from "../../../../../../redux/store"

const ActivityShareSettings = ({
    smallWindowWidth
}: any) => {
    const shareSettings = useSelector((state: RootState)=>state.activityCreation.data.unsaved.activityShareSettings)
    const subscriptionType = useSelector((state: RootState) => state.userInfo.subscriptionType)
    return(
        <>
        <div className="activity-creation-share-settings">
            <button 
                className={`settings-share-public-btn` 
                            + `${shareSettings==="public" || subscriptionType === "free" ? " active-btn": ""}`
                        }
            >
                <div className="icon-container">
                    <FontAwesomeIcon icon={faGlobeAmericas}/>
                    <span>Public</span>
                </div>
                {smallWindowWidth && 
                    <span 
                        className="btn-description"
                    >
                        Everyone can view
                    </span>
                }
            </button>
            <button 
                className={`settings-keep-private-btn` 
                         + `${shareSettings==="private"? " active-btn": ""}`
                         + `${subscriptionType === "free" ? " disabled-btn" : ""}`
                        }
                disabled={subscriptionType === "free"}
            >
                <div className="icon-container">
                    <FontAwesomeIcon icon={faLock}/>
                    <span>Private</span>
                </div>
                {smallWindowWidth && 
                    <span
                        className="btn-description"
                    >Only classes assigned activity can view</span>
                }
            </button>
        </div>
        {subscriptionType ==="free" &&
            <div className="activity-creation-share-settings-upgrade">
                <span>{`Note: Make your activity private by upgrading your subscription `} 
                    <a
                        onClick={(e) => {
                            e.preventDefault()
                        }}
                        href="/"
                    >
                        here
                    </a>
                </span> 
                
            </div>
        }
        </>
    )
}
export default ActivityShareSettings