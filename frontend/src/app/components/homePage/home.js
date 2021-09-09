import React, { Component } from 'react'
import eureka_1 from '../../../images/eureka_1.jpg'
import stars from "../../../images/stars.webm"
const initialState = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
}

export default class HomeContent extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
        this.mounted = true;
    }
    //Handles reshaping form components to be responsive
    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight, });
    }

    componentDidMount() {
        if (this.mounted) {
            window.addEventListener("resize", this.handleResize.bind(this));
            document.querySelector(".stars").playbackRate = 0.3;
        }
    }

    componentWillUnmount() {
        this.mounted = false
        window.addEventListener("resize", this.handleResize.bind(this));
    }
    render() {
        return (
            <>
                {/*works for chrome*/}
                <video loop muted autoPlay className="stars"> 
                    <source src={stars} type="video/webm"/> 
                </video>
                <div className="homePage">
                    <img src={eureka_1} alt="Flag on Montain" className="homePageImage" />
                    <div className="introContainer">
                        <h2 className="homePageText">A world class education for anyone, anywhere.</h2>
                        <p className="homePageText">Join Eureka to explore your educational journey</p>
                        <p className="homePageText"> Learning never ends. </p> <br />
                        <button id="signup-btn" className="btn btn-outline-light btn-lg">  Sign Up
                            <span className="fa fa-caret-right"></span>
                        </button>
                    </div>
                    <br />
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </>
        )
    }
}
