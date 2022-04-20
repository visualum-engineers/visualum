import IntroRow from "./IntroRow";
import GroupImage from "./GroupImage";
import OurStory from "./OurStory";
import LearnMore from "./LearnMore";
const AboutPage = (props) => {
  return (
    <div className="about-pg-body">
      <IntroRow />
      <div className="about-pg-title-container">
        <h2 className="about-pg-our-story-title">Our Story </h2>
      </div>
      <GroupImage />
      <OurStory />
      <LearnMore />
    </div>
  );
};
export default AboutPage;
