import React from "react"

export default function PopUpBg(props) {
    const popUpBgStyles = {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "calc(max(100%, 100vh))",
        zIndex: props.zIndex != null ? props.zIndex : "2",
        border: 'none',
    }
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={props.containerStyles ? props.containerStyles : popUpBgStyles}
        >
            <button
                style={{ ...popUpBgStyles, backgroundColor: "rgba(0, 0, 0, 0.44)" }}
                aria-label={props.ariaLabel}
                onClick={props.onClick}
                onKeyDown={props.onKeyDown}
                data-action-label={props.ariaLabel}
            >
            </button>
            {props.children}
        </div >
    )
}