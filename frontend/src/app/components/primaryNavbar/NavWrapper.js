import React, { useState } from 'react'
import PrimarySideBar from '../sideBar/PrimarySidebar';
import Navbar from './Navbar'
import Footer from '../footer/Footer'
import useWindowWidth from '../../hooks/use-window-width';

export default function NavWrapper(props) {
    const [sidebarToggle, setSidebarToggle] = useState(false)
    const [sidebarBtnType, setBtnType] = useState("")
    const windowWidth = useWindowWidth(992)
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
            <Navbar 
                windowWidth = {windowWidth}
                sidebarToggle ={sidebarToggle}
                handleSideBar = {handleSideBar}
            />
            {!windowWidth? null: <PrimarySideBar
                    sidebarToggle = {sidebarToggle} 
                    handleSideBar = {handleSideBar}
                    btnType = {sidebarBtnType}
                />
            }
            {props.children}
            <Footer />
        </>
    )
}
