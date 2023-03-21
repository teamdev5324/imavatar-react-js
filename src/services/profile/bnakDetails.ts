import { NavigateFunction } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstant';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';
import { profileActiontypes } from '../../store/profile';
import { PROFILE_ACTION } from '../../store/profile/actionTypes';
import { SystemState } from '../../store/storeTypes';
import { errorMessage, successMessage } from '../../utils/toast';
import { postReqParamheader, putReqParamHeader } from '../apiCall';

export const saveBankDetails =
  (
    params: any,
    navigate: NavigateFunction
  ): ThunkAction<void, SystemState, unknown, AnyAction> =>
  async (dispatch) => {
    const url = API_URL_CONSTANTS.SAVEBANKDETAILS_INFO;

    putReqParamHeader(url, params)
      .then((response: any) => {
        successMessage('Bank Details Saved');
        dispatch({
          type: profileActiontypes.GET_PROFILE,
          payload: response.data.results,
        });
        navigate(
          `/${ROUTER_URL_CONSTANT.PROFILE}/${ROUTER_URL_CONSTANT.GSTIN_DETAILS}`
        );
      })
      .catch((error: any) => {
        // dispatch({
        //   type: profileActiontypes.SAVE_BANK_DETAILS_FAILED,
        //   payload: error.response.data.errors[0].errorMessage,
        // });
        errorMessage(error.response.data.errors[0].errorMessage);
      });
  };

export const uploadFile =
  (
    params: any,
    bankParams: any,
    navigate: NavigateFunction
  ): ThunkAction<void, SystemState, unknown, AnyAction> =>
  async (dispatch) => {
    const url = API_URL_CONSTANTS.UPLOADFILE;
    console.log('Dispatch Actions');
    dispatch({
      type: PROFILE_ACTION,
    });

    postReqParamheader(url, params)
      .then((response: any) => {
        console.log(response.data.status === 'SUCCESS');
        dispatch({
          type: profileActiontypes.UPLOAD_BANK_DETAILS,
          payload: response.data,
        });

        if (response.data.status === 'SUCCESS') {
          bankParams.documentId = response.data.results.documentId;
          dispatch(saveBankDetails(bankParams, navigate));
        }
      })
      .catch((error: any) => {
        errorMessage(error.response.data.errors[0].errorMessage);
      });
  };
