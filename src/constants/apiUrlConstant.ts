const UserService = process.env.REACT_APP_USER_SERVICE;
const PartnerService = process.env.REACT_APP_PARTNER_SERVICE;

export const API_URL_CONSTANTS = {
  SIGNUP: `${UserService}/user/noAuth/addUser`,
  SIGNIN: `${UserService}/user/noAuth/login`,
  USERDATA: `${UserService}/user/auth/getUserInfo`,
  PROFILEDATA: `${PartnerService}/partner/profile`,

  SEND_OTP: `${UserService}/user/noAuth/sendOTPForLogin`,

  VERIFY_MBILE: `${UserService}/user/userVerification/phone`,

  SAVEBUSINESS_INFO: `${PartnerService}/partner/profile/businessInfo`,
  SAVEBANKDETAILS_INFO: `${PartnerService}/partner/profile/bank`,
  UPLOADFILE: `${PartnerService}/files/upload`,

  SAVEGSTAIN_DETAILS: `${PartnerService}/partner/profile/gst`,

  GET_CATEGORY: `${PartnerService}/category`,

  GET_PRODUC_QC: `${PartnerService}/partner/product/`,

  SUBMIT_PRODUCT: `${PartnerService}/partner/product/singleUpload/save`,

  CHANGE_PASSWORD: `${UserService}/user/noAuth/userPwdChange`,

  ADD_USER: `${UserService}/user/noAuth/addPartnerUser`,

  WHATS_APP_INFO: `${PartnerService}/partner/profile/whatsappInfo`,
};

export const excelFileUrl =
  'https://imavatar-dev.s3.amazonaws.com/LDMS0007.xlsx';
