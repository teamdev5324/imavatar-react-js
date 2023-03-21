import {
  SIGNIN_ACTION,
  SINGIN_FAILURE_ACTION,
  SINGIN_SUCCESS_ACTION,
} from './actionTypes';

interface SigninAction {
  type: typeof SIGNIN_ACTION;
}

interface SigninSuccessAction {
  type: typeof SINGIN_SUCCESS_ACTION;
  payload: any;
}

interface SigninFailureAction {
  type: typeof SINGIN_FAILURE_ACTION;
  payload: any;
}

export type signinActionTypes =
  | SigninAction
  | SigninSuccessAction
  | SigninFailureAction;
