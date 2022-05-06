import React from "react";
import * as Realm from "realm-web";
const RealmAppContext = React.createContext();

export const useRealmApp = () => {
  const app = React.useContext(RealmAppContext);
  if (!app) {
    throw new Error(
      `You must call useRealmApp() inside of a <RealmAppProvider />`
    );
  }
  return app;
};


export const RealmAppProvider = ({children, appId}) => {  
  const [app, setApp] = React.useState(new Realm.App(appId));
  
  React.useEffect(() => {
    setApp(new Realm.App(appId));
  }, [appId]);
  //const dispatch = useDispatch()
  // Wrap the Realm.App object's user state with React state
  const [currentUser, setCurrentUser] = React.useState(app.currentUser);
  async function logIn(credentials, errorCallBack = null) {
    try{
        await app.logIn(credentials);
        // If successful, app.currentUser is the user that just logged in
        setCurrentUser(app.currentUser);
        return app.currentUser
      } catch(e){
      console.error(e)
      if(errorCallBack) errorCallBack(e)
    }
  }
  async function logOut() {
     // Log out the currently active user
     await app.currentUser?.logOut();
     // If another user was logged in too, they're now the current user.
     // Otherwise, app.currentUser is null.
     setCurrentUser(app.currentUser);
  }

  const wrapped = {...app, currentUser, logIn, logOut };

  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};
