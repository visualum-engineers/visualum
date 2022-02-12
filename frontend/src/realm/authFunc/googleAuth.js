import * as Realm from "realm-web";

export const googleLogin = async(res, app, customErrorFunc = null) =>{
    try{
        const credentials = Realm.Credentials.google(res.credential)
        const currentUser = await app.logIn(credentials, customErrorFunc)
        return currentUser
    } catch(err){
        console.error(err)
        if(customErrorFunc) customErrorFunc(err)
    }
}