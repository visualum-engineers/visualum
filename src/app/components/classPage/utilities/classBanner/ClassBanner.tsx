import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { useRealmApp } from "../../../../../realm/RealmApp";
import { ClassState } from "../../../../../redux/features/classes/classesSlice";
import { useParams } from "react-router-dom";
export interface ClassBannerProps {
  color?: string;
}
const ClassBanner = ({ color }: ClassBannerProps) => {
  const params = useParams();
  const classId = params.classId;
  const app = useRealmApp();
  const dispatch = useDispatch();
  const classData = useSelector((state: RootState) => {
    const allData = state.classes.data;
    if (!allData) return null;
    const filterClass = allData.filter((a) => a.data._id === classId);
    return filterClass[0];
  });
  const className = classData?.data.name;
  const teacherNames = classData?.data.teachers.map((t) => {
    if (t.prefix) return t.prefix + " " + t.last_name;
    else return t.first_name + " " + t.last_name;
  });
  return (
    <div className="class-banner-container">
      <div className="class-banner-header">
        <h1>{className}</h1>
        <p>{teacherNames}</p>
      </div>
      <div className="class-banner-body">
        <div className="class-banner-">
          
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};
export default ClassBanner;
