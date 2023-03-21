import { NavigateFunction } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstant';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';
import { profileActiontypes } from '../../store/profile';
import { SystemState } from '../../store/storeTypes';
import { errorMessage, successMessage } from '../../utils/toast';
import { putReqParamHeader } from '../apiCall';

export const saveGstinDetails =
  (
    params: any,
    navigate: NavigateFunction
  ): ThunkAction<void, SystemState, unknown, AnyAction> =>
  async (dispatch) => {
    const url = API_URL_CONSTANTS.SAVEGSTAIN_DETAILS;

    putReqParamHeader(url, params)
      .then((response) => {
        console.log(response.data);
        successMessage('GSTIN Details Saved');
        dispatch({
          type: profileActiontypes.GET_PROFILE,
          payload: response.data.results,
        });
        navigate(
          `/${ROUTER_URL_CONSTANT.PROFILE}/${ROUTER_URL_CONSTANT.MANAGE_USERS}`
        );
      })
      .catch((error: any) => {
        errorMessage(error.response.data.errors[0].errorMessage);
      });
  };
