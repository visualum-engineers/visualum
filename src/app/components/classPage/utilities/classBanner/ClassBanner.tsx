import { ClassGoal } from "../../../../../types/ClassSchema";

export interface ClassBannerProps {
  color: string;
  teachers: string[];
  classCode: string;
  classGoals: ClassGoal[];
}
const ClassBanner = ({
  color,
  teachers,
  classCode,
  classGoals,
}: ClassBannerProps) => {
  
  return <div className="class-banner-container">
    <div>
      <h1></h1>
      <p></p>
      <div className="class-banner-additional">
        <div>

        </div>
        <div>

        </div>
      </div>
    </div>

  </div>;
};
export default ClassBanner;
