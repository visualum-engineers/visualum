const NavActivityBtn = ({onClick, last, prev}) => {
    return(
        <button 
            className="navActivityBtn" 
            onClick ={onClick}>{`${last ? "Submit": prev ? "Go Back":"Continue"}`}</button>
    )
}
export default NavActivityBtn