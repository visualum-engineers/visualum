import FoundersColumnItem from "./FounderColumnItem";
import { useNavWrapperContext } from "../utilities/navbar/primaryNavbar/NavWrapper";
const OurStory = () => {
  const founders = ["Arky Asmal", "Derek Widmer", "Emilio Samaniego"];
  const { toggleSignUp } = useNavWrapperContext();
  return (
    <div className="about-pg-our-story-row">
      <h2 className="about-pg-our-story-title">Our Story</h2>
      <div className="about-pg-our-story-body">
        <div className="about-pg-our-story-text">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <p>
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book.
          </p>
          <p>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.
          </p>
        </div>
        <div className="about-pg-our-story-founder-column">
          {founders.map((name) => (
            <FoundersColumnItem name={name} />
          ))}
        </div>
      </div>
      <div className="about-pg-our-story-join-us">
        <p>Join our community, and start transforming education today</p>
        <button onClick={toggleSignUp} ariaLabel={"signup-for-visualum"}>
          <span>Join Us</span>
        </button>
      </div>
    </div>
  );
};
export default OurStory;
