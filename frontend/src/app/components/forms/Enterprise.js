import React from "react";
export default function Enterprise(props) {
    return (
        <div>
            <div className="mb-3">
                <label htmlFor="schoolCode" className="form-label">School Code</label>
                <input
                    data-state="schoolCode"
                    onChange={props.handleChange}
                    type="number"
                    id="schoolCode"
                    aria-describedby="schoolCodeHelp" />
            </div>
        </div>
    )
}