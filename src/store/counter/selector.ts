import { SystemState } from "../storeTypes";

export const getCounterstate = (state: SystemState) => {
  return state.counter.count;
};
