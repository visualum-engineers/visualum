import React from "react";
export default function NewGameForm(props: any) {
  return (
    <div className="row w-100 d-flex justify-content-center">
      <div className="col-12 text-center">
        <h2 className="text-light mb-3">Create a Game</h2>
      </div>
      <div className="col-12 row d-flex justify-content-center">
        <div className="col-4">
          <div className="form-floating">
            <input
              placeholder="Game Name"
              value={props.gameName}
              data-state="gameName"
              onChange={props.handleChange}
              type="text"
              className="form-control"
              id="gameName"
            />
            <label htmlFor="gameName" className="form-label">
              Game Name
            </label>
          </div>
        </div>
      </div>
      <div className="col-12 row d-flex justify-content-center mt-3">
        <div className="col-4">
          <label className="form-label text-light">Select Game Type:</label>
          <select className="form-select" aria-label="Select Game Type">
            <option selected value="dnd">
              Drag-and-Drop
            </option>
            <option value="match">Matching</option>
            <option value="mc">Multiple Choice</option>
            <option value="sr">Short Response</option>
          </select>
        </div>
      </div>
      <div className="col-12 row d-flex justify-content-center mt-3">
        <div className="col-4">
          <button
            className="btn btn-primary w-100"
            onClick={() => {
              props.handleStageChange(2);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
