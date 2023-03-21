import { SystemState } from '../../storeTypes';

export const getSignupstate = (state: SystemState) => {
  return state.signup;
};

export const getSignupLoaderState = (state: SystemState) => {
  return state.signup.loader;
};
