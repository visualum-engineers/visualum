const pencils = "./images/homePage/pencils.jpg"
const planet = "./images/homePage/planetWithFlag.jpg"
const teacherPointing = "./images/homePage/teacherPointing.jpg"

const MarketingHomeIntro = () =>{
    return(
        <div 
            id="home-page-market-intro" 
            className="container p-0 d-flex flex-column align-items-center"
        >
            <h1> Study Time, crunch time, anytime </h1>
            <h6>Explore some of our best study tools & get 24/7 support from your teachers</h6>
            <div className="d-flex justify-content-center align-items-center g-0 teacherPointing">  
                <img 
                    src={teacherPointing} 
                    alt={"A teacher pointing to board"} 
                    className="col-5 col-md-4 mx-2"
                />
                <p className="col-5 col-md-4 mx-2"> 
                    Pre-made activities for teachers to use, edit, and assign, for their independent classrooms!
                </p>
            </div>
            <div className="d-flex justify-content-center align-items-center g-0 planet">  
                <p className="col-5 col-md-4 mx-3"> Teachers can plan and help students set and achieve academic goals</p>
                <img 
                    src={planet} 
                    alt={"A planet with a flag"} 
                    className="col-5 col-md-4 mx-2"
                />
            </div>
            <div className="d-flex justify-content-center align-items-center g-0 pencils">  
                <img 
                    src={pencils} 
                    alt={"Pencils in a box"} 
                    className="col-5 col-md-4 mx-2"
                />
                <p className="col-5 col-md-4 mx-4"> Teacher will be able to search our data base full of activities and use them in our classroom</p>
            </div>
            <h4>Ready to empower your students?</h4>
            <button type="button" className="btn"><span>Get started</span></button>
        </div>
    )
}
export default MarketingHomeIntro