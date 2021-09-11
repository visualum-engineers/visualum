const NavActivityBtn = ({onClick, last, prev}) => {
    return(
        <button 
            btntype = {`${last ? "submit": prev ? "prev":"continue"}`}
            className= "navActivityBtn"
            onClick ={onClick}>{`${last ? "Submit": prev ? "Go Back":"Continue"}`}</button>
    )
}
export default NavActivityBtn