import {
  GET_PROFILE,
  GET_PROFILE_FAILED,
  GET_USER_DATA,
  PROFILE_ACTION,
  SAVE_BANK_DETAILS,
  SAVE_BANK_DETAILS_FAILED,
  SAVE_BUSINESS_INFO,
  SAVE_BUSINESS_INFO_FAILED,
  UPLOAD_BANK_DETAILS,
} from './actionTypes';
import { ProfileActionTypes } from './types';

export const initialProfileState = {
  loader: false,
  error: null,
  user: {},
  bank: {},
  businessInfo: {},
  whatsappInfo: {},
  aggreements: [],
};

const profileReducer = (
  state = initialProfileState,
  action: ProfileActionTypes
) => {
  switch (action.type) {
    case PROFILE_ACTION:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload,
      };
    case GET_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SAVE_BUSINESS_INFO:
      return {
        ...state,
        loading: false,
      };
    case SAVE_BUSINESS_INFO_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //  ====== BANK ========
    case SAVE_BANK_DETAILS:
      return {
        ...state,
        loading: false,
      };
    case SAVE_BANK_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPLOAD_BANK_DETAILS:
      return {
        ...state,
        loading: false,
        file: action.payload,
      };

    // ======= GSTIN =========
    default:
      return state;
  }
};

export default profileReducer;
