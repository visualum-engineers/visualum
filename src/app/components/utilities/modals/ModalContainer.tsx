import React from "react";
import PopUpBg from "../popUp/PopUpBackground";
import ExitIcon from "../exitIcon/ExitIcon";

export default function ModalContainer({
  children,
  zIndex = 10000,
  toggle,
  title,
  buttons,
  extraClasses,
}: any) {
  return (
    <PopUpBg zIndex={zIndex} onClick={toggle}>
      <div
        className={`modal-container ${
          extraClasses ? extraClasses.join(" ") : ""
        }`}
        style={{ zIndex: zIndex + 1 }}
      >
        <div className="modal-close">
          <div
            className="close-button"
            onClick={toggle}
            style={{ zIndex: zIndex + 1 }}
          >
            <ExitIcon />
          </div>
        </div>
        <div className="header">
          <h2>{title}</h2>
        </div>
        <div className="body">{children}</div>
        <div className="buttons">{buttons}</div>
      </div>
    </PopUpBg>
  );
}
