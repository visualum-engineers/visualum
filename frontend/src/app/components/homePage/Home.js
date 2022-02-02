import { React } from 'react'
import IntroHome from "./IntroHome"
import MarketingHomeIntro from "./FeaturesHome"
import Navbar from '../primaryNavbar/Navbar'
import SignIn from '../forms/AuthModals/SignIn'
import SignUp from '../forms/AuthModals/SignUp'
import useModal from '../../hooks/useModal'

export default function HomePage() {

    const { isShowing: signUpOpen, toggle: toggleSignUp } = useModal();
    const { isShowing: signInOpen, toggle: toggleSignIn } = useModal();

    return (
        <>
            <Navbar openSignUp={toggleSignUp} openSignIn={toggleSignIn} />
            {signUpOpen && <SignUp toggle={toggleSignUp} toggleOther={toggleSignIn} />}
            {signInOpen && <SignIn toggle={toggleSignIn} toggleOther={toggleSignUp} />}
            <IntroHome toggleSignUp={toggleSignUp}/>
            <MarketingHomeIntro />
        </>
    )
}
