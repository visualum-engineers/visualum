import validateEmailFormat from "../../app/helpers/validateEmailFormat";
import * as Realm from "realm-web";

export const handleEmailAndPWLogin = async ({
    email, 
    password,
    app
}) => {
    const isValidEmailAddress = validateEmailFormat(email);
    if(!isValidEmailAddress) throw new Error({err: "Email is invalid."})
    try {  
      await app.logIn(Realm.Credentials.emailPassword(email, password));
    } catch (err) {
      throw new Error ({err: err})
    }
  };