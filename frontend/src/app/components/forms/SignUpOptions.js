import React, { useEffect } from "react";

export default function SignUpOptions(props) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);
    }, [])
    return (
        <div className="form-signUpOptions">
            <h1 className="text-center">Join Us</h1>
            <h6 className="text-center">As a</h6>
            <div className="form-type-buttons">
                <button className="btn btn-primary m-3" onClick={() => { props.setStage({ step: 2, type: 'student' }) }}>Student</button>
                <button className="btn btn-primary m-3" onClick={() => { props.setStage({ step: 2, type: 'teacher' }) }}>Teacher</button>
            </div>
            <h6 className="text-center">Or sign up with Google:</h6>
            <div id="signUpOptions" className="d-flex flex-column mt-4 ">
                <button className="google-btn mb-2">
                    <div id="g_id_onload"
                        data-client_id="297543839155-cclc3bsf6m26pfaj1bmrfb1l4bgpcin7.apps.googleusercontent.com"
                        data-context="signup"
                        data-ux_mode="popup"
                        data-login_uri="http://localhost:3001">
                    </div>
                    <div className="g_id_signin"
                        data-type="standard"
                        data-shape="rectangular"
                        data-theme="outline"
                        data-text="signin_with"
                        data-size="large"
                        data-logo_alignment="left">
                    </div>
                </button>
            </div>
        </div >
    )
}