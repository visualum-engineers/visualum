

import Navbar from './Navbar'
import useWindowWidth from '../../../../hooks/use-window-width';
import { useAuthModal } from "../../../../hooks";
import { createContext, useContext } from 'react';
import Footer from "../../footer/Footer"
const NavWrapperContext = createContext(null)
const NavWrapper= ({
    children
}) =>  {
    const windowWidth = useWindowWidth(992);
    const { toggleSignUp, toggleSignIn, authModal } = useAuthModal();
    return (
      <>
        <NavWrapperContext.Provider
          value={{
            toggleSignUp: toggleSignUp,
            toggleSignIn: toggleSignIn,
            authModal: authModal,
            windowWidth: windowWidth
          }}
        >
          <Navbar openSignUp={toggleSignUp} openSignIn={toggleSignIn} />
          {authModal}
          {children}
          <Footer />
        </NavWrapperContext.Provider>
      </>
    );
}
export default NavWrapper
export function useNavWrapperContext() {
    return useContext(NavWrapperContext)
}
// DEPRECATED FOR NOW. NAVBAR MOVED TO HOME.JS
/*import PrimarySideBar from '../sideBar/PrimarySidebar';
 const [sidebarToggle, setSidebarToggle] = useState(false);
    const [sidebarBtnType, setBtnType] = useState("");
    const exitSideBar = () => {
        setSidebarToggle(false)
    }
    const openSideBar = () => {
        setSidebarToggle(true)
    }
    const handleSideBar = (e) => {
        if (sidebarToggle && e.target.closest("button").ariaLabel === "exit-sidebar") return exitSideBar()
        if (windowWidth) {
            setBtnType(e.target.closest("button").ariaLabel)
            return openSideBar()
        }
        else {
            //insert logic for mobile devices.
            //where sidebar will not be present
        }
    }
<Navbar
                windowWidth={windowWidth}
                sidebarToggle={sidebarToggle}
                handleSideBar={handleSideBar}
                openSignUp={props.toggleSignUp}
            />
            {!windowWidth ? null : <PrimarySideBar
                sidebarToggle={sidebarToggle}
                handleSideBar={handleSideBar}
                btnType={sidebarBtnType}
            />
            }
            {props.children}
*/