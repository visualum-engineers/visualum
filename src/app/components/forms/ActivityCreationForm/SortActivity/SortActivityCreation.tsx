import SortActivityCategory from "./SortActivityCreationCategory";
import SortDragOverlay from "./SortDragOverlay";
import useDnDKitDrag from "./use-dnd-kit-drag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  updateQuestionData,
  updateQuestionDataIgnore,
} from "../../../../../redux/features/activityCreation/activityCreationData";
import { DndContext, DragOverlay, defaultDropAnimation } from "@dnd-kit/core";
import { RootState } from "../../../../../redux/store";

const dropAnimation = {
  ...defaultDropAnimation,
  dragSourceOpacity: 0.5,
};
const SortActivityCreation = ({
  // smallWindowWidth,
  //mediumWindowWidth,
  currQuestion,
  //if true, data will be rendered for a preview
  preview,
}: any) => {
  const dispatch = useDispatch();
  const onAddCategory = () => {
    dispatch(
      updateQuestionData({
        questionType: "sort",
        questionNum: currQuestion,
        updateType: "add-category",
      })
    );
  };
  const onOverStateUpdate = (e: any) => {
    dispatch(
      updateQuestionDataIgnore({
        updateType: "update-sortable-lists",
        questionType: "sort",
        questionNum: currQuestion,
        newData: e,
      })
    );
  };
  const onDragEndStateUpdate = (e: any) => {
    if (!e) return;
    console.error(e);
    dispatch(
      updateQuestionData({
        updateType: "update-sortable-lists",
        questionType: "sort",
        questionNum: currQuestion,
        newData: e,
      })
    );
  };
  const {
    data,
    activeId,
    isOver,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragCancel,
    collisionAlgoWrapper,
    dragOverlayItem,
    sensors,
  } = useDnDKitDrag({
    reduxSelector: (state: RootState) =>
      state.activityCreation.data.saved.present.questions[
        parseInt(currQuestion)
      ],
    onOverStateUpdate: onOverStateUpdate,
    onDragEndStateUpdate: onDragEndStateUpdate,
  });
  return (
    <div className="sort-creation-question">
      <div className="sort-creation-overall-categories-container">
        <DndContext
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDragCancel={onDragCancel}
          collisionDetection={collisionAlgoWrapper}
          sensors={sensors}
        >
          {/* map over this*/}
          <div className="sort-creation-categories-row row gx-0">
            {data.categories.map((category: any, index: number) => {
              return (
                <SortActivityCategory
                  key={category.id}
                  id={category.id}
                  data={category}
                  preview={preview}
                  categoryIndex={index}
                  currQuestion={currQuestion}
                  isOver={isOver}
                />
              );
            })}
          </div>
          {/*Current element being dragged*/}
          <DragOverlay dropAnimation={dropAnimation}>
            {activeId ? (
              <SortDragOverlay
                ref={dragOverlayItem}
                activeId={activeId}
                draggableClassName={"sort-creation-category-item"}
                data={data}
                isDraggingClass={"is-dragging"}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
      {!preview && (
        <div className="sort-creation-question-add-category">
          <button
            className="add-category-btn"
            aria-label="add-new-category"
            onClick={onAddCategory}
            disabled={preview}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Add Category</span>
          </button>
        </div>
      )}
    </div>
  );
};
export default SortActivityCreation;
