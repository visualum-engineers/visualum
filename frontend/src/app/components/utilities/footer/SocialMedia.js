import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faInstagram, faLinkedinIn, faFacebookF} from "@fortawesome/free-brands-svg-icons"
const SocialMedia = ({mediumWidth}) => {
  return (
    <div className="col-md-3 col-12 footer-social-media">
      <div>
        <h5>Social Media</h5>
        <div className="footer-social-media-icons">
          <a
            href="https://www.facebook.com/Visualum-106637744846949/"
            target={"_blank"}
            rel={"noopener noreferrer"}
            className="footer-facebook-icon"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            href="https://www.instagram.com/visualum_/"
            target={"_blank"}
            rel={"noopener noreferrer"}
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://www.linkedin.com/company/visualum/"
            target={"_blank"}
            rel={"noopener noreferrer"}
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
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
