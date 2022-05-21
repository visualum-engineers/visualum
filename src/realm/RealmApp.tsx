import React from "react";
import { unstable_batchedUpdates } from "react-dom";
import * as Realm from "realm-web";
const RealmAppContext = React.createContext({});
type ErrorCallBack = (e: any) => any;
export interface RealmApp {
  app: Realm.App;
  currentUser: Realm.User | null;
  logIn: (
    cred: Realm.Credentials,
    errCall: ErrorCallBack
  ) => Promise<Realm.User | null>;
  logOut: () => Promise<void>;
  userLoading: boolean;
}
export const useRealmApp = () => {
  const app = React.useContext(RealmAppContext);
  if (!app) {
    throw new Error(
      `You must call useRealmApp() inside of a <RealmAppProvider />`
    );
  }
  return app;
};

export const RealmAppProvider = ({
  children,
  appId,
}: {
  children: JSX.Element;
  appId: string;
}) => {
  const [app, setApp] = React.useState(new Realm.App(appId));

  React.useEffect(() => {
    setApp(new Realm.App(appId));
  }, [appId]);
  //const dispatch = useDispatch()
  // Wrap the Realm.App object's user state with React state
  const [currentUser, setCurrentUser] = React.useState(app.currentUser);
  //to give feedback while a user is being authenticated
  const [userLoading, setUserLoading] = React.useState(false);
  
  async function logIn(
    credentials: Realm.Credentials,
    errorCallBack: ErrorCallBack
  ) {
    try {
      setUserLoading(true)
      await app.logIn(credentials);
      // If successful, app.currentUser is the user that just logged in
      unstable_batchedUpdates(() => {
              setCurrentUser(app.currentUser);
              setUserLoading(false);
      })
      return app.currentUser;
    } catch (e) {
      console.error(e);
      if (errorCallBack) errorCallBack(e);
      setUserLoading(false);
      return null
    }
  }
  async function logOut() {
    setUserLoading(true);
    // Log out the currently active user
    await app.currentUser?.logOut();
    // If another user was logged in too, they're now the current user.
    // Otherwise, app.currentUser is null.
    unstable_batchedUpdates(() => {
          setCurrentUser(app.currentUser);
          setUserLoading(false);
    })
  }

  const wrapped: RealmApp = { app, currentUser, logIn, logOut, userLoading };

  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};
