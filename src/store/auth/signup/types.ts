import {
  SIGNUP_ACTION,
  SIGNUP_FAILURE_ACTION,
  SIGNUP_SUCCESS_ACTION,
} from './actionTypes';

interface SignupAction {
  type: typeof SIGNUP_ACTION;
}

interface SignupSuccessAction {
  type: typeof SIGNUP_SUCCESS_ACTION;
  payload: any;
}

interface SignupFailureAction {
  type: typeof SIGNUP_FAILURE_ACTION;
  payload: any;
}

export type signupActionTypes =
  | SignupAction
  | SignupSuccessAction
  | SignupFailureAction;
