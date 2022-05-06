import { React } from "react";
import IntroHome from "./IntroHome";
import FeaturesHome from "./FeaturesHome";
import FeaturedActivities from "./FeaturedActivities";
import { useNavWrapperContext } from "../utilities/navbar/primaryNavbar/NavWrapper";
import FeaturedVideo from "./FeaturedVideo";
export default function HomePage() {
  const { toggleSignUp } = useNavWrapperContext()

  const analyticsSection =
    <div className="analytics-section">
      <div className="row">
        <div className="col-md-6 col-12 subsection">

        </div>
        <div className="col-md-6 col-12 subsection d-flex flex-column justify-content-center">
          <h3>Real-Time Data Analysis</h3>
          <p>
            Get metrics and trends on student and class performance
          </p>
          <div>
            <button className="btn learn-more-button homepage-button">Learn More</button>
          </div>
        </div>
      </div>
    </div>

  const callToAction = <div className="call-to-action">
    <div className="row">
      <div className="col-md-6 col-12">
        <h2>
          Ready to Get Started?
        </h2>
        <h3>
          Sign up now, start creating, and get featured too!
        </h3>
        <div>
          <button className="intro-button homepage-button btn">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>

  return (
    <>
      <IntroHome toggleSignUp={toggleSignUp} />
      <FeaturesHome />
      <FeaturedVideo />
      {analyticsSection}
      <FeaturedActivities />
      {callToAction}
    </>
  );
}
