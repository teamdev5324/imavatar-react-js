import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { DECREASE_COUNTER } from "../../store/counter/actionTypes";
import { SystemState } from "../../store/storeTypes";

export const decreaseCounter =
  (): ThunkAction<void, SystemState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({
      type: DECREASE_COUNTER,
    });
  };
