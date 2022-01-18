import { useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import validateEmailFormat from "../helpers/validateEmailFormat";

const useHandleAuth = () =>{
    const [isLoggingIn, setIsLoggingIn] = useState(false) 
    const [error, setError] = useState(null)
    const handleEmailAndPWLogin = async ({
        email, 
        password
    }) => {
        const isValidEmailAddress = validateEmailFormat(email);
        if(!isValidEmailAddress) return unstable_batchedUpdates(() =>{
            setError((err) => ({ ...err, email: "Email is invalid." }));
            setIsLoggingIn(false);
        })
        try {  
          await app.logIn(Realm.Credentials.emailPassword(email, password));
        } catch (err) {
          handleAuthenticationError(err, setError);
        }
      };
    
    const handleRegistrationAndLogin = async ({
        email, 
        password,
        authType
    }) => {
        unstable_batchedUpdates(()=>{
            setIsLoggingIn(true);
            setError(null);
        })
        try {
            switch(authType){
                case "emailAndPW":
                    const isValidEmailAddress = validateEmailFormat(email);
                    if(!isValidEmailAddress) return unstable_batchedUpdates(() =>{
                        setError((err) => ({ ...err, email: "Email is invalid." }));
                        setIsLoggingIn(false);
                    })
                    // Register the user and, if successful, log them in
                    await app.emailPasswordAuth.registerUser(email, password);
                    await handleEmailAndPWLogin({email: email, password: password});
                    break;
                case "googleAuth":
                    break
                default:
                    throw new Error ("auth type is invalid")
            }
            
            //sign in successful. Lets reset our logging in state
            return unstable_batchedUpdates(()=>{
                setIsLoggingIn(false);
                setError(null);
            })
        } catch (err) {
            handleAuthenticationError(err, setError);
            setIsLoggingIn(false);
        }
    };
    return {
        isLoggingIn: isLoggingIn,
        error: error,
        handleEmailAndPWLogin: handleEmailAndPWLogin,
        handleRegistrationAndLogin: handleRegistrationAndLogin
    }
}
export default useHandleAuth