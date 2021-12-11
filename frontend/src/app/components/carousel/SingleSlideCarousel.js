const SingleSlideCarousel = (props) =>{
    return (
        <>  
            <div className={`single-slide-carousel-container ${props.carouselClassName}`}>
                <div className={`single-slide-carousel-nav-btns ${props.carouselNavBtns}`}></div>
                <div className={`single-slide-carousel-slide ${props.slideClassName}`}>
                    {props.children}
                </div>
                <div className = {`single-slide-carousel-indicators ${props.carouselIndicators}`}> 
                </div>
            </div>
        </>
    )
}