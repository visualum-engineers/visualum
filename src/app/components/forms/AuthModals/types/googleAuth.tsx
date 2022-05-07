
import { User } from "realm-web";
import { ErrorResponseData, SuccessResponseData } from "../../../../../types/generics/CustomHTTPTypes";
import { UserSignUpData } from "./UserAuthData";
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export default UserSignUpData;
interface GoogleSignUp {
  btnType: "signup";
  customData: UserSignUpData;
  customSuccessCallback: null | ((e: User) => void);
  customErrorFunc: (e: Error | ErrorResponseData) => void;
}
type GoogleLogin = Pick<
  GoogleSignUp,
  "customSuccessCallback" | "customErrorFunc"
> & { btnType: "signin"; customData: null };
interface GoogleCredientals {
  clientId: string;
  credential: string;
}

interface CustomMongoHTTPSError {
  data: ErrorResponseData,
  status: number
  headers: Object,
  config: Object,
  request: Object
}
type GoogleSignUpPostResponse = Optional<CustomMongoHTTPSError, "request"> | Exclude<keyof CustomMongoHTTPSError, "data"> & { data: SuccessResponseData }
export type {
  GoogleSignUp,
  GoogleLogin,
  GoogleCredientals,
  GoogleSignUpPostResponse,
  CustomMongoHTTPSError,
};