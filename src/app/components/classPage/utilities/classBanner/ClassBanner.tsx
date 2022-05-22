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
  const classData: ClassState | null = useSelector((state: RootState) => {
    const allData = state.classes.data;
    if (!allData) return null;
    const filterClass = allData.filter((a) => a.data._id === classId);
    return filterClass[0];
  });
  const className = classData?.data.name;
  const teacherName = classData?.data.teachers.map((t) => {
    if (t.prefix) return t.prefix + " " + t.last_name;
    else return t.first_name + " " + t.last_name;
  });
  return (
    <div className="class-banner-container">
      <div>
        <h1>{className}</h1>
        <p>{teacherName}</p>
        <div className="class-banner-additional">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default ClassBanner;
