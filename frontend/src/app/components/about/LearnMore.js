import { Link } from "react-router-dom";
const LearnMore = () => {
  const items = [
    {
      title: "Getting Started",
      description: "Start creating content with just a few clicks",
      linkContent: "Get started with Visualum >",
      link: "/",
    },
    {
      title: "Careers",
      description: "Join our growing team!",
      linkContent: "See job openings >",
      link: "/",
    },
    {
      title: "Terms of Use",
      description: "Policy agreements when using our service",
      linkContent: "Download >",
      link: "/",
    },
  ];
  return (
    <div className="about-pg-learn-more">
      <h2>Learn more about us</h2>
      <div className="learn-more-items-row">
        {items.map((item) => {
          return (
            <div key={item.title} className="learn-more-item-container">
              <div className="item-image"></div>
              <div className="item-text">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link to={item.link}>{item.linkContent}</Link>
              </div>
            </div>
          
          );
        })}
      </div>
    </div>
  );
};
export default LearnMore;
