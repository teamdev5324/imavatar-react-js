import {
  SIGNUP_ACTION,
  SIGNUP_FAILURE_ACTION,
  SIGNUP_SUCCESS_ACTION,
} from './actionTypes';
import { signupActionTypes } from './types';

export const initialSignupState = {
  loader: false,
  error: null,
  data: null,
  is_signup: false,
};

const signupReducer = (
  state = initialSignupState,
  action: signupActionTypes
) => {
  switch (action.type) {
    case SIGNUP_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SIGNUP_SUCCESS_ACTION:
      return {
        ...state,
        loader: false,
        data: action.payload,
        is_signup: true,
      };
    case SIGNUP_FAILURE_ACTION:
      return {
        ...state,
        loader: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default signupReducer;
