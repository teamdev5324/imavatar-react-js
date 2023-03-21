import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstant';
import { SystemState } from '../../store/storeTypes';
import { postReq } from '../apiCall';
import { signupactionTypes } from '../../store/auth/signup';
import { errorMessage, successMessage, warnMessage } from '../../utils/toast';
import {
  APP_CONSTANTS,
  ROUTER_URL_CONSTANT,
} from '../../constants/routerUriConstants';
import { NavigateFunction } from 'react-router-dom';
import { getItem, setLocalItem, setSessionItem } from '../../utils/storage';

export const signupPartner =
  (
    params: any,
    navigate: NavigateFunction
  ): ThunkAction<void, SystemState, unknown, AnyAction> =>
  async (dispatch) => {
    // const navigate = useNavigate();
    const url = API_URL_CONSTANTS.SIGNUP;

    dispatch({
      type: signupactionTypes.SIGNUP_ACTION,
    });
    postReq(url, params)
      .then((response: any) => {
        // console.log(response.data);
        console.log(response.data);

        if (response.data.statusCode === '200') {
          dispatch({
            type: signupactionTypes.SIGNUP_SUCCESS_ACTION,
            payload: response.data.data,
          });
          successMessage('Account Created Success');

          const otpParams = {
            partnerType: 'admin',
            userName: params.phoneNumber,
            userType: '6',
          };

          setLocalItem(APP_CONSTANTS.USER, params.phoneNumber);
          setLocalItem(APP_CONSTANTS.OTP_SESSION, response.data.data.id);
          navigate(ROUTER_URL_CONSTANT.MOBILEOTP_VERIFY);
          dispatch(sendVerificationOtp(otpParams, navigate));
          // window.location.replace(ROUTER_URL_CONSTANT.SIGNIN);
        } else {
          console.log('Not Success');
          dispatch({
            type: signupactionTypes.SIGNUP_FAILURE_ACTION,
            payload: response.data.statusMessage,
          });
          const otpParams = {
            partnerType: 'admin',
            userName: params.phoneNumber,
            userType: '6',
          };
          setLocalItem(APP_CONSTANTS.USER, params.phoneNumber);
          warnMessage(response.data.statusMessage);
          // navigate(ROUTER_URL_CONSTANT.MOBILEOTP_VERIFY);
          dispatch(sendVerificationOtp(otpParams, navigate));
        }
      })
      .catch((error: any) => {
        dispatch({
          type: signupactionTypes.SIGNUP_FAILURE_ACTION,
          data: error.statusMessage,
        });
        errorMessage(error.data.statusMessage);
      });
  };

export const sendVerificationOtp =
  (
    params: any,
    navigate?: NavigateFunction
  ): ThunkAction<void, SystemState, unknown, AnyAction> =>
  async (dispatch) => {
    const otp = API_URL_CONSTANTS.SEND_OTP;

    postReq(otp, params)
      .then((response: any) => {
        if (response.data.status === 'SUCCESS') {
          if (navigate) {
            navigate(ROUTER_URL_CONSTANT.MOBILEOTP_VERIFY);
          }
        }
      })
      .catch((error: any) => {
        errorMessage('Something went wrong unable to send OTP');
      });
  };
