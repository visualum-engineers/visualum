import React, { Fragment } from 'react'
import UserProfile from './UserProfile'
import NavToggler from './NavTogglerBtn';
import { Link } from 'react-router-dom';
import useScrollPos from '../../../../hooks/use-scroll-pos';

export default function Navbar(props: any) {

  const windowScrollY = useScrollPos()

  const { openSignIn } = props;

  //REPLACE THIS WITH AUTH LOGIC LATER
  const isSignedIn = false;

  const signIn =
    <Fragment>
      <button
        className="btn-home-auth justify-content-end"
        onClick={openSignIn}
        aria-label="Login to visualum"
      >
        Sign In
      </button>
    </Fragment>

  return (
    <>
      <div
        id="filter-navbar-container"
        className="navbar-expand-lg fixed-top"
      >
        <nav
          id="navbar"
          className={`navbar home-page-nav navbar-expand-lg ${windowScrollY ? "scroll-active" : ""
            }`}
        >
          <Link to="/" className="nav-brand">
            visualum
          </Link>
          {props.windowWidth ? null : <NavToggler />}
          <div
            id="navbar-nav-items-content"
            className="collapse navbar-collapse"
          >
            <div className="navbar-nav w-100 justify-content-end">
              <div className="about-us-nav-item">
                <Link to="/about" className="link-about-us">
                  <span>About Us</span>
                </Link>
              </div>

              <div className="d-flex justify-content-end">
                {isSignedIn ? <UserProfile /> : signIn}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
