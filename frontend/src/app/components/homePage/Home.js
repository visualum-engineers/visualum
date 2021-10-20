import {React, useEffect} from 'react'
import IntroHome from "./IntroHome"
import MarketingHome from "./MarketingHome"
const starsWebM = "images/stars.webm"
const starsMov = "images/stars.mov"

const HomePage = () => {
    useEffect(()=>{
        document.querySelector(".home-page-stars").playbackRate = 0.45;
    }, [])
    return (
        <>
            {/*works for chrome*/}
            <video loop muted autoPlay className="home-page-stars">
                <source src ={starsMov} type="video/mov"/>
                <source src={starsWebM} type="video/webm"/>
            </video>
            <IntroHome/>
            <MarketingHome />
        </>
    )
    }
    export default HomePage
