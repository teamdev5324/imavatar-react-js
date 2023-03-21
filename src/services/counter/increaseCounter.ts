import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { INCREASE_COUNTER } from '../../store/counter/actionTypes';
import { SystemState } from '../../store/storeTypes';

export const increaseCounter =
  (): ThunkAction<void, SystemState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({
      type: INCREASE_COUNTER,
    });
  };
