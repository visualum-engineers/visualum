import ClampLines from "../../../utilities/clampLines/ClampLines";

const AssignmentGroupWrapper = ({
  id,
  groupName,
  children,
}: {
  id: string;
  groupName: string;
  children: JSX.Element;
}) => {
  return (
    <div className="assignment-group-container">
      <ClampLines
        id={id}
        className="assignment-group-title"
        text={groupName}
        lines={1}
        ellipsis={"..."}
        innerElement="h3"
        buttons={false}
      />
      {children}
    </div>
  );
};
export default AssignmentGroupWrapper;
