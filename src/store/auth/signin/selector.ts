import { SystemState } from '../../storeTypes';

export const getSigninState = (state: SystemState) => {
  return state.signin;
};
