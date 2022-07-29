import StorePage from "./subPages/StorePage";
import ClassworkPage from "./subPages/ClassworkPage";
import PeoplePage from "./subPages/PeoplePage";
import ClassBanner from "./utilities/classBanner/ClassBanner";
import { Routes, Route, Navigate } from "react-router-dom";
import PeopleIcon from "./utilities/classHeader/PeopleIcon";
import ClassPageHeader, { LinkData } from "./utilities/classHeader/ClassHeader";
import { faBook, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import NavWrapper from "../utilities/navbar/primaryNavbar/NavWrapper";

const ClassPage = () => {
  const params = useParams();
  const linkData: LinkData[] = [
    {
      link: `/classes/${params.class_id}/classwork`,
      text: "Classwork",
      idForRoute: "classwork",
      icon: <FontAwesomeIcon icon={faBook} />,
    },
    {
      link: `/classes/${params.class_id}/people`,
      text: "People",
      idForRoute: "people",
      icon: <PeopleIcon />,
    },
    {
      link: `/classes/${params.class_id}/store`,
      text: "Store",
      idForRoute: "store",
      icon: <FontAwesomeIcon icon={faStore} />,
    },
  ];
  return (
    <NavWrapper showLogo textColor="#041C54" backgroundColor="#F9F9F9">
      <div className="classes-page">
        <div className="container">
          <ClassPageHeader
            className={"class-page-overall-header-carousel"}
            links={linkData}
            linkClassName={"class-page-overall-header-nav-link"}
          />
          <ClassBanner styles={{ backgroundColor: "#041C54", color: "white" }} />
          <Routes>
            <Route index element={<Navigate to="classwork" />} />
            <Route path={"classwork"} element={<ClassworkPage />} />
            <Route path={"store"} element={<StorePage />} />
            <Route path={"people"} element={<PeoplePage />} />
          </Routes>
        </div>
      </div>
    </NavWrapper>
  );
};
export default ClassPage;
