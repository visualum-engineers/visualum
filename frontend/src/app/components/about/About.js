import MissionStatement from "./MissionStatement";
import VisionStatement from "./VisionStatement";
import GroupImage from "./GroupImage";
import OurStory from "./OurStory";
import LearnMore from "./LearnMore";
const AboutPage = () => {
  return (
    <div className="about-pg-body">
      <VisionStatement />
      <MissionStatement />
      <GroupImage />
      <OurStory />
      <LearnMore />
    </div>
  );
};
export default AboutPage;
