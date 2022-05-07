import React, { useState } from "react";
import ClassCard from "./ClassCard";
import CardContainer from "./CardContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DashboardModal from "./DashboardModal";

export default function DashboardClass() {
  const classData = [
    {
      id: 1,
      name: "Mrs. Teacher's 4th Period Class",
      description: "American History",
    },
    {
      id: 2,
      name: "Mrs. Teacher's 8th Period Class",
      description: "Chemistry",
    },
    { id: 3, name: "Mrs. Teacher's 9th Period Class", description: "English" },
  ];
  const [classes, setClasses] = useState(classData);
  const [modalOpen, setModalOpen] = useState(false);

  const addClass = (newClass: any) => {
    setClasses((curr) => [...curr, newClass]);
  };

  const cards = classes.map((item) => {
    return (
      <div className="col-md-4 col-12 p-2" key={item.name}>
        <ClassCard
          title={item.name}
          subtitle={item.description}
          value={item.id}
        />
      </div>
    );
  });

  const openModal = () => {
    if (!modalOpen) {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    if (modalOpen) {
      setModalOpen(false);
    }
  };

  return (
    <div>
      <div className="control-bar">
        <div className="buttons">
          <button className="btn btn-success button" onClick={openModal}>
            <span className="pe-1">
              <FontAwesomeIcon icon={faPlus} />
            </span>{" "}
            Create New Class
          </button>
        </div>
      </div>

      <CardContainer>{cards}</CardContainer>
      {modalOpen && (
        <DashboardModal close={closeModal} onSubmit={addClass}></DashboardModal>
      )}
    </div>
  );
}
