const background = "images/homePage/background.jpeg"

const IntroHome = () => {
    return (
        <div className="intro">
            <div className="intro-homepage" style={{ backgroundImage: background }}>
                <div className="intro-blurb">
                    <h2 className="intro-tagline">
                        A world class education for anyone, anywhere.
                    </h2>
                    <h3 className="intro-subtitle">
                        Join Visualum to start your journey.
                    </h3>
                    <a className="btn btn-priamry intro-button" href="/signup">Sign Up</a>
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