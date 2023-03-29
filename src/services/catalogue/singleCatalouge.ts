import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstant';
import { catalogueActionTypes } from '../../store/catalogue';
import { GET_CATEGORY } from '../../store/catalogue/actionTypes';
import { SystemState } from '../../store/storeTypes';
import { errorMessage } from '../../utils/toast';
import { getReqParamToken, postReqParamheader } from '../apiCall';

export const getCatalogueCategory = (): ThunkAction<
  void,
  SystemState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    const url = API_URL_CONSTANTS.GET_CATEGORY;

    getReqParamToken(url)
      .then((response: any) => {
        dispatch({
          type: catalogueActionTypes.GET_CATEGORY,
          payload: response.data.results,
        });
      })
      .catch((error: any) => {
        console.log(error, 'error');
        // errorMessage(error.response.data.errors[0].errorMessage);
      });
  };
};

export const getCatalogueSubCategory = (
  state: string
): ThunkAction<void, SystemState, unknown, AnyAction> => {
  return async (dispatch) => {
    const url = `${API_URL_CONSTANTS.GET_CATEGORY}/${state}/subcategory`;

    console.log(url, 'url');

    getReqParamToken(url)
      .then((response: any) => {
        dispatch({
          type: catalogueActionTypes.GET_SUBCATEGORY,
          payload: response.data.results,
        });
      })
      .catch((error: any) => {
        console.log(error, 'response');
        // errorMessage(error.response.data.errors[0].errorMessage);
      });
  };
};

export const getAllCatalogueProduct = (): ThunkAction<
  void,
  SystemState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    const url = `${API_URL_CONSTANTS.GET_PRODUC_QC}qc`;

    console.log(url, 'url');

    getReqParamToken(url)
      .then((response: any) => {
        console.log(response, 'res');

        dispatch({
          type: catalogueActionTypes.GET_ALL_PRODUCT,
          payload: response.data.results,
        });
      })
      .catch((error: any) => {
        console.log(error, 'response');
        // errorMessage(error.response.data.errors[0].errorMessage);
      });
  };
};

export const submitProducts = (
  param: any
): ThunkAction<void, SystemState, unknown, AnyAction> => {
  return async (dispatch) => {
    const url = `${API_URL_CONSTANTS.SUBMIT_PRODUCT}`;

    console.log(url, 'url');

    postReqParamheader(url, param)
      .then((response: any) => {
        console.log(response, 'res');

        dispatch({
          type: catalogueActionTypes.PRODUCT_INFO,
          payload: response.data.results,
        });
      })
      .catch((error: any) => {
        console.log(error, 'response');

        errorMessage(error.response.data.errors[0].errorMessage);
      });
  };
};

export const catAndSubCategory = (payload: {}) => {
  return {
    type: catalogueActionTypes.GET_CATEGORY_AND_SUBCATEGORY,
    payload: payload,
  };
};
