import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstant';
import {
  APP_CONSTANTS,
  ROUTER_URL_CONSTANT,
} from '../../constants/routerUriConstants';
import { signinactionTypes } from '../../store/auth/signin';
import { SystemState } from '../../store/storeTypes';
import { errorMessage, warnMessage } from '../../utils/toast';
import { postReq } from '../apiCall';
import { setLocalItem, setSessionItem } from '../../utils/storage';
import { NavigateFunction } from 'react-router-dom';

export const signinPartner =
  (
    params: any,
    signinType: boolean,
    navigate: NavigateFunction
  ): ThunkAction<void, SystemState, unknown, AnyAction> =>
  async (dispatch) => {
    const url = API_URL_CONSTANTS.SIGNIN;
    dispatch({
      type: signinactionTypes.SIGNIN_ACTION,
    });

    postReq(url, params)
      .then((response: any) => {
        if (response.data.statusCode === '200') {
          if (signinType) {
            setLocalItem(APP_CONSTANTS.auth_token, response.data.data);
          } else {
            setSessionItem(APP_CONSTANTS.auth_token, response.data.data);
          }
          dispatch({
            type: signinactionTypes.SINGIN_SUCCESS_ACTION,
            payload: response.data.data,
          });
          navigate(
            `/${ROUTER_URL_CONSTANT.PROFILE}/${ROUTER_URL_CONSTANT.PROFILE_DETAILS}`
          );
        } else {
          dispatch({
            type: signinactionTypes.SINGIN_FAILURE_ACTION,
            payload: response.data.statusMessage,
          });
          warnMessage(response.data.statusMessage);
        }
      })
      .catch((error: any) => {
        dispatch({
          type: signinactionTypes.SINGIN_FAILURE_ACTION,
          data: error.statusMessage,
        });
        errorMessage(error.data.statusMessage);
      });
  };
