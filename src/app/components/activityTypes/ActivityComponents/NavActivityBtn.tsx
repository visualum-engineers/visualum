const NavActivityBtn = ({onClick, last, prev}: any) => {
    return(
        <button 
            data-btn-type = {`${last ? "submit": prev ? "prev":"continue"}`}
            aria-label = {`${last ? "submit": prev ? "prev-question":"next-question"}`}
            className= "nav-activity-btn"
            onClick ={onClick}>{`${last ? "Submit": prev ? "Go Back":"Continue"}`}</button>
    )
}
export default NavActivityBtn
