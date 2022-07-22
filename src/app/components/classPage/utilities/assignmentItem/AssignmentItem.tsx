import { Assigment } from "../../../../../types/AssignmentSchema";
import { useWindowWidth } from "../../../../hooks";
import ClampLines from "../../../utilities/clampLines/ClampLines";

const AssignmentItem = ({ assignmentData }: { assignmentData: Assigment }) => {
  const mediumWidth = useWindowWidth(576);

  return (
    <div className="assignment-item-container">
      <div className="assignment-item-image-container">
        {assignmentData.main_image && (
          <img
            className="assignment-item-image"
            src={assignmentData.main_image.href}
            alt={assignmentData.main_image.description}
          />
        )}
      </div>
      <div className="assignment-item-content">
        <div className="assignment-item-row">
          <ClampLines
            id={assignmentData.title}
            className="assignment-item-title"
            text={assignmentData.title}
            lines={1}
            ellipsis="..."
            innerElement="div"
            buttons={false}
          />
          <div className="assignment-item-reward-pts">
            {mediumWidth && "Reward:"} {assignmentData.reward_pts}
            {" pts"}
          </div>
        </div>
        <div className="assignment-item-row">
          <div className="assignment-item-due-date">
            Due Date:{" "}
            {assignmentData.due_date
              ? new Date(assignmentData.due_date).toLocaleDateString("en-us", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
              : "No due date"}
          </div>
          <div className="assignment-item-creation-date">
            Posted:{" "}
            {new Date(assignmentData.creation_date).toLocaleDateString(
              "en-us",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssignmentItem;
