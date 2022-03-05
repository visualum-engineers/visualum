import * as Realm from "realm-web";

export const googleLogin = async(
    res, 
    app, 
    customErrorFunc = null,
    customData = {
        account_type: "student",
    }
) =>{
    try{
        const credentials = Realm.Credentials.google(res.credential)
        const currentUser = await app.logIn(credentials, customErrorFunc)
        const functionName = "user_google_auth"
        const payload = {
            ...customData,
            token: res.credential
        }

        //check if new user and create approriate data template for them
        const newUser = await currentUser.callFunction(functionName, payload)
        if(newUser.error) {
            currentUser.logOut() 
            console.error(newUser.err)
            customErrorFunc(newUser.err)
        }

        return currentUser
    } catch(err){
        console.error(err)
        if(customErrorFunc) customErrorFunc(err)
    }
}