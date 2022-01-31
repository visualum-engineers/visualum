import { React } from 'react'
import IntroHome from "./IntroHome"
import MarketingHomeIntro from "./FeaturesHome"
// const starsWebM = "images/homePage/stars.webm"
// const starsMov = "images/homePage/stars.mov"
import SignIn from '../forms/SignIn/SignIn'

const HomePage = () => {
    // useEffect(()=>{
    //     document.querySelector(".home-page-stars").playbackRate = 0.45;
    // }, [])
    return (
        <>
            {/*works for chrome*/}
            {/* <video loop muted autoPlay className="home-page-stars">
                <source src ={starsMov} type="video/mov"/>
                <source src={starsWebM} type="video/webm"/>
            </video> */}
            {/* <SignIn /> */}
            <IntroHome />
            <MarketingHomeIntro />
        </>
    )
}
export default HomePage;
