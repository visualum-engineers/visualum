const NavActivityBtn = ({onClick, last, prev}) => {
    return(
        <button 
            btntype = {`${last ? "submit": prev ? "prev":"continue"}`}
            data-btn-type = {`${last ? "submit": prev ? "prev":"continue"}`}
            aria-label = {`${last ? "submit": prev ? "prev-question":"next-question"}`}
            className= "nav-activity-btn"
            onClick ={onClick}>{`${last ? "Submit": prev ? "Go Back":"Continue"}`}</button>
    )
}
export default NavActivityBtn
