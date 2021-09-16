import React from 'react'
import Navbar from './navbar'
import Footer from '../footer/footer'

export default function NavWrapper(props) {
    return (
        <>
            <Navbar />
            {props.children}
            <Footer />
        </>
    )
}
