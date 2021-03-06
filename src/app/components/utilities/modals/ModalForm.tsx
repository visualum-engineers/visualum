import React from "react";
import PropTypes from "prop-types";
import ModalContainer from "./ModalContainer";

const TextField = ({ name, displayName, inputType, placeholderText = "" }: any) => {
  return (
    <div className="mb-3">
      <label htmlFor={`${name}-id`} className="form-label">
        {displayName}
      </label>
      <input
        type={inputType || "text"}
        className="form-control"
        id={`${name}-id`}
        name={name}
        placeholder={placeholderText}
      />
    </div>
  );
};

const Button = ({ variant, func, action, buttonText }: any) => {
  return (
    <button
      className={`btn btn-${variant || "primary"}`}
      onClick={func}
      type={action === "Submit" ? "submit" : "button"}
    >
      {buttonText}
    </button>
  );
};

function ModalForm({ items, actions, title, toggle }: any) {
  const inputs = items.map((item: any) => {
    switch (item.controlType) {
      case "TextField":
        return (
          <TextField
            name={item.name}
            displayName={item.displayName}
            inputType={item.inputType}
            placeholderText={item.placeholderText}
          />
        );
      default:
        return null;
    }
  });

  const buttons = actions.map((action: any) => {
    return (
      <Button
        variant={action.variant}
        func={action.func || toggle}
        action={action.action}
        buttonText={action.buttonText}
      />
    );
  });

  return (
    <ModalContainer title={title} toggle={toggle} buttons={buttons}>
      <form
        style={{
          padding: "0 40px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {inputs}
      </form>
    </ModalContainer>
  );
}

ModalForm.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      controlType: PropTypes.string.isRequired,
      inputType: PropTypes.string,
      displayName: PropTypes.string,
      placeholderText: PropTypes.string,
    })
  ).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      buttonText: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired,
      variant: PropTypes.string,
    })
  ),
  title: PropTypes.string.isRequired,
  toggle: PropTypes.string.isRequired,
};

export default ModalForm;
