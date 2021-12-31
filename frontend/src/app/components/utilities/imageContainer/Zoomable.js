import React, { useContext, useState } from "react"
const ZoomedContext = React.createContext(false)
const Zoomable = ({
    children
}) => {
    const [zoomedIn, setZoomedIn] = useState(false)

    return(
        <ZoomedContext.Provider value={{
            currZoomState : zoomedIn, 
            changeZoomState: (newStateValue) => {setZoomedIn(newStateValue)}
        }}>
            {children}
        </ZoomedContext.Provider>
    )
}
export function useZoomed(){
    return useContext(ZoomedContext)
}

export default Zoomable
