import React, { useContext, useState } from "react"
const ZoomedContext = React.createContext({
    currZoomState: false, 
    changeZoomState: (e: any) => {}
})
const ZoomableContext = ({
    children
}: {children: JSX.Element}) => {
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

export default ZoomableContext
