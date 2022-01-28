import { useEffect } from 'react';
import { useRealmApp } from '../../../../../realm/RealmApp';
import { googleLogin } from '../../../../../realm/authFunc/googleAuth'
/*global google */
const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID
const GoogleLoginBtn = () => {
    const app = useRealmApp()
    useEffect(() => {
        const initializeGsi = () => {
            google.accounts.id.initialize({
                client_id: googleClientID,
                callback: (res) => googleLogin(res, app)
            });
            google.accounts.id.prompt(notification => {
                if (notification.isNotDisplayed()) {
                    console.log(notification.getNotDisplayedReason())
                } else if (notification.isSkippedMoment()) {
                    console.log(notification.getSkippedReason())
                } else if(notification.isDismissedMoment()) {
                    console.log(notification.getDismissedReason())
                }
            });
        }
        const script = document.createElement('script')
        script.id="googleLoginIdScript"
        script.src = 'https://accounts.google.com/gsi/client'
        script.onload = initializeGsi()
        script.async = true;
        document.querySelector('body').appendChild(script)
        //cleanup script
        return () => document.getElementById("googleLoginIdScript").remove()

    }, [app])
    return (
        <div>
            <button className="mb-2 entry-google-btn">
                <div className="g_id_signin entry-g_id_signin"
                    data-type="standard"
                    data-shape="rectangular"
                    data-theme="outline"
                    data-text="signin_with"
                    data-size="large"
                    data-logo_alignment="left">
                </div>
            </button>
        </div>
    )
}
export default GoogleLoginBtn