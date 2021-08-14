import React from "react";
import InputCode from "./inputCode";

export default function StudentVerifyEmail(props) {
    const onComplete = code => {
        if (loading != true) {
            loading = true
            props.handleChange(code)
        }
        //implent a way to also disable inputs... for future after 10 seconds
        setTimeout(() => loading = false, 10000)
    }
    return (
        <InputCode
            className="form-code"
            length={6}
            label="Verify Email"
            description={`Input 6-digit code sent to: ${props.email}`}
            onComplete={onComplete}
        />
    )
}