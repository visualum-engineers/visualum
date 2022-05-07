import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
//Automates changing year
let d = new Date()
let time = d.getFullYear()

const Copyright = ({ mediumWidth }: any) => {
  return (
    <div className="footer-copyright">
      <div className="footer-logo">
        <Link to="/" className="navbar-logo">
          <img
            src="images/Visualum Logo.svg"
            className="navbar-logo"
            alt="visualum-logo"
          />
        </Link>
        {mediumWidth && (
          <Link to="/" className="nav-brand">
            visualum
          </Link>
        )}
      </div>
      <p>
        <FontAwesomeIcon icon={faCopyright} /> {time} Visualum LLC. All rights
        reserved.
      </p>
    </div>
  );
};

export default Copyright;
