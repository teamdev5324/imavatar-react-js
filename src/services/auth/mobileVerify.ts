import { NavigateFunction } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstant';
import {
  APP_CONSTANTS,
  ROUTER_URL_CONSTANT,
} from '../../constants/routerUriConstants';
import { SystemState } from '../../store/storeTypes';
import { getItem } from '../../utils/storage';
import { errorMessage, successMessage, warnMessage } from '../../utils/toast';
import { getReq } from '../apiCall';

export const partnerMobileVerify =
  (
    params: any,
    navigate: NavigateFunction
  ): ThunkAction<void, SystemState, unknown, AnyAction> =>
  async (dispatch) => {
    const userId = getItem(APP_CONSTANTS.OTP_SESSION);
    const url = `${API_URL_CONSTANTS.VERIFY_MBILE}/${params}/${userId}`;

    getReq(url)
      .then((response: any) => {
        if (response.data.statusCode === '200') {
          successMessage('Mobile Number Verified Success');
          navigate(ROUTER_URL_CONSTANT.SIGNIN);
        } else {
          warnMessage(response.data.statusMessage);
        }
      })
      .catch((error: any) => {
        errorMessage(error.data.statusMessage);
      });
  };
