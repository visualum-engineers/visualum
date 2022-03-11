const background = "images/homePage/background.jpeg"

const IntroHome = (props) => {
    return (
        <div className="intro">
            <div className="intro-homepage" style={{ backgroundImage: background }}>
                <div className="intro-blurb">
                    <h2 className="intro-tagline">
                        The easiest way to train create, organize & teach online.
                    </h2>
                    <h3 className="intro-subtitle">
                        Upload and create content online on the largest marketplaces. Submit your homework, test and projects in seconds, no keywords or captions required.
                    </h3>
                    <div>
                        <button
                            className="btn btn-priamry intro-button"
                            onClick={props.toggleSignUp}
                        >Sign Up
                        </button>
                    </div>
                </div>
                <div className="intro-image">
                    <img src="images/homepageRocket.png" />
                </div>
            </div>
            {/* <div className="intro-explore">
                <p>Explore Our Library of Activities</p>
                <i className="fas fa-angle-down"></i>
            </div> */}
        </div>
    )
}
export default IntroHome;