import ClampLines, {
} from "../../../utilities/clampLines/ClampLines";
import { ClassGoal, ClassSchema } from "../../../../../types/ClassSchema";
import splitArrByFactor from "../../../../helpers/splitArrByFactor";
import { useWindowWidth } from "../../../../hooks";

import RadialLoadingDial from "../../../utilities/radialLoadingDial/RadialLoadingDial";
const Goal = ({
  data,
  btnStyles,
}: {
  data: ClassGoal;
  btnStyles?: { [key: string]: string };
}) => {
  const namespace = "classroom-banner-goal";
  return (
    <div className={`${namespace} col`}>
      <ClampLines
        className={`${namespace}-description`}
        id={data._id.toString()}
        text={data.description}
        lines={3}
        ellipsis={"... See more"}
        innerElement="p"
        moreText=""
        lessText="Collapse"
        wrapperBtn
        buttons={false}
        btnClassName={`${namespace}-expand-btn`}
      />
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
