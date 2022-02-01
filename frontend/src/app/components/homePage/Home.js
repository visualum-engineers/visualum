import { React } from 'react'
import IntroHome from "./IntroHome"
import MarketingHomeIntro from "./FeaturesHome"
import NavWrapper from '../primaryNavbar/NavWrapper'
import SignIn from '../forms/SignIn/SignIn'
import SignUp from '../forms/SignIn/SignUp'
import useModal from '../../hooks/useModal'

const HomePage = (props) => {

    const { isShowing: signUpOpen, toggle: toggleSignUp } = useModal();

    console.log('inside home. toggleSignUp:', toggleSignUp)

    return (
        <NavWrapper toggleSignUp={toggleSignUp}>
            {/* <SignIn /> */}
            {signUpOpen && <SignUp toggle={toggleSignUp} />}
            <IntroHome />
            <MarketingHomeIntro />
        </NavWrapper>
    )
}
export default HomePage;
