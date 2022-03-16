import { React } from "react";
import IntroHome from "./IntroHome";
import MarketingHomeIntro from "./FeaturesHome";
import { useNavWrapperContext } from "../utilities/navbar/primaryNavbar/NavWrapper";
export default function HomePage() {
    const {toggleSignUp} = useNavWrapperContext()
  return (
    <>
        <IntroHome toggleSignUp={toggleSignUp} />
        <MarketingHomeIntro />   
    </>
  );
}
