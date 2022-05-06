import React from 'react';

export default function NewGameForm(props) {
    return (
        <div className="row w-100 d-flex justify-content-center">
            <div className="col-12 text-center">
                <h2 className="text-light mb-3">Game Settings</h2>
            </div>
            <div className="col-12 row d-flex justify-content-center mt-3">
                <div className="col-4">
                    <label className="form-label text-light">Competitive or Individual?</label>
                    <select class="form-select" aria-label="Select Game Type">
                        <option selected value={true}>Competitive</option>
                        <option value={false}>Individual</option>
                    </select>
                </div>
            </div>
            <div className="col-12 row d-flex justify-content-center mt-3">
                <div className="col-4">
                    <button
                        className="btn btn-primary w-100"
                        onClick={props.handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
