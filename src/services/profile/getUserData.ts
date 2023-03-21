import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstant';
import { profileActiontypes } from '../../store/profile';
import { SystemState } from '../../store/storeTypes';
import { errorMessage, warnMessage } from '../../utils/toast';
import { getReqParamToken, postReqParamheader } from '../apiCall';

export const getUserData =
  (): ThunkAction<void, SystemState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({
      type: profileActiontypes.PROFILE_ACTION,
    });
    const url = API_URL_CONSTANTS.USERDATA;
    postReqParamheader(url, {})
      .then((response: any) => {
        console.log(response.data);

        if (response.data.statusCode === '200') {
          dispatch({
            type: profileActiontypes.GET_USER_DATA,
            payload: response.data.data,
          });
          // successMessage('Profile fetched success');
        } else {
          dispatch({
            type: profileActiontypes.GET_PROFILE_FAILED,
            payload: response.data.statusMessage,
          });
          warnMessage(response.data.statusMessage);
        }
      })
      .catch((error: any) => {
        dispatch({
          type: profileActiontypes.GET_PROFILE_FAILED,
          payload: error.statusMessage,
        });
        errorMessage(error.data.statusMessage);
      });
  };

export const getProfileData =
  (): ThunkAction<void, SystemState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({
      type: profileActiontypes.PROFILE_ACTION,
    });
    const url = API_URL_CONSTANTS.PROFILEDATA;
    getReqParamToken(url)
      .then((response: any) => {
        dispatch({
          type: profileActiontypes.GET_PROFILE,
          payload: response.data.results,
        });
      })
      .catch((error: any) => {
        dispatch({
          type: profileActiontypes.GET_PROFILE_FAILED,
          data: 'Error To Fetch Profile',
        });
      });
  };
