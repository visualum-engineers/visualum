import useBodyAreaResizable from "../../../hooks/use-body-area-resizable";
import { useRef, useMemo, RefObject } from "react";
import { useDispatch } from "react-redux";
import {
  updateActivityData,
  updateActivityDataLayout,
} from "../../../../redux/features/activityTypes/activitiesData";
import { debounce } from "lodash";

const ShortAnswerTextArea = ({ data, questionNum }: any) => {
  const dispatch = useDispatch();
  const historyStackUpdate = (newState: any, questionNum: any, dispatch: any) =>
    dispatch(
      updateActivityData({
        type: "singleQuestionUpdate",
        questionNum: questionNum,
        data: newState,
      })
    );
  const debounceHistoryUpdate = useMemo(
    () => debounce(historyStackUpdate, 1000),
    []
  );
  const handleInput = (e: any) => {
    const inputValue = e.target.closest("textarea").value;
    dispatch(
      updateActivityDataLayout({
        type: "singleQuestionUpdate",
        questionNum: questionNum,
        data: { ...data, clientAnswer: inputValue },
      })
    );
    //updateHistoryStack
    debounceHistoryUpdate(
      { ...data, clientAnswer: inputValue },
      questionNum,
      dispatch
    );
  };

  const textAreaRef = useRef() as RefObject <HTMLTextAreaElement>;
  const { posData: textAreaPos, handle: resizableHandle } =
    useBodyAreaResizable({
      nodeRef: textAreaRef,
      handleType: "S",
      handlePos: {
        south: true,
        north: false,
        east: false,
        west: false,
      },
    });

  const textAreaHeight = { height: textAreaPos ? textAreaPos.height : null };
  return (
    <>
      <div
        className="sa-activity-text-input form-floating w-100 d-flex flex-column"
        style={{
          position: "relative",
          zIndex: "1",
          height: textAreaPos ? "fit-content" : "",
        }}
      >
        <textarea
          ref={textAreaRef}
          className="form-control flex-grow-1"
          placeholder="Type your answer here"
          id="sa-activity-text"
          onChange={handleInput}
          value={data.clientAnswer}
          style={textAreaHeight}
        />
        <label htmlFor="sa-activity-text">Type your answer here</label>
        {resizableHandle}
      </div>
    </>
  );
};
export default ShortAnswerTextArea;
