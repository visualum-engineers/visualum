import { React } from "react";
import IntroHome from "./IntroHome";
import MarketingHomeIntro from "./FeaturesHome";
import Navbar from "../utilities/navbar/primaryNavbar/Navbar";
import { useAuthModal } from "../../hooks";
export default function HomePage() {
  const { toggleSignUp, toggleSignIn, authModal } = useAuthModal();
  return (
    <>
      <Navbar openSignUp={toggleSignUp} openSignIn={toggleSignIn} />
        {authModal}
      <IntroHome toggleSignUp={toggleSignUp} />
      <MarketingHomeIntro />
    </>
  );
}
