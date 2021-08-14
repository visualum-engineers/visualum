import React from "react"
export default function StudentClassCode(props) {
    return (
        <div>
            <div className="form-floating mb-3 mt-3">
                <input
                    placeholder="Enter Class Code"
                    value={props.classCode}
                    onFocus={props.handleFocus}
                    data-state="classCode"
                    onChange={props.handleChange}
                    type="text"
                    className="form-control"
                    id="classCode"
                    aria-describedby="classCode" />
                <label htmlFor="classCode" className="form-label">Enter Class Code</label>
            </div>
        </div>
    )
}