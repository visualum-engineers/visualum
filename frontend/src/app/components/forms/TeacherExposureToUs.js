import React from "react"
export default function TeacherExposureToUs(props) {
    return (
        <div>
            <div className="form-floating mt-3 mb-3">
                <input
                    placeholder="School or Insitution"
                    value={props.school}
                    data-state="school"
                    onChange={props.handleChange}
                    type="text"
                    className="form-control"
                    id="school"
                    aria-describedby="school" />
                <label htmlFor="School" className="form-label">School or Insitution</label>
            </div>
            <div className="mb-3">
                <label htmlFor="exposureToUs" className="form-label">How did you hear about us?</label>
                <select
                    onChange={props.handleChange}
                    value={props.exposureToUs}
                    className="form-select"
                    size="1"
                    id="floatingSelect"
                    aria-label="select one"
                    data-state="exposureToUs"
                >
                    <option value="">Choose One</option>
                    <option value="social media">Social Media</option>
                    <option value="school-management">School Management</option>
                    <option value="co-worker">Co-worker</option>
                    <option value="students">Students</option>
                    <option value="friends or relative">Friend or Relative</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>
    )
}