import Navbar from './Navbar'
import useWindowWidth from '../../../../hooks/use-window-width';
import { useAuthModal } from "../../../../hooks";
import { createContext, useContext } from 'react';
import Footer from "../../footer/Footer"
const NavWrapperContext = createContext<any>(null)
const NavWrapper= ({
    children
}) => {
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
