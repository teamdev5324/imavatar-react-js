import {
  SIGNIN_ACTION,
  SINGIN_FAILURE_ACTION,
  SINGIN_SUCCESS_ACTION,
} from './actionTypes';
import { signinActionTypes } from './types';

export const initialSigninState = {
  loader: false,
  error: null,
  token: null,
  is_signin: false,
};

const signinReducer = (
  state = initialSigninState,
  action: signinActionTypes
) => {
  switch (action.type) {
    case SIGNIN_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SINGIN_SUCCESS_ACTION:
      return {
        ...state,
        loader: false,
        token: action.payload,
        is_signin: true,
      };
    case SINGIN_FAILURE_ACTION:
      return {
        ...state,
        loader: false,
        error: action.payload,

        is_signin: false,
      };
    default:
      return state;
  }
};

export default signinReducer;
