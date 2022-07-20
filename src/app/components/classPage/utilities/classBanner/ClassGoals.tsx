import ClampLines, { ClampLinesState } from "../../../utilities/clampLines/ClampLines";
import { ClassGoal, ClassSchema } from "../../../../../types/ClassSchema";
import splitArrByFactor from "../../../../helpers/splitArrByFactor";
import { useWindowWidth } from "../../../../hooks";
import { useState } from "react";

import RadialLoadingDial from "../../../utilities/radialLoadingDial/RadialLoadingDial";
const Goal = ({
  data,
  btnStyles,
}: {
  data: ClassGoal;
  btnStyles?: { [key: string]: string };
}) => {
  const [expanded, setExpanded] = useState(true);
  const namespace = "classroom-banner-goal";
  return (
    <div className={`${namespace} col`}>
      {!expanded ? (
        <div className={`${namespace}-description expanded`}>
          <p>{data.description}</p>
          <button className = {`${namespace}-expand-btn`} onClick={() => setExpanded(true)}> Collapse </button>
        </div>
      ) : (
        <button onClick={() => setExpanded(false)}>
          <ClampLines
              className={`${namespace}-description ${!expanded ? "expanded" : ""}`}
              id={data._id.toString()}
              text={data.description}
              lines={1}
              ellipsis={"... See more"}
              innerElement="p"
              moreText=""
              lessText="Collapse"
              buttons={false}
              customOnChange = {(e: ClampLinesState ) => setExpanded(e.expanded)}
            />
        </button>
      )}

      <RadialLoadingDial
        progressNum={data.progress}
        className={`${namespace}-progress`}
      />
    </div>
  );
};
const ClassGoals = ({
  data,
  btnStyles,
}: {
  data: ClassSchema;
  btnStyles?: { [key: string]: string };
}) => {
  const smallWidth = useWindowWidth(768);
  const columns = !smallWidth ? 1 : 2;
  const splitArr = data.class_goals
    ? splitArrByFactor(data.class_goals, columns)
    : [];
  return (
    <div className="classroom-banner-class-goals">
      <h3>Class Goals</h3>
      {splitArr.map((column) => (
        <div key={column[0]._id.toString()} className="row">
          {column.map((goalData) => (
            <Goal
              key={goalData._id.toString()}
              data={goalData}
              btnStyles={btnStyles}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
export default ClassGoals;
