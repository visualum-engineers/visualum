import validateEmailFormat from "../../app/helpers/validateEmailFormat";
import * as Realm from "realm-web";

export const handleEmailAndPWLogin = async ({
    email, 
    password,
    app
}: any) => {
    const isValidEmailAddress = validateEmailFormat(email);
    if(!isValidEmailAddress) throw new Error("Email is invalid.")
    try {  
      await app.logIn(Realm.Credentials.emailPassword(email, password));
    } catch (err) {
      const error: any = new Error("Could not login using email and password")
      error.metadata = err
      return error
    }
  };