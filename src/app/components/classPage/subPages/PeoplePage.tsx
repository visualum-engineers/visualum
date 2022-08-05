import { useMemo } from "react";
import { Person } from "../../../../types/PersonSchema";
import { useLocation } from "react-router-dom";
import SearchBar from "../../utilities/searchBar/SearchBar";
import AssignmentGroupWrapper from "../utilities/assignmentGroupWrapper/AssignmentGroupWrapper";
import PeopleItem from "../utilities/peopleItem/PeopleItem";
import ClassPageHeader from "../utilities/classHeader/ClassHeader";

const PeoplePage = () => {

    const { pathname } = useLocation();

    function useQuery() {
        const { search } = useLocation();

        return useMemo(() => new URLSearchParams(search), [search]);
    }

    const filterString = useQuery().get("filter") || "students";

    const personData: Person = {
        name: "Mr. Asmal",
        email: "aasmal@visualum.com",
        custom_field: "custom text",
        main_image: {
            href: "hello",
            description: "hello",
        },
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
        { text: 'Students', link: `${pathname}?filter=students`, idForRoute: 'test', selected: filterString === "students" },
        { text: 'Teachers', link: `${pathname}?filter=teachers`, idForRoute: 'test', selected: filterString === "teachers" },
        { text: 'Groups', link: `${pathname}?filter=groups`, idForRoute: 'test', selected: filterString === "groups" },
        { text: 'View All', link: `${pathname}?filter=viewAll`, idForRoute: 'test', selected: filterString === "viewAll" },
    ]

    type Pages = {
        teachers: JSX.Element,
        students: JSX.Element,
    }

    const pages: Pages = {
        "teachers":
            <div>
                <PeopleItem personData={personData} />
                <PeopleItem personData={personData} />
                <AssignmentGroupWrapper id={"hello"} groupName={"Test Group 1"}>
                    <PeopleItem personData={personData} />
                </AssignmentGroupWrapper>
            </div>,
        "students":
            <div>
                <PeopleItem personData={personData} />
                <PeopleItem personData={personData} />
                <AssignmentGroupWrapper id={"hello"} groupName={"Test Group 1"}>
                    <PeopleItem personData={personData} />
                </AssignmentGroupWrapper>
            </div>,
    }

    const currentPage = pages[filterString as keyof Pages || "students" as keyof Pages];

    return (
        <>
            <div className="row">
                <div className="col-12 col-lg-7">
                    <ClassPageHeader links={subheaderLinks} linkClassName={"class-page-subheader-nav-link"} className={"subheader"} />
                </div>
                <div className="col-12 col-lg-5 d-flex align-items-center assignment-search-and-button">
                    <SearchBar
                        onChange={(e) => {
                            //console.log(e);
                        }}
                        onSearch={(e) => { console.log(e) }}
                        style={{ width: "100%" }}
                    />
                    <div className="btn btn-primary classes-add-button">+ New Student</div>
                </div>
                {currentPage}
            </div>

        </>
    );
};
export default PeoplePage;
