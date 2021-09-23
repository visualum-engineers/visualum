import React from 'react'
import Navbar from './Navbar'
import Footer from '../footer/Footer'

export default function NavWrapper(props) {
    return (
        <>
            <Navbar />
            {props.children}
            <Footer />
        </>
    )
}
