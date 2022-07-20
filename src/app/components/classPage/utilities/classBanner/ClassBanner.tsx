import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { useRealmApp } from "../../../../../realm/RealmApp";
import { ClassroomState } from "../../../../../redux/features/classes/classesSlice";
import { useParams } from "react-router-dom";
import { isBefore, setDate } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { transformTeacherNames } from "../../../../helpers/transformTeacherNames";
import JoinClass from "./JoinClass";
import ClassGoals from "./ClassGoals";
export interface ClassBannerProps {
  styles?: { [key: string]: string };
}
const classroomData: ClassroomState["data"] = {
  name: "7C Science",
  _id: uuidv4(),
  teachers: [
    {
      first_name: "Arky",
      last_name: "Asmal",
      prefix: "Mr",
      user_id: uuidv4(),
      _id: uuidv4(),
    },
    {
      first_name: "Derek",
      last_name: "Widmer",
      prefix: "Mr",
      user_id: uuidv4(),
      _id: uuidv4(),
    },
    {
      first_name: "Emilio",
      last_name: "Samaniego",
      prefix: "Mr",
      user_id: uuidv4(),
      _id: uuidv4(),
    },
  ],
  school: {
    name: "I.S 187",
    school_id: uuidv4(),
  },
  students: [
    {
      first_name: "Arky",
      last_name: "Asmal",
      email: "arkyasmal@gmail.com",
      user_id: uuidv4(),
      _id: uuidv4(),
    },
  ],
  active_assignments: ["r32r32"],
  creation_date: new Date(),
  class_goals: [
    {
      description: "Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments",
      goal_type: "Assigment Completion",
      _id: "324234twer",
      start_date: new Date(),
      end_date: setDate(new Date(), 3),
      progress: 80
    },
    {
      description: "Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments",
      goal_type: "Assigment Completion",
      _id: "rfreref",
      start_date: new Date(),
      end_date: setDate(new Date(), 3),
      progress: 80
    },
    {
      description: "Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments",
      goal_type: "Assigment Completion",
      _id: "freferf",
      start_date: new Date(),
      end_date: setDate(new Date(), 3),
      progress: 80
    },
    {
      description: "Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments Finish 100 HW assignments",
      goal_type: "Assigment Completion",
      _id: "fervrev",
      start_date: new Date(),
      end_date: setDate(new Date(), 3),
      progress: 80
    },
  ],
  class_code: {
    expiration: setDate(new Date(), 3),
    code: "f3ff3ffm",
  },
  class_reward_store: {
    _id: uuidv4(),
    name: "store name",
    rewards: ["retretre"],
  },
};

const ClassroomBanner = ({ styles }: ClassBannerProps) => {
  const params = useParams();
  const classId = params.classId;
  const app = useRealmApp();
  const dispatch = useDispatch();
  const classroomState: ClassroomState | null = useSelector(
    (state: RootState) => {
      const allData = state.classes.data;
      if (!allData) return null;
      const filterClass = allData.filter((a) => a.data._id === classId);
      return filterClass[0];
    }
  );
  //const classroomData = classroomState?.data;

  const classroomStatus = classroomState?.status;
  const classroomName = classroomData?.name;
  const teacherNames = classroomData
    ? transformTeacherNames(classroomData.teachers)
    : "";

  return (
    <div className="classroom-banner-container" style={styles}>
      <div className="classroom-banner-header">
        <h1>{classroomName}</h1>
        <p>Teachers: {teacherNames}</p>
      </div>
      <div className="classroom-banner-body">
        {classroomData &&
          isBefore(new Date(), new Date(classroomData.class_code.expiration))}
        <JoinClass data={classroomData} />
        {classroomData?.class_goals && classroomData.class_goals.length > 0 && (
          <ClassGoals data={classroomData} />
        )}
      </div>
    </div>
  );
};
export default ClassroomBanner;
