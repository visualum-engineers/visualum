import React, { Component } from 'react'
import eureka_1 from '../../../images/eureka_1.jpg'

const initialState ={
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
}

class Stars extends Component { 
    render() {
        let stars = [];
         //twinkling star element
        for (let i = 0; i < 100; i++) {
            let randomTiming = ((Math.random()*4) + 1).toString() + "s"
            //change 20, if scrollbar width changes
            let randomXPosition = (Math.random()*this.props.windowWidth-20).toString() + "px"
            let randomYPosition = (Math.random()*this.props.windowHeight/5).toString() + "px"
            let animationBehavior = "twinkle linear infinite " + randomTiming
            let starStyle = {
                animation: animationBehavior,
                top: randomYPosition,
                left: randomXPosition,
            }
            let star= <div key={i} className="star" style={starStyle}></div>
            stars.push(star)
        }
        
        return (
            <>
                {stars}
            </>
        )
    }
}

export default class HomeContent extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
        this.mounted = true;
    }
    //Handles reshaping form components to be responsive
    handleResize=(e)=>{
        this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight,});
    }

    componentDidMount() {
        if(this.mounted){
            window.addEventListener("resize", this.handleResize.bind(this));
        }
    }

    componentWillUnmount() {
        this.mounted = false
        window.addEventListener("resize", this.handleResize.bind(this));
    } 
    render() {
        return (
            <div className="homePage">
                <Stars {...this.state}/>
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
        )
    }
}
