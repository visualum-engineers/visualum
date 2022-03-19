import { Link } from "react-router-dom";

const SocialMedia = ({mediumWidth}) => {
  return (
    <div className="col-md-2 col-12 footer-social-media">
      <h5>Social Media</h5>
      <div className="d-flex flex-column">
        <Link className="foot-link" to="/">
          Terms
        </Link>
        <Link className="foot-link" to="/">
          Contact Us
        </Link>
        <Link className="foot-link" to="/">
          Meet the Team
        </Link>
      </div>
    </div>
  );
};

export default SocialMedia;
