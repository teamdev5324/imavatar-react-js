import { NavigateFunction } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstant';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';
import { SystemState } from '../../store/storeTypes';
import { errorMessage, successMessage, warnMessage } from '../../utils/toast';
import { postReqParam } from '../apiCall';
import { getUserData } from './getUserData';

export const changePassword =
  (
    params: any,
    navigate: NavigateFunction
  ): ThunkAction<void, SystemState, unknown, AnyAction> =>
  async (dispatch) => {
    const url = API_URL_CONSTANTS.CHANGE_PASSWORD;
    postReqParam(url, params)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.status === 'SUCCESS') {
            successMessage('Password Changed Success');

            dispatch(getUserData());
            navigate(
              `/${ROUTER_URL_CONSTANT.PROFILE}/${ROUTER_URL_CONSTANT.POLICIES}`
            );
          } else {
            warnMessage(response.data.statusMessage);
          }
        }
      })
      .catch((error: any) => {
        errorMessage(error.response.data.errors[0].errorMessage);
      });
  };
