import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { RootState } from "../../../../../redux/store";
const animatedComponents = makeAnimated();

const ActivityAssignClassInputs = ({ smallWindowWidth }: any) => {
  const currentUserClasses = useSelector((state: RootState) => state.userInfo.classes);
  const activityAssignClassInputs = useSelector(
    (state: RootState) => state.activityCreation.data.saved.present.assignedClasses
  );
  const options = currentUserClasses.map((teacherClass) => {
    return { value: teacherClass.id, label: teacherClass.content };
  });
  return (
    <div
      className={`activity-creation-assign-inputs ${
        smallWindowWidth ? "w-50" : "w-100"
      }`}
    >
      <div className="d-flex flex-column align-items-center justify-content-end w-100 h-100">
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          className={"select-input"}
          isSearchable={true}
          defaultValue={activityAssignClassInputs}
          options={options}
          isMulti={true}
          placeholder={"Class"}
          noOptionsMessage={({ inputValue: string }) => "No classes left"}
        />
      </div>
    </div>
  );
};
export default ActivityAssignClassInputs;
