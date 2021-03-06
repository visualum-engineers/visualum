import React, { useState } from "react";
import AssignmentCard from "./AssignmentCard";
import CardContainer from "./CardContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function DashboardAssignments() {
  const [assignments, setAssignments] = useState([
    {
      title: "History Homework",
      className: "4th Period",
      dueDate: "Dec 31st, 2021",
    },
    {
      title: "Math Homework",
      className: "8th Period",
      dueDate: "Dec 30th, 2021",
    },
    {
      title: "Chemistry Homework",
      className: "4th Period",
      dueDate: "Dec 31st, 2021",
    },
    {
      title: "English Homework",
      className: "8th Period",
      dueDate: "Dec 30th, 2021",
    },
  ]);

  const addAssignment = (newAssignment: any) => {
    setAssignments((curr) => [...curr, newAssignment]);
  };

  const cards = assignments.map((assignment) => {
    return (
      <div className="col-md-4 col-12 p-2" key={assignment.title}>
        <AssignmentCard
          title={assignment.title}
          className={assignment.className}
          dueDate={assignment.dueDate}
        />
      </div>
    );
  });

  return (
    <div>
      <div className="control-bar">
        <div className="buttons">
          <button
            className="btn btn-success button"
            onClick={() =>
              addAssignment({
                title: "Test",
                className: "Test Class",
                dueDate: "Test Due Date",
              })
            }
          >
            <span className="pe-1">
              <FontAwesomeIcon icon={faPlus} />
            </span>{" "}
            Create New Assignment
          </button>
        </div>
      </div>
      <CardContainer>{cards}</CardContainer>
    </div>
  );
}
