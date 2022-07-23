import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClickOutside from "../../../../hooks/use-click-outside";
const namespace = "class-page-list-item";
export const ListItemName = ({
  text,
  imgURL,
  className,
}: {
  text: string;
  imgURL?: string;
  className?: string;
}) => {
  return (
    <div className={`${namespace}-name ${className ? className : ""}`}>
      <div className={`${namespace}-image-container`}>
        <img
          className={`${namespace}-image`}
          src={imgURL}
          alt={`${text}-profile-image`}
        />
      </div>
    </div>
  );
};
export type BtnData = {
  onClick: (e: any) => void;
  text?: string;
  ariaLabel?: string;
  className?: string;
  styles?: { [key: string]: string };
  popUpActionEl?: JSX.Element;
  customData?: { [key: string]: string };
};
export const ActionBtn = (btnData: BtnData) => {
  const convertData = btnData.customData
    ? Object.entries(btnData.customData).map(([key, value]) => {
        return { [`data-${key}`]: value };
      })
    : {};
  return (
    <button
      {...convertData}
      className={`${namespace}-action-btn ${
        btnData.className ? btnData.className : ""
      }`}
      onClick={(e) => {
        btnData.onClick(e);
      }}
      aria-label={btnData.ariaLabel}
      style={btnData.styles}
    >
      {btnData.text}
    </button>
  );
};
export const ActionDropDownList = ({ data }: { data: BtnData[] }) => {
  return (
    <div className={`${namespace}-action-btns`}>
      {data.map((btnData) => (
        <ActionBtn key={btnData.text} {...btnData} />
      ))}
    </div>
  );
};
export const ListItemActions = ({
  data,
  className,
}: {
  data: BtnData[];
  className?: string;
}) => {
  const { ref, isClickOutside, setisClickOutside } = useClickOutside(false);
  return (
    <div className={`${namespace}-actions ${className ? className : ""}`}>
      <button
        ref={ref}
        className={`${namespace}-actions-icon`}
        onClick={() => setisClickOutside((state) => !state)}
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </button>
      {isClickOutside && <ActionDropDownList data={data} />}
    </div>
  );
};
