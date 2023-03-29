import { APP_CONSTANTS } from '../constants/routerUriConstants';
import { getItem } from '../utils/storage';

import axios from 'axios';
// eslint-disable-next-line no-console
console.log('HEADER TOKEN', getItem(APP_CONSTANTS.USER_SESSION)?.userToken);

export function getReq(url: string) {
  return axios.get(url);
}

export function getReqParam(url: string) {
  return axios.get(url);
}
export function getReqParamheader(url: string) {
  // const authHeader = {
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer ${getItem(APP_CONSTANTS.USER_SESSION)?.userToken}`,
  // };
  return axios({
    method: 'get',
    url,
    // headers: authHeader,
  });
}
export function getReqParamToken(url: string) {
  const authHeader = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getItem(APP_CONSTANTS.auth_token)}`,
  };

  return axios({
    method: 'get',
    url,
    headers: authHeader,
  });
}
export function postReq(url: string, args: any) {
  return axios({
    method: 'post',
    url,
    data: args,
  });
}
export function postReqParam(url: string, args: any) {
  return axios({
    method: 'post',
    url,
    data: args,
  });
}
export function putReqParamHeader(url: string, args: any) {
  const authHeader = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getItem(APP_CONSTANTS.auth_token)}`,
  };
  return axios({
    method: 'put',
    url,
    headers: authHeader,
    data: args,
  });
}
export function postReqParamheader(url: string, args: any) {
  const authHeader = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getItem(APP_CONSTANTS.auth_token)}`,
  };
  return axios({
    method: 'post',
    url,
    headers: authHeader,
    data: args,
  });
}
export function patchReqParam(url: string, args: any) {
  return axios({
    method: 'patch',
    url,
    data: args,
  });
}
export function deleteReqParam(url: string) {
  return axios.delete(url);
}

export function deleteReqParamheader(url: string) {
  // const authHeader = {
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer ${getItem(APP_CONSTANTS.USER_SESSION)?.userToken}`,
  // };
  return axios({
    method: 'delete',
    url,
    // headers: authHeader,
  });
}
