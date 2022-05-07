const background = "images/homePage/background.jpeg"

const IntroHome = (props: any) => {
    return (
        <>
            <div className="intro container-fluid">
                <div className="intro-homepage" style={{ backgroundImage: background }}>
                    <div className="intro-blurb">
                        <h1 className="intro-tagline">
                            Interactive Learning from Anywhere
                        </h1>
                        <h2 className="intro-subtitle">
                            Create engaging and rewarding content for students
                        </h2>
                        <div>
                            <button
                                className="btn intro-button homepage-button"
                                onClick={props.toggleSignUp}
                            >Sign Up
                            </button>
                        </div>
                    </div>
                    <div className="intro-image-container">
                        <img src="images/homepageRocket.png" className="intro-image" alt="" />
                    </div>
                </div>
                {/* <div className="intro-explore">
                <p>Explore Our Library of Activities</p>
                <i className="fas fa-angle-down"></i>
            </div> */}
            </div>
            <img src="images/homePage/introBackground.png" className="intro-background" alt="" />
        </>
    )
}
export default IntroHome;