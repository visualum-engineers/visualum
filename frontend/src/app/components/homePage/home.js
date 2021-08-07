import React, { Component } from 'react'
import eureka_1 from '../../../images/eureka_1.jpg'
export default class HomeContent extends Component {
    render() {
        return (
            <div id = "homePage">
                <img src={eureka_1} alt="Flag on Montain " className="homePageImage"/>
                <div className="introContainer">
                    <h2 className="homePageText">A world class education for anyone, anywhere.</h2>
                    <p className="homePageText">Join Eureka to explore your educational journey</p>
                    <p className="homePageText"> Learning never ends. </p> <br/>
                    <button id="signup-btn" className="btn btn-outline-light btn-lg">  Sign Up  
                        <span className="fa fa-caret-right"></span>
                    </button>
                </div>
                <br/>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        )
    }
}
