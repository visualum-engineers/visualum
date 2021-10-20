import UserProfile from './UserProfile';
const Login = (props) => {
    const { signedIn } = props;
    return (
        signedIn ? props.windowWidth ?
        <UserProfile rewardNum={200} dropdownOpen={props.dropdownOpen} toggleDropdownOpen={props.toggleDropdownOpen} /> : null
        : <button id={`sign${signedIn ? "Out" : "In"}-btn`} className="btn btn-outline-light btn-lg justify-content-end">
            {signedIn ? "Log out" : "Login"}
        </button>
    );
}
export default Login