import React, { Component } from 'react'
import FooterColumns from './FooterColumns';
import SocialMedia from './SocialMedia';
import Copyright from "./Copyright"
import { useWindowWidth } from '../../../hooks';
const Footer = () => {
      const mediumWidth = useWindowWidth(992);
        return (
          <footer
            className="w-100 d-flex flex-column align-items-center"
            id="footer"
          >
            <div className="footer-content">
              <FooterColumns mediumWidth={mediumWidth} />
              <SocialMedia mediumWidth={mediumWidth}/>
            </div>
            <Copyright mediumWidth={mediumWidth} />
          </footer>
        );
}
export default Footer
