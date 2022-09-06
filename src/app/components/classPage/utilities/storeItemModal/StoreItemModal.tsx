import React from "react";
import ReactDOM from "react-dom";
import ModalContainer from "../../../utilities/modals/ModalContainer";
import SelectPicture from "./SelectPicture";

export default function StoreItemModal({ toggle, buttons }: any) {

  return ReactDOM.createPortal(
    <ModalContainer toggle={toggle} title="Create a Reward" buttons={buttons}>
      <div className="store-item-modal px-5">
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Reward Name" />
            </div>
          </div>
          <div className="col-3">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">Point Cost</label>
              <input type="number" min={0} className="form-control" id="exampleFormControlInput2" placeholder="0" />
            </div>
          </div>
          <div className="col-3">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput3" className="form-label">Num Available</label>
              <input type="number" min={0} className="form-control" id="exampleFormControlInput3" placeholder="0" />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput4" className="form-label">Description</label>
              <textarea className="form-control" rows={4} id="exampleFormControlInput4" placeholder="Write your reward description here..." />
            </div>
          </div>
          <div className="col-12">
            <SelectPicture />
          </div>
        </div>
      </div>
    </ModalContainer >
    , document.body);
}
