import React, { useState, useEffect} from 'react'
import SideBar from './Sidebar';
import Navbar from './Navbar'
import Footer from '../footer/Footer'

export default function NavWrapper(props) {
    const [sidebarToggle, setSidebarToggle] = useState(false)
    const [windowWidth, setWidth] = useState(window.innerWidth>=992)
    const [sidebarBtnType, setBtnType] = useState("")
    
    //handles resizing events
    useEffect(() => {
        const resize = () => {
            if(windowWidth && window.innerWidth<=991){setWidth(false); setSidebarToggle(false)}
            else if(!windowWidth && window.innerWidth>=992)setWidth(true)
        }
        window.addEventListener('resize', resize);

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", resize)
    }, [windowWidth]); 

    const exitSideBar = () =>{
        setSidebarToggle(false)
    }
    const openSideBar = () =>{
        setSidebarToggle(true)
    }
    const handleSideBar = (e) =>{
        if (sidebarToggle && e.target.closest("button").ariaLabel === "exit-sidebar") return exitSideBar()
        if (windowWidth) {
            setBtnType(e.target.closest("button").ariaLabel)
            return openSideBar()
        }
        else {
            //insert logic for mobile devices.
            //where sidebar will not be present
        }
    }
    return (
        <>
            {!windowWidth? null: <SideBar
                    sidebarToggle = {sidebarToggle} 
                    handleSideBar = {handleSideBar}
                    btnType = {sidebarBtnType}
                />
            }
            <Navbar 
                windowWidth = {windowWidth}
                sidebarToggle ={sidebarToggle}
                handleSideBar = {handleSideBar}
            />
            {props.children}
            <Footer />
        </>
    )
}
