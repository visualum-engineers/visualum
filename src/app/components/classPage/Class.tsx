import StorePage from "./subPages/StorePage";
import ClassworkPage from "./subPages/ClassworkPage";
import PeoplePage from "./subPages/PeoplePage";
import ClassBanner from "./utilities/classBanner/ClassBanner";
import { Routes, Route } from "react-router-dom";
const Class = () => {
  return (
    <div>
      <ClassBanner color="black" />
      <Routes>
        <Route index element={<ClassworkPage />} />
        <Route path={"classwork"} element={<ClassworkPage />} />
        <Route path={"store"} element={<StorePage />} />
        <Route path={"people"} element={<PeoplePage />} />
      </Routes>
    </div>
  );
};
export default Class;
