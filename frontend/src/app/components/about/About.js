import MissionStatement from "./MissionStatement";
import IntroRow from "./IntroRow";
import GroupImage from "./GroupImage";
import OurStory from "./OurStory";
import LearnMore from "./LearnMore";
const AboutPage = () => {
  return (
    <div className="about-pg-body">
      <IntroRow />
      <MissionStatement />
      <GroupImage />
      <OurStory />
      <LearnMore />
    </div>
  );
};
export default AboutPage;
