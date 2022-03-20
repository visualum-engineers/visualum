import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faInstagram, faLinkedinIn, faFacebookF} from "@fortawesome/free-brands-svg-icons"
const SocialMedia = ({mediumWidth}) => {
  return (
    <div className="col-md-3 col-12 footer-social-media">
      <div>
        <h5>Social Media</h5>
        <div className="footer-social-media-icons">
          <Link to="/" className="footer-facebook-icon">
            <FontAwesomeIcon icon={faFacebookF} />
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </Link>
        </div>
        <p className="footer-social-media-support">Show your support with:</p>
        <div className="footer-hashtags">
          <p>#visualum</p>
          <p>#visualumteam</p>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
