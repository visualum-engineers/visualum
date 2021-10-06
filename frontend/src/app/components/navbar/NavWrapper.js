import React, { useState} from 'react'
import SideBar from './Sidebar';
import Navbar from './Navbar'
import Footer from '../footer/Footer'

export default function NavWrapper(props) {
    const [sidebarToggle, setSidebarToggle] = useState(false)
    const exitSideBar = () =>{
        setSidebarToggle(false)
    }
    const openSideBar = () =>{
        setSidebarToggle(true)
    }

    return (
        <>
            <SideBar
                sidebarToggle = {sidebarToggle} 
                exitSideBar={exitSideBar}/>
            <Navbar 
                sidebarToggle ={sidebarToggle}
                openSideBar={openSideBar}/>
            {props.children}
            <Footer />
        </>
    )
}
