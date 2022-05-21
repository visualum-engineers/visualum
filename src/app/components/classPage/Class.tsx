import StorePage from "./subPages/StorePage";
import ClassworkPage from "./subPages/ClassworkPage";
import PeoplePage from "./subPages/PeoplePage";
import ClassBanner, { ClassBannerProps } from "./utilities/classBanner/ClassBanner";
const classBannerData: ClassBannerProps = {
  color: "black",
  teachers: ["Arky Asmal", "Derek Widmer"],
  classCode: "32dkf92",
  classGoals: [
    {
      _id: "1",
      description: "Complete 20 assigments",
      start_date: new Date(),
      end_date: new Date(),
      goal_type: "Assigment Completion",
    },
  ],
};
const Class = ({
  pageType,
}: {
  pageType: "classwork" | "people" | "store";
}) => {
  const map: { [key: string]: JSX.Element } = {
    classwork: <ClassworkPage />,
    people: <PeoplePage />,
    store: <StorePage />,
  };
  return (
    <div>
      <ClassBanner
        color={classBannerData.color}
        teachers={classBannerData.teachers}
        classCode={classBannerData.classCode}
        classGoals={classBannerData.classGoals}
      />
      {map[pageType]}
    </div>
  );
};
export default Class;
