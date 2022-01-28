import * as Realm from "realm-web";

export const googleLogin = async(res, app) =>{
    const credentials = Realm.Credentials.google(res.credential)
    try{
        await app.logIn(credentials)
    } catch(err){
        console.log(err)
        //throw new Error({err : err})
    }
}