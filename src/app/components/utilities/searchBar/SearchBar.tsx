import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const SearchBar = ({
  className,
  onChange,
  placeholder,
  onSearch,
  style,
}: {
  placeholder?: string;
  className?: string;
  onChange?: (e: string) => void;
  onSearch?: (e: string) => void;
  style?: object;
}) => {
  const [toggled, setToggle] = useState(false);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (onChange) onChange(inputValue);
  }, [inputValue, onChange]);
  const namespace = "search-bar";
  return (
    <div
      className={`${namespace}-container ${className ? className : ""} ${toggled ? "selected" : ""
        }`}
      style={style}
    >
      <button
        className={`${namespace}-icon ${toggled ? "selected" : ""}`}
        onClick={
          //change focus to input
          (e) => {
            const target = e.currentTarget;
            const nextElement = target.nextElementSibling as HTMLElement;
            //trigger on search func
            if (onSearch) onSearch(inputValue);
            nextElement?.focus();
          }
        }
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <input
        className={`${namespace}-input ${inputValue.length > 0 ? "selected" : ""
          }`}
        onFocus={() => setToggle(true)}
        onBlur={() => setToggle(false)}
        value={inputValue}
        placeholder={placeholder ? placeholder : "Search"}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSearch) onSearch(inputValue);
        }}
      />
    </div>
  );
};
export default SearchBar;
