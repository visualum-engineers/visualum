//note the default behavior includes adding carouselPosition styles
//to render all elements of carousel at once, and then move 
//the carousel container like a sliding window
// If  you only want to render a single slide to the DOM, at a time
// you should use CSS Transition, from React Transition Group
// on the children and wrap this component around it 
// in addition, in props, set ReactTransitionGroup to true 
const SingleSlideCarousel = (props) =>{
    const carouselPosition = {transform: `translateX(${-(props.slideNum-1) * 100}%)`}
    return (
        <>  
            <div className={`single-slide-carousel-container d-flex h-100 ${props.carouselClassName}`}>
            {props.slideNum > 1 ?
                <button 
                    className={`single-slide-carousel-nav-btns ${props.carouselNavBtns} move-left`}
                    aria-label={"move-left"}
                    onClick = {props.slideNavOnClick}
                    data-action-type={"move-left"}
                >
                    {props.leftNavEl}
                </button>
            : <div className = {"single-slide-carousel-nav-btns"}> </div>
            }
                <div
                    style={!props.ReactTransitionGroup ? carouselPosition : null} 
                    className="single-slide-container w-100 d-flex">
                        {//should render slides inside
                            props.children
                        }
                </div>
                { props.slideNum < props.slides.length ?
                    <button 
                        className={`single-slide-carousel-nav-btns ${props.carouselNavBtns} move-right`}
                        aria-label = {"move-right"}
                        onClick={props.slideNavOnClick}
                        data-action-type={"move-right"}
                    >
                        {props.rightNavEl}
                    </button>
                : <div className = {"single-slide-carousel-nav-btns"}> </div>
                }
                <div className = {`${props.carouselIndicators} single-slide-carousel-indicators d-flex justify-content-center`}> 
                    {props.slides.map((content, index) =>{
                        return (<div
                            key = {index} 
                            className={`single-slide-caro-indicator${index+1 === props.slideNum? " active" : ""}`}> 
                        </div>)
                    })}
                </div>
            </div>
        </>
    )
}

export default SingleSlideCarousel

/*
    {Object.keys(props.slides).map((key)=>{
        const moveLeft = (props.prevSlideNum - props.slideNum) >= 0
        //console.log(props.prevSlideNum, props.slideNum, moveLeft, props.prevSlideNum - props.slideNum)
        return (
        <CSSTransition
            key = {`slide-${key}`}
            in = {props.slideNum === parseInt(key)+1}
            timeout={duration}
            classNames={`${moveLeft? "single-slide-move-left":"single-slide-move-right"}`}
            mountOnEnter
            unmountOnExit                                
        >
            <div 
                style ={{...defaultTransition}} 
                className={`${""} single-slide-transition-container flex-grow-1 d-flex flex-column`}
            >
                {props.children}
            </div>
        </CSSTransition> 
        )
    })}
*/