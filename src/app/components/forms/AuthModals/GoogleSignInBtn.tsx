import { useEffect } from "react";
import { useRealmApp } from "../../../../realm/RealmApp";
import { googleAuth } from "../../../../realm/auth/googleAuth";
import {
  GoogleSignUp,
  GoogleLogin,
  GoogleCredientals,
} from "./types/googleAuth";
// /*global google */
// const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID
//eslint ignore next-line
declare const google: any;
const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID_DEV;

const GoogleBtn = ({
  btnType,
  customSuccessCallback,
  customErrorFunc,
  customData,
}
  //: GoogleLogin | GoogleSignUp
  : any
) => {
  const app = useRealmApp();
  const googleCallBack = async (res: GoogleCredientals) => {
    try {
      if (btnType === "signup")
        await googleAuth({
          res: res,
          app: app,
          customErrorFunc: customErrorFunc,
          customSuccessCallback: customSuccessCallback
            ? customSuccessCallback
            : undefined,
          customData: customData,
          auth_type: "signup",
        });
      else
        await googleAuth({
          res: res,
          app: app,
          customErrorFunc: customErrorFunc,
          customSuccessCallback: customSuccessCallback
            ? customSuccessCallback
            : undefined,
          auth_type: "signin",
          customData: null,
        });
    } catch (e) {
      console.error(e);
      if (e instanceof Error && customErrorFunc) customErrorFunc(e);
    }
  };
  useEffect(() => {
    const initializeGsi = (): any => {
      /* istanbul ignore next */
      //eslint ignore next-line
      google.accounts.id.initialize({
        context: btnType === "signup" ? "signup" : "signin",
        client_id: googleClientID,
        callback: googleCallBack,
      });
      /* istanbul ignore next */
      //eslint ignore next-line
      google.accounts.id.renderButton(
        document.getElementById("googleAuthBtn"),
        {
          //shape: "circle",
          width: "250px",
          theme: "filled_blue",
          size: "large",
          text: btnType === "signup" ? "signup_with" : "signin_with",
        }
      );
    };

    const script = document.createElement("script");
    script.id = "googleLoginIdScript";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = initializeGsi();

    const documentBody = document.querySelector("body");
    if (documentBody !== null) documentBody.appendChild(script);
    //cleanup script
    return () => {
      const documentScript = document.getElementById("googleLoginIdScript");
      if (documentScript !== null) documentScript.remove();
    };
    // eslint-disable-next-line
  }, [app, btnType]);

  return (
    <div>
      <button id="googleAuthBtn" tabIndex={1} style={{ background: 'none', border: 'none' }} />
    </div>
  );
};
export default GoogleBtn;
// import { useEffect } from 'react';
// import { useRealmApp } from '../../../../realm/RealmApp';
// import { googleLogin } from '../../../../realm/authFunc/googleAuth'
// const GoogleBtn = ({
//     btnType = "login",
//     customSuccessCallback = null,
//     customErrorFunc = null,
// }) => {
//     const app = useRealmApp()
//     useEffect(() => {
//         const initializeGsi = () => {
//             google.accounts.id.initialize({
//                 context: btnType==="signup" ? "signup": "signin",
//                 client_id: googleClientID,
//                 callback: async (res: any) => {
//                     try{
//                         const user = await googleLogin(res, app, customErrorFunc)
//                         if(customSuccessCallback  && user) customSuccessCallback(user)
//                     } catch(e){
//                         console.error(e)
//                         if(customErrorFunc) customErrorFunc(e)
//                     }
//                 }
//             });
//             // google.accounts.id.prompt((notification:any) => {
//             //     if (notification.isNotDisplayed()) {
//             //         console.log(notification.getNotDisplayedReason())
//             //     } else if (notification.isSkippedMoment()) {
//             //         console.log(notification.getSkippedReason())
//             //     } else if(notification.isDismissedMoment()) {
//             //         console.log(notification.getDismissedReason())
//             //     }
//             // });
//         }
//         const script = document.createElement('script')
//         script.id="googleLoginIdScript"
//         script.src = 'https://accounts.google.com/gsi/client'
//         script.onload = initializeGsi()
//         script.async = true;
//         document.querySelector('body')?.appendChild(script)
//         //cleanup script
//         return () => document.getElementById("googleLoginIdScript")?.remove()

//     }, [app, btnType, customSuccessCallback , customErrorFunc])
//     return (
//         <div>
//             <button className="mb-2 entry-google-btn">
//                 <div className="g_id_signin entry-g_id_signin"
//                     data-type="standard"
//                     data-shape="rectangular"
//                     data-theme="outline"
//                     data-text={btnType ==="signup" ? "signup_with": "signin_with"}
//                     data-size="large"
//                     data-logo_alignment="left">
//                 </div>
//             </button>
//         </div>
//     )
// }
// export default GoogleBtn
