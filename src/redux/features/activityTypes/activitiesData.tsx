import assignmentData from "../../../app/helpers/sampleAssignmentData";
import undoable, { excludeAction } from "redux-undo";
import {
  createSlice,
  combineReducers,
  //createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  getDataFromLocalStorage,
  throttledSaveToStorage,
  saveToLocalStorage,
} from "./activitySaveToLocal";
import {
  controlledInputsValidation,
  sortActivityValidation,
  matchActivityValidation,
  shortAnswerValidation,
  labelPicValidation,
} from "./activityValidationFunc/index";

const activityData = assignmentData;
const initialClientAnswerData = getDataFromLocalStorage(activityData);

const loadInitialTracking = (data: any) => {
  if (!data.trackCompletion) {
    const initialTrackingData: any = {
      completed: {},
      inProgress: {},
      neverOpened: {},
    };
    for (let i in data.questions) initialTrackingData.neverOpened[i] = true;

    //this only happens upon first load, so the first question is always in progress
    delete initialTrackingData.neverOpened[0];
    initialTrackingData.inProgress[0] = true;
    return initialTrackingData;
  }
  const trackCompletion = {
    completed: { ...data.trackCompletion.completed },
    inProgress: { ...data.trackCompletion.inProgress },
    neverOpened: { ...data.trackCompletion.neverOpened },
  };
  return trackCompletion;
};

const singleQuestionUpdate = (state: any, action: any) => {
  const questionData =
    state.clientAnswerData.questions[action.payload.questionNum];
  const newQuestionData = {
    ...questionData,
    ...action.payload.data,
  };
  state.clientAnswerData.questions[action.payload.questionNum] =
    newQuestionData;
  return newQuestionData;
};
//activity slices.
const activitiesData = createSlice({
  name: "activitiesData",
  initialState: {
    activityData: activityData,
  },
  reducers: {},
});
//seperate because only client Answer Data will be undoable.
const clientAnswerData = createSlice({
  name: "clientAnswerActivitiesData",
  initialState: {
    clientAnswerData: initialClientAnswerData
      ? initialClientAnswerData
      : {
          ...activityData,
          trackCompletion: loadInitialTracking(activityData),
        },
  },
  reducers: {
    //this action is used to update data for the use
    // of reset, undo, and localStorage capabilities
    updateActivityData: (state, action) => {
      let newState;
      switch (action.payload.type) {
        case "singleQuestionUpdate":
          newState = singleQuestionUpdate(state, action);
          break;
        default:
          newState = { ...state.clientAnswerData };
          newState["lastQuestionSeen"] = action.payload.lastSeenQuestion;
          state.clientAnswerData = newState;
          break;
      }
      throttledSaveToStorage({
        state: state.clientAnswerData,
        payload: action.payload,
        newState: newState,
      });
    },
    //we created a seperate reducer, to exclude this
    //from undo, redo history.
    updateActivityDragActive: (state, action) => {
      singleQuestionUpdate(state, action);
      return;
    },
    updateActivityDataLayout: (state, action) => {
      const newState = singleQuestionUpdate(state, action);
      throttledSaveToStorage({
        state: state.clientAnswerData,
        payload: action.payload,
        newState: newState,
      });
    },
    updateActivityTimer: (state) => {
      if (!state.clientAnswerData.activityTimer) return;
      //if no timer do update this action
      const startTime = new Date();
      const timerDuration = state.clientAnswerData.activityTimer;
      const addHours = timerDuration.hours * 60 * 60 * 1000;
      const addMintues = timerDuration.minutes * 60 * 1000;
      const addSeconds = timerDuration.seconds * 1000;
      const endTime = new Date(
        startTime.getTime() + addHours + addMintues + addSeconds
      );
      const newState = {
        ...state.clientAnswerData,
        activityStartTime: startTime,
        activityEndTime: endTime,
      };
      state.clientAnswerData.activityStartTime =
        newState.activityStartTime.toString();
      state.clientAnswerData.activityEndTime =
        newState.activityEndTime.toString();

      //call the non-throttled function,
      //because this update must be immediate
      //to keep timer persisted
      saveToLocalStorage({
        state: state.clientAnswerData,
        payload: "updateTime",
        newState: newState,
      });
    },
    updateTrackCompletion: (state, action) => {
      const question = action.payload.question;
      const questionNum = action.payload.questionNum;
      const questionType = action.payload.question.type;
      let validation;
      const updateTrackCompletionKeys = (
        validation: any,
        trackCompletion: any
      ) => {
        if (!validation) {
          trackCompletion.completed[questionNum] = true;
          delete trackCompletion.inProgress[questionNum];
        } else {
          trackCompletion.inProgress[questionNum] = validation;
          delete trackCompletion.completed[questionNum];
        }
        delete trackCompletion.neverOpened[questionNum];
      };
      switch (questionType) {
        case "sort":
          validation = sortActivityValidation(question);
          updateTrackCompletionKeys(
            validation,
            state.clientAnswerData.trackCompletion
          );
          break;
        case "radio":
          validation = controlledInputsValidation(question);
          updateTrackCompletionKeys(
            validation,
            state.clientAnswerData.trackCompletion
          );

          break;
        case "checkbox":
          validation = controlledInputsValidation(question);
          updateTrackCompletionKeys(
            validation,
            state.clientAnswerData.trackCompletion
          );

          break;
        case "shortAnswer":
          validation = shortAnswerValidation(question);
          updateTrackCompletionKeys(
            validation,
            state.clientAnswerData.trackCompletion
          );
          break;
        case "labelPictures":
          validation = labelPicValidation(question);
          updateTrackCompletionKeys(
            validation,
            state.clientAnswerData.trackCompletion
          );
          break;
        case "matching":
          validation = matchActivityValidation(question);
          updateTrackCompletionKeys(
            validation,
            state.clientAnswerData.trackCompletion
          );
          break;
        default:
          console.log(questionType);
          break;
      }
    },
  },
});
export const {
  updateActivityData,
  updateActivityDragActive,
  updateActivityDataLayout,
  updateActivityTimer,
  updateTrackCompletion,
} = clientAnswerData.actions;

const undoableData = undoable(clientAnswerData.reducer, {
  undoType: "activities/data/undo",
  redoType: "activities/data/redo",
  filter: excludeAction([
    "clientAnswerActivitiesData/updateActivityDragActive",
    "clientAnswerActivitiesData/updateActivityDataLayout",
    "clientAnswerActivitiesData/updateActivityTimer",
    "clientAnswerActivitiesData/updateTrackCompletion",
    "activitiesSettingsSlice/enableSettings",
    "activitiesSettingsSlice/disableSettings",
    "activitiesSettingsSlice/changeTimeDuration",
  ]),
  limit: 60,
});
const rootReducer = combineReducers({
  originalData: activitiesData.reducer,
  clientData: undoableData,
});

export default rootReducer;
