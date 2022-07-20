import { faCopy, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import TrianglePointer from "../trianglePointer/TrianglePointer";
const CopyTextInput = ({
  text,
  styles,
  className,
  textType
}: {
  text: string;
  styles?: { [key: string]: string };
  className?: string;
  textType?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const namespace = "copy-text-input";
  return (
    <>
      <div
        className={`${namespace}-container ${className ? className : ""}`}
        style={styles}
      >
        <div className={`${namespace}`}>{text}</div>
        <button
          className={`${namespace}-copy-btn ${copied ? "copied" : ""}`}
          onClick={() => {
            navigator.clipboard.writeText(text).then(() => setCopied(true));
          }}
          onMouseLeave = {() => setCopied(false)}
          onBlur = {() => setCopied(false)}
        >
          <div style={{position: "relative"}}>
            <TrianglePointer
              textContent={`Copied ${textType}`}
              dropDownActive={copied}
              customClassName={`${namespace}-success-container`}
            />
          </div>

          {copied ? (
            <FontAwesomeIcon icon={faCheckCircle} />
          ) : (
            <FontAwesomeIcon icon={faCopy} />
          )}
        </button>
      </div>
    </>
  );
};
export default CopyTextInput;
