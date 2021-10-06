import React, { useState, useEffect } from 'react'
import UserProfile from './UserProfile';
const Login = (props) => {
    const { signedIn } = props;
    const [width,setWidth] = useState(window.innerWidth>=992)

    //handles resizing events
    useEffect(() => {
        const resize = () => {
            if(width && window.innerWidth<=991)setWidth(false)
            else if(!width && window.innerWidth>=992)setWidth(true)
        }
        window.addEventListener('resize', resize);

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", resize)
    }, [width]); 
    
    return (
        signedIn ? width ?
        <UserProfile rewardNum={200} dropdownOpen={props.dropdownOpen} toggleDropdownOpen={props.toggleDropdownOpen} /> : null
        : <button id={`sign${signedIn ? "Out" : "In"}-btn`} className="btn btn-outline-light btn-lg justify-content-end">
            {signedIn ? "Log out" : "Login"}
        </button>
    );
}
export default Login