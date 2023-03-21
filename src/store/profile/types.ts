import {
  GET_BUSINESS_INFO,
  GET_PROFILE,
  GET_PROFILE_FAILED,
  GET_USER_DATA,
  PROFILE_ACTION,
  SAVE_BANK_DETAILS,
  SAVE_BANK_DETAILS_FAILED,
  SAVE_BUSINESS_INFO,
  SAVE_BUSINESS_INFO_FAILED,
  SAVE_GSTIN_DETAILS,
  UPLOAD_BANK_DETAILS,
} from './actionTypes';

interface GetProfile {
  type: typeof GET_PROFILE;
  payload: any;
}

interface GetUserData {
  type: typeof GET_USER_DATA;
  payload: any;
}

interface GetProfileFailed {
  type: typeof GET_PROFILE_FAILED;
  payload: any;
}

interface SaveBusinessInfo {
  type: typeof SAVE_BUSINESS_INFO;
  payload: any;
}

interface ProfileAction {
  type: typeof PROFILE_ACTION;
}

interface GetBusinessInfo {
  type: typeof GET_BUSINESS_INFO;
  payload: any;
}

interface SaveBankDetails {
  type: typeof SAVE_BANK_DETAILS;
  payload: any;
}
interface SaveBankDetailsFailed {
  type: typeof SAVE_BANK_DETAILS_FAILED;
  payload: any;
}

interface SaveBusinessInfoFailed {
  type: typeof SAVE_BUSINESS_INFO_FAILED;
  payload: any;
}

interface UploadBankDetails {
  type: typeof UPLOAD_BANK_DETAILS;
  payload: any;
}

interface SaveGstinDetails {
  type: typeof SAVE_GSTIN_DETAILS;
  payload: any;
}

export type ProfileActionTypes =
  | GetProfile
  | GetUserData
  | GetProfileFailed
  | SaveBusinessInfo
  | GetBusinessInfo
  | ProfileAction
  | SaveBankDetails
  | SaveBankDetailsFailed
  | SaveBusinessInfoFailed
  | UploadBankDetails;
