const mountainHomebg = "images/homePage/mountain-home-bg.jpg"

const IntroHome = () =>{
    return (<div className="intro-homePage d-flex flex-column align-items-center">
    <img src={mountainHomebg} alt="Flag on Montain" className="homePageImage" />
    <div className="d-flex justify-content-center align-items-center h-100">
        <div className="introContainer d-flex flex-column align-items-center">
            <h2 className="homePageText">A world class education for anyone, anywhere.</h2>
            <p className="homePageText">Join us for an interactive</p>
            <p className="homePageText">learning experience</p> <br />
            <div className="d-flex justify-content-center">
                <button
                    id="signup-btn"
                    className="btn btn-outline-light btn-lg mx-1">
                    <span>Sign Up
                        <i className="fa fa-caret-right"></i>
                    </span>
                </button>
            </div>
        </div>
    </div>

    <a href="#home-page-market-intro" className="home-explore-link d-flex flex-column align-items-center">
        <p>Explore Our Library of Activities</p>
        <i className="fas fa-angle-down"></i>
    </a>
    </div>
    )
}
export default IntroHome