import React from "react";
import InputCode from "./inputCode";

export default function StudentVerifyEmail(props) {
    const onComplete = code => {
        if (props.verifyEmail(code)) {
            props.handleStageChange(4)
        }
    }
    return (
        <div className="d-flex flex-column align-items-center">
            <InputCode
                className="form-code"
                length={6}
                label="Verify Email"
                description={`Input 6-digit code sent to: ${props.email}`}
                onComplete={onComplete}
            />
            <button
                className="col-5 btn btn-secondary"
                onClick={() => { props.handleStageChange(2) }}
            >
                Back
            </button>
        </div>

    )
}