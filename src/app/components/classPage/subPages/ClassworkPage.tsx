import AssignmentGroupWrapper from "../utilities/assignmentGroupWrapper/AssignmentGroupWrapper";
import AssignmentItem from "../utilities/assignmentItem/AssignmentItem";
import ClassStoreItem from "../utilities/classStoreItem/ClassStoreItem";
import FilterList from "../utilities/filterHeader/FilterList";

const ClassworkPage = () => {
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
      ascendingCallback: () => {},
      descendingCallback: () => {},
    },
  ];
  return (
    <>
      <AssignmentGroupWrapper id={"hello"} groupName={"hello"}>
        <AssignmentItem assignmentData={assignmentData} />
      </AssignmentGroupWrapper>
      <ClassStoreItem data={storeData} />
      <FilterList data={filterData} />
    </>
  );
};
export default ClassworkPage;
