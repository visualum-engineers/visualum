import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShortAnswerImage from "./ShortAnswerImage";
import ShortAnswerTextArea from "./ShortAnswerTextArea";
import ConditionalWrapper from "../../utilities/conditionalWrapper/ConditionalWrapper";
import { resetHistory } from "../activityHistoryFunc";
import { RootState } from "../../../../redux/store";
/*
    Frontend:
    1. Missing re-rendering logic, when user answers question and moves on to the next one.
        - Included here is also rendering animation
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/

const ShortAnswerApp = ({
  mediumWindowWidth,
  moreInfoOnClick,
  popUpBgStyles,
  originalQuestionData,
  questionNum,
}: any) => {
  //for updating redux store(data to be sent to backend)
  const data = useSelector(
    (state: RootState) =>
      state.activities.data.clientData.present.clientAnswerData.questions[
        questionNum
      ]
  );

  //redux states
  const dispatch = useDispatch();
  const resetPopUp = useSelector(
    (state: RootState) => state.activities.settings.resetPopUp
  );
  //reset answer
  useEffect(() => {
    if (resetPopUp && resetPopUp.confirmed) {
      //reset all state values to default
      resetHistory({
        dispatch,
        questionNum: questionNum,
        newState: originalQuestionData,
      });
    }
  }, [dispatch, resetPopUp, originalQuestionData, questionNum]);

  return (
    <>
      <div
        className={`sa-activity-container ${
          mediumWindowWidth ? "full-size" : "portrait-mode"
        }`}
      >
        <div
          className={
            `sa-activity-inner-container d-flex flex-grow-1` +
            `${
              !mediumWindowWidth || !data.imageURL
                ? " flex-column align-items-center "
                : ""
            } `
          }
        >
          <ConditionalWrapper
            condition={mediumWindowWidth && data.imageURL}
            wrapper={(children: string | JSX.Element) => (
              <div className="sa-activity-question-wrapper">{children}</div>
            )}
          >
            <h2
              className={`sa-activity-question${
                mediumWindowWidth && !data.imageURL ? " w-50" : ""
              }`}
            >
              {data.question}
            </h2>
            {data.imageURL && (
              <div className="d-flex justify-content-center w-100">
                <ShortAnswerImage data={data} popUpBgStyles={popUpBgStyles} />
              </div>
            )}
          </ConditionalWrapper>
          <div
            className={
              `sa-activity-input-container` +
              `${
                mediumWindowWidth && !data.imageURL
                  ? " w-50 m-0"
                  : !mediumWindowWidth
                  ? " portrait-size"
                  : ""
              }`
            }
          >
            <ShortAnswerTextArea data={data} questionNum={questionNum} />
          </div>
        </div>
      </div>
    </>
  );
};
export default ShortAnswerApp;
