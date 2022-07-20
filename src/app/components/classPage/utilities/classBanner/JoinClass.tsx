import { ClassSchema } from "../../../../../types/ClassSchema";
import CopyTextInput from "../../../utilities/copyTextInput/CopyTextInput";

const JoinClass = ({ data }: { data: ClassSchema }) => {
  return (
    <div className="classroom-banner-join-class">
      <h3>Join Class</h3>
      <h6>Class Code:</h6>
      <CopyTextInput text={data.class_code.code} textType={"code"}/>
      <h6>Class Link:</h6>
      <CopyTextInput text={data.class_code.code} textType={"link"}/>
      <div></div>
    </div>
  );
};
export default JoinClass;
