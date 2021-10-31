import React from "react";
export default function Enterprise(props) {
    return (
        <div className="w-25">
            <div className="entry-forms-floating form-floating mt-3 mb-3">
                <input
                    placeholder='School Code'
                    value={props.schoolCode}
                    data-state="schoolCode"
                    onChange={props.handleChange}
                    onFocus={props.handleFocus}
                    type="number"
                    className="entry-forms-floating form-control"
                    id="schoolCode"
                    aria-describedby="schoolCodeHelp" />
                <label htmlFor="schoolCode" className="entry-forms-floating form-label">School Code</label>
            </div>
            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-secondary"
                    onClick={() => { props.handleStageChange(3) }}
                >
                    Back
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => { props.completeForm() }}
                >
                    Continue
                </button>
            </div>
        </div>
    )
}