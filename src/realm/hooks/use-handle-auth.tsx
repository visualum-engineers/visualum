import { useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { useRealmApp } from "../RealmApp";
import validateEmailFormat from "../../app/helpers/validateEmailFormat";
import { handleEmailAndPWLogin } from "../auth/emailAndPassword";
import useGoogleOnTapLogin from "../realm/googleWrapper/index"
const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID

const useHandleAuth = () =>{
    const app = useRealmApp()
    const [isLoggingIn, setIsLoggingIn] = useState(false) 
    const [error, setError] = useState(null)

    useGoogleOnTapLogin({
        onError: error => console.log(error),
        onSuccess: response => console.log(response),
        googleAccountConfigs: {
          client_id: googleClientID// Your google client id here !!!
        },
    })
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
                    await handleEmailAndPWLogin({email: email, password: password, app: app});
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
            setError(err, setError);
            setIsLoggingIn(false);
        }
    };
    return {
        isLoggingIn: isLoggingIn,
        error: error,
        handleRegistrationAndLogin: handleRegistrationAndLogin,
    }
}
export default useHandleAuth