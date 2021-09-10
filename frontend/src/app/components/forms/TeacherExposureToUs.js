import React from "react"
export default function TeacherExposureToUs(props) {
    return (
        <div>
            <div className="logSignForm form-floating mt-3 mb-3">
                <input
                    placeholder="School or Insitution"
                    value={props.school}
                    data-state="school"
                    onChange={props.handleChange}
                    type="text"
                    className="logSignForm form-control"
                    id="school"
                    aria-describedby="school" />
                <label htmlFor="School" className="logSignForm form-label">School or Insitution</label>
            </div>
            <div className="mb-3">
                <label htmlFor="exposureToUs" className="logSignForm form-label">How did you hear about us?</label>
                <select
                    // onChange={props.handleChange}
                    onChange={props.handleSelect}
                    value={props.exposureToUs}
                    className="logSignForm form-select"
                    size="1"
                    id="floatingSelect"
                    aria-label="select one"
                    data-state="exposureToUs"
                >
                    <option value="">Choose One</option>
                    <option value="social-media">Social Media</option>
                    <option value="school-management">School Management</option>
                    <option value="co-worker">Co-worker</option>
                    <option value="students">Students</option>
                    <option value="friends-or-relative">Friend or Relative</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="d-flex justify-content-around">
                <button
                    className="btn btn-secondary"
                    onClick={() => { props.handleStageChange(2) }}
                >
                    Back
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => { props.handleStageChange(4) }}
                >
                    Continue
                </button>
            </div>
        </div>
    )
}