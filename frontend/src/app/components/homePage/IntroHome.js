const background = "images/homePage/background.jpeg"

const IntroHome = () => {
    return (
        // <div className="intro-homePage d-flex flex-column align-items-center">
        //     <img src={mountainHomebg} alt="Flag on Montain" className="homePageImage" />
        //     <div className="d-flex justify-content-center align-items-center h-100">
        //         <div className="introContainer d-flex flex-column align-items-center">
        //             <h2 className="homePageText">A world class education for anyone, anywhere.</h2>
        //             <p className="homePageText">Join us for an interactive</p>
        //             <p className="homePageText">learning experience</p> <br />
        //             <div className="d-flex justify-content-center">
        //                 <button
        //                     id="signup-btn"
        //                     className="btn btn-outline-light btn-lg mx-1">
        //                     <span>Sign Up
        //                         <i className="fa fa-caret-right"></i>
        //                     </span>
        //                 </button>
        //             </div>
        //         </div>
        //     </div>

        //     <a href="#home-page-market-intro" className="home-explore-link d-flex flex-column align-items-center">
        //         <p>Explore Our Library of Activities</p>
        //         <i className="fas fa-angle-down"></i>
        //     </a>
        // </div>
        <div className="intro">
            <div className="intro-homepage" style={{ backgroundImage: background }}>
                <div className="intro-blurb">
                    <h2 className="intro-tagline">
                        A word class education for anyone, anywhere.
                    </h2>
                    <h3 className="intro-subtitle">
                        Join Visualum to start your journey.
                    </h3>
                    <a className="btn btn-priamry intro-button">Sign Up</a>
                </div>
            </div>
            <div className="intro-explore">
                <p>Explore Our Library of Activities</p>
                <i className="fas fa-angle-down"></i>
            </div>
        </div>
    )
}
export default IntroHome