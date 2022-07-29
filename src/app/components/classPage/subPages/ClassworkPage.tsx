import { string } from "prop-types";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../../utilities/searchBar/SearchBar";
import AssignmentGroupWrapper from "../utilities/assignmentGroupWrapper/AssignmentGroupWrapper";
import AssignmentItem from "../utilities/assignmentItem/AssignmentItem";
import ClassPageHeader from "../utilities/classHeader/ClassHeader";
import ClassStoreItem from "../utilities/classStoreItem/ClassStoreItem";
import FilterList from "../utilities/filterList/FilterList";

const ClassworkPage = () => {

  const { pathname } = useLocation();

  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }

  const filterString = useQuery().get("filter");

  const assignmentData = {
    title:
      "Science HW week 3Science HW week 3Science HW week 3Science HW week 3Science HW week 3Science HW week 3Science HW week 3Science HW week 3Science HW week 3Science HW week 3Science HW week 3Science HW week 3",
    reward_pts: 50,
    due_date: new Date(),
    creation_date: new Date(),
    main_image: {
      href: "hello",
      description: "hello",
    },
  };
  const storeData = {
    _id: "32324",
    name: "Homework Pass",
    price: 80,
    imgURL: "hello.jpg",
    creation_date: new Date(),
    num_available: 10,
  };
  const filterData = [
    {
      title: "hello",
      filterActive: true,
      ascendingCallback: () => { },
      descendingCallback: () => { },
    },
  ];

  const subheaderLinks = [
    { text: 'Upcoming', link: `${pathname}?filter=upcoming`, idForRoute: 'test', selected: filterString === "upcoming" },
    { text: 'Past Due', link: `${pathname}?filter=pastDue`, idForRoute: 'test', selected: filterString === "pastDue" },
    { text: 'Completed', link: `${pathname}?filter=completed`, idForRoute: 'test', selected: filterString === "completed" },
    { text: 'View All', link: `${pathname}?filter=viewAll`, idForRoute: 'test', selected: filterString === "viewAll" },
  ]

  type Pages = {
    upcoming: JSX.Element,
    viewAll: JSX.Element,
  }

  const pages: Pages = {
    "upcoming":
      <div>
        <AssignmentItem assignmentData={assignmentData} />
        <AssignmentItem assignmentData={assignmentData} />
        <AssignmentGroupWrapper id={"hello"} groupName={"Test Group 1"}>
          <AssignmentItem assignmentData={assignmentData} />
        </AssignmentGroupWrapper>
      </div>,
    "viewAll":
      <div>
        <AssignmentItem assignmentData={assignmentData} />
        <AssignmentItem assignmentData={assignmentData} />
        <AssignmentGroupWrapper id={"hello"} groupName={"Test Group 1"}>
          <AssignmentItem assignmentData={assignmentData} />
        </AssignmentGroupWrapper>
      </div>,
  }

  const currentPage = pages[filterString as keyof Pages || "viewAll" as keyof Pages];

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-7">
          <ClassPageHeader links={subheaderLinks} linkClassName={"class-page-subheader-nav-link"} className={"subheader"} />
        </div>
        <div className="col-12 col-md-5 d-flex align-items-center">
          <SearchBar
            onChange={(e) => {
              //console.log(e);
            }}
            onSearch={(e) => { console.log(e) }}
            style={{ width: "100%" }}
          />
        </div>
        {currentPage}
      </div>

    </>
  );
};
export default ClassworkPage;
