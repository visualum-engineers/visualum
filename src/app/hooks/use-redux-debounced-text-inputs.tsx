/* similar to use-text-inputs
 * but this debounces updates to the redux store
 * Meant to make a history stack more accurate
 * Or for search queries
 * only local state and debounced func are exposed
 */
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";

const useReduxDebouncedTextInputs = ({
  reduxUpdateFunc,
  selectorFunc,
  inputType,
  charLimit,
  addedPayload,
}: any): [string, (e: any) => void] => {
  const reduxTextInput = useSelector(selectorFunc);
  const dispatch = useDispatch();
  const [localTextInput, setLocalTextInput] = useState<string>(
    typeof reduxTextInput === "string" ? reduxTextInput : ""
  );

  //ensure local state is updated when redux name changes
  useEffect(() => {
    setLocalTextInput(typeof reduxTextInput === "string" ? reduxTextInput : "");
  }, [reduxTextInput]);

  //updates redux text input
  const updateTextInput = (
    newInput: any,
    dispatch: any,
    reduxUpdateFunc: any
  ) => dispatch(reduxUpdateFunc(newInput));
  //we debounce redux update to prevent
  //expensive calls to local storage AND,
  //to maintain a more accurate history stack
  const debouncedUpdateTextInput = useMemo(
    () => debounce(updateTextInput, 1000),
    []
  );
  const onTextInputChange = (e: any) => {
    const target = e.target;
    const value = target.closest(inputType).value;
    if (charLimit && value.length > charLimit) return;
    setLocalTextInput(value);
    const reduxPayload = !addedPayload
      ? value
      : { ...addedPayload, value: value };
    debouncedUpdateTextInput(reduxPayload, dispatch, reduxUpdateFunc);
  };
  return [localTextInput, onTextInputChange];
};
export default useReduxDebouncedTextInputs;
