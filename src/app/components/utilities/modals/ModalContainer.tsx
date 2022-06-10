import React from "react";
import PopUpBg from "../popUp/PopUpBackground";
import ExitIcon from "../exitIcon/ExitIcon";
import PropTypes from 'prop-types';
function ModalContainer({
  children,
  zIndex = 10000,
  toggle,
  title,
  buttons,
  extraClasses,
  clickOutToClose = true
}: any) {
  return (
    <PopUpBg zIndex={zIndex} onClick={clickOutToClose ? toggle : () => { }}>
      <div
        className={`modal-container ${extraClasses ? extraClasses.join(" ") : ""
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
        <div className="header px-4">
          <h2>{title}</h2>
        </div>
        <div className="body">{children}</div>
        <div className="buttons">{buttons}</div>
      </div>
    </PopUpBg>
  );
}

ModalContainer.propTypes = {
  toggle: PropTypes.func.isRequired,
  title: PropTypes.string,
  zIndex: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  clickOutToClose: PropTypes.bool,
  buttons: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  extraClasses: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]),
}


export default ModalContainer;