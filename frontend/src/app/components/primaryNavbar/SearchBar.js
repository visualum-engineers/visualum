import React, { useState} from 'react'
const SearchBar = () => {
    const [toggled, setToggle] = useState(false);
    const handleClick = () => {
        setToggle(currState => !currState);
    }
    return (
        <form 
            id="search-box" 
            className="d-flex justify-content-center align-items-center me-3"
        >
            <input id="search-bar"
                className={`form-control mr-sm-2 shadow-none align-self-center ${toggled && 'expand'}`}
                type="search"
                placeholder="Search"
                aria-label="Search" />
            <button id="search-btn"  type="button" onClick={handleClick}>
                <span id="search-icon" className={`fa ${toggled ? 'fa-arrow-left' : 'fa-search'}`} />
            </button>
        </form>
    )
}
export default SearchBar
