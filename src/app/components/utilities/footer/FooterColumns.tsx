import { Link } from "react-router-dom";

const FooterColumns = ({mediumWidth}) => {
  return (
    <div className="col-md-9 col-12 d-flex flex-wrap footer-columns-container">
      <div className="d-flex flex-column footer-column">
        <h5>Explore</h5>
        <div className="d-flex flex-column">
          <Link className="foot-link" to="/">
            Popular Courses
          </Link>
          <Link className="foot-link" to="/">
            Subscriptions
          </Link>
          <Link className="foot-link" to="/about">
            About Us
          </Link>
        </div>
      </div>
      <div className="d-flex flex-column footer-column">
        <h5>Legal</h5>
        <div className="d-flex flex-column">
          <Link className="foot-link" to="/">
            Terms & Service
          </Link>
          <Link className="foot-link" to="/">
            Private Policy
          </Link>
          <Link className="foot-link" to="/">
            Cookie Settings
          </Link>
        </div>
      </div>
      <div className="d-flex flex-column footer-column">
        <h5>Connect</h5>
        <div className="d-flex flex-column">
          <Link className="foot-link" to="/">
            Help & Support
          </Link>
          <Link className="foot-link" to="/">
            Share your feedback
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FooterColumns