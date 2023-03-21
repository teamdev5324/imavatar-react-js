import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SystemState } from '../../store/storeTypes';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstant';
import { putReqParamHeader } from '../apiCall';
import { profileActiontypes } from '../../store/profile';
import { errorMessage, successMessage } from '../../utils/toast';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';
import { NavigateFunction } from 'react-router-dom';

export const saveBusinessInfo = (
  params: any,
  navigate: NavigateFunction
): ThunkAction<void, SystemState, unknown, AnyAction> => {
  return async (dispatch) => {
    const url = API_URL_CONSTANTS.SAVEBUSINESS_INFO;

    putReqParamHeader(url, params)
      .then((response: any) => {
        successMessage('Personal Details Saved');
        dispatch({
          type: profileActiontypes.GET_PROFILE,
          payload: response.data.results,
        });
        navigate(
          `/${ROUTER_URL_CONSTANT.PROFILE}/${ROUTER_URL_CONSTANT.BANK_DETAILS}`
        );
      })
      .catch((error: any) => {
        errorMessage(error.response.data.errors[0].errorMessage);
      });
  };
};
