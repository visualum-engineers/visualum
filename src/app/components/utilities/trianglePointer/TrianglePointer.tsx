const TrianglePointer = ({
  dropDownActive,
  textContent,
  customDropDownID = undefined,
  customClassName = "",
  pointerDown = false,
}: {
  dropDownActive: boolean;
  textContent?: string;
  customDropDownID?: string;
  customClassName?: string;
  pointerDown?: boolean;
}) => {
  return (
    <div
      aria-hidden={!dropDownActive}
      className={
        `triangle-pointer-container` +
        `${dropDownActive ? " triangle-pointer-container-show" : ""}` +
        `${customClassName ? " " + customClassName : ""}`
      }
    >
      {pointerDown ? (
        <>
          <p id={customDropDownID}>{textContent}</p>
          <div className="triangle-pointer-down" />
          <div className="triangle-pointer-2-down" />
        </>
      ) : (
        <>
          <div className="triangle-pointer" />
          <div className="triangle-pointer-2" />
          <p id={customDropDownID}>{textContent}</p>
        </>
      )}
    </div>
  );
};
export default TrianglePointer;
