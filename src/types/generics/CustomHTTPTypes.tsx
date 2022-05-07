type ErrorResponseData = {
  error: true;
  message: string;
  metadata: Error;
};
type SuccessResponseData = { error: false; result: Object };

export type {ErrorResponseData, SuccessResponseData}