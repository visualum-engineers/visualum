import { throttle } from "lodash";
export const saveToLocalStorage = ({ state, payload, newState }: any) => {
  try {
    let storedState;
    if (payload.type === "singleQuestionUpdate") {
      storedState = { ...state };
      storedState.questions[payload.questionNum] = newState;
    } else storedState = { ...state, ...newState };
    const serizalizedState = JSON.stringify(storedState);
    localStorage.setItem(storedState.activityID, serizalizedState);
  } catch {}
};
export const throttledSaveToStorage = throttle(
  (newState) => saveToLocalStorage(newState),
  2000
);

export const getDataFromLocalStorage = (data: any) => {
  try {
    const storage = localStorage.getItem(data.activityID);
    if (storage) return JSON.parse(storage);
    else return null;
  } catch {
    console.log("activity not previously stored");
    return;
  }
};
