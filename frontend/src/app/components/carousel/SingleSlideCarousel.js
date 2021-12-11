
import {CSSTransition} from "react-transition-group"
const duration = 500
const defaultTransition = {
    transition: `all ${duration}ms ease-out`,
    transitionProperty: "opacity, transform, left",
}
const SingleSlideCarousel = (props) =>{
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
                
                <div className="single-slide-container w-100">
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
                <div className = {`${props.carouselIndicators} single-slide-carousel-indicators`}> 
                </div>
            </div>
        </>
    )
}

export default SingleSlideCarousel