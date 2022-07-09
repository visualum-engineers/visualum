import AssignmentItem from "../utilities/assignmentItem/AssignmentItem";

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
  return <AssignmentItem assignmentData={assignmentData} />;
};
export default ClassworkPage;
