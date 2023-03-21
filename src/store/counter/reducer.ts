import { DECREASE_COUNTER, INCREASE_COUNTER } from './actionTypes';

import { CounterActionTypes } from './types';

export const initialCounterState = {
  count: {
    number: 0,
    loader: false,
    error: null,
  },
};

const counterReducer = (
  state = initialCounterState,
  action: CounterActionTypes
) => {
  switch (action.type) {
    case INCREASE_COUNTER:
      return {
        ...state,
        count: {
          ...state.count,
          number: state.count.number + 1,
          loader: true,
          error: null,
        },
      };
    case DECREASE_COUNTER:
      return {
        ...state,
        count: {
          ...state.count,
          number:
            state.count.number > 0
              ? state.count.number - 1
              : state.count.number,
          loader: false,
        },
      };
    default:
      return state;
  }
};

export default counterReducer;
