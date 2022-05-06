import React from "react"
export default function StudentClassCode(props) {
    const verify = (e) => {
        if (props.verifyClassCode(e)) {
            // Set Verified to true, will cause a rerended and a redirect
            props.completeForm();
        }
    }

    return (
        <div>
            <div className="entry-forms-floating form-floating mb-3 mt-3">
                <input
                    placeholder="Enter Class Code"
                    onChange={props.handleChange}
                    data-state="classCode"
                    type="text"
                    className="entry-forms-floating form-control"
                    id="classCode"
                    aria-describedby="classCode"
                />
                <label htmlFor="classCode" className="entry-forms-floating form-label">Enter Class Code</label>
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary" onClick={verify}>Submit</button>
            </div>
        </div>
    )
}