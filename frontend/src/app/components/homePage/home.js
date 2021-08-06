import React, { Component } from 'react'

export default class HomeContent extends Component {
    render() {
        return (
            <div id ="content">
                <div className="signup-container text mt-5">
                    <h2>A world class education for anyone, anywhere.</h2>
                    <p className="text">Join Eureka to explore your educational journey</p>
                    <p className="text"> Learning never ends. </p> <br/>
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
