import Navbar from './Navbar'
import useWindowWidth from '../../../../hooks/use-window-width';
import { useAuthModal } from "../../../../hooks";
import { createContext, useContext } from 'react';
import Footer from "../../footer/Footer"
const NavWrapperContext = createContext<any>(null)
const NavWrapper = (props: any) => {
  const { children }: { children: JSX.Element } = props;
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
        <Navbar
          openSignUp={toggleSignUp}
          openSignIn={toggleSignIn}
          showLogo={props.showLogo}
          textColor={props.textColor}
          //backgroundColor={props.backgroundColor}
        />
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
