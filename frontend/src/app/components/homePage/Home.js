import { React } from 'react'
import IntroHome from "./IntroHome"
import MarketingHomeIntro from "./FeaturesHome"
import Navbar from '../primaryNavbar/Navbar'
import SignIn from '../forms/SignIn/SignIn'
import SignUp from '../forms/SignIn/SignUp'
import useModal from '../../hooks/useModal'

export default function HomePage() {

    const { isShowing: signUpOpen, toggle: toggleSignUp } = useModal();
    const { isShowing: signInOpen, toggle: toggleSignIn } = useModal();

    return (
        <>
            <Navbar openSignUp={toggleSignUp} openSignIn={toggleSignIn} />
            {signUpOpen && <SignUp toggle={toggleSignUp} />}
            {signInOpen && <SignIn toggle={toggleSignIn} />}
            <IntroHome />
            <MarketingHomeIntro />
        </>
    )
}
