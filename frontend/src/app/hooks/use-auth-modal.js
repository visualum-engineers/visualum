/*
    Abstraction of useModal, but meant to handle 
    auth popup modal events
*/
import SignIn from '../components/forms/AuthModals/SignIn'
import SignUp from '../components/forms/AuthModals/SignUp'
import useModal from './useModal'
const useAuthModal = () => {
  const { isShowing: signUpOpen, toggle: toggleSignUp } = useModal();
  const { isShowing: signInOpen, toggle: toggleSignIn } = useModal();
    let signup = null;
  let signin = null;
  if (signUpOpen)
    signup = <SignUp toggle={toggleSignUp} toggleOther={toggleSignIn} />;
  if (signInOpen)
        signin = <SignIn toggle={toggleSignIn} toggleOther={toggleSignUp} />;
    return {
      signUpOpen: signUpOpen,
      signInOpen: signInOpen,
      authModal: signin ? signin: signup,
      toggleSignUp: toggleSignUp,
      toggleSignIn: toggleSignIn,
    };
};
export default useAuthModal
