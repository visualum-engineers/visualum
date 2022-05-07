import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { updateQuestionData } from "../../../../../redux/features/activityCreation/activityCreationData";
import MatchActivityKeyPairs from "./MatchActivityKeyPairs";
import { RootState } from "../../../../../redux/store";
const MatchActivityCreation = ({
  smallWindowWidth,
  mediumWindowWidth,
  //if true, data will be rendered for a preview
  preview,
  currQuestion,
}: any) => {
  const data = useSelector(
    (state: RootState) =>
      state.activityCreation.data.saved.present.questions[currQuestion]
  );
  const dispatch = useDispatch();
  const onAddNewPair = (e: any) => {
    dispatch(
      updateQuestionData({
        questionNum: currQuestion,
        questionType: "matching",
        updateType: "add-key-pair",
      })
    );
  };
  return (
    <div className="match-creation-activity-container">
      <div className="match-creation-key-pairs-container">
        <div className="match-creation-key-pair-headers col-11">
          <h2 className="col-6 col-sm-5 col-lg-4">Keys</h2>
          <h2 className="col-6 col-sm-5 col-lg-4">Answers</h2>
        </div>
        <div className="match-creation-key-pair-values">
          {data?.keyPairs?.map((pair, index) => {
            return (
              <MatchActivityKeyPairs
                index={index}
                currQuestion={currQuestion}
                smallWindowWidth={smallWindowWidth}
                key={pair.id}
                data={pair}
              />
            );
          })}
        </div>
      </div>
      <div className="match-creation-sticky-add-pair">
        <button onClick={onAddNewPair}>
          <FontAwesomeIcon icon={faPlus} />
          <span>Add New Pair</span>
        </button>
      </div>
    </div>
  );
};
export default MatchActivityCreation;
