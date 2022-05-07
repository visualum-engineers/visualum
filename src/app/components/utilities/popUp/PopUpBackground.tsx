export default function PopUpBg({
    zIndex,
    containerStyles,
    ariaLabel,
    onKeyDown,
    onClick,
    children
}: any) {
    const popUpBgStyles:any = {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "calc(max(100%, 100vh))",
        zIndex: zIndex != null ? zIndex : "2",
        border: 'none',
        cursor: "default"
    }
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={containerStyles ? containerStyles : popUpBgStyles}
        >
            <button
                style={{ ...popUpBgStyles, backgroundColor: "rgba(0, 0, 0, 0.44)" }}
                aria-label={ariaLabel}
                onClick={onClick}
                onKeyDown={onKeyDown}
                data-action-label={ariaLabel}
            >
            </button>
            {children}
        </div >
    )
}