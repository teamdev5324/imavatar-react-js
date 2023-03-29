import {
  GET_ALL_PRODUCT,
  GET_CATEGORY,
  GET_CATEGORY_AND_SUBCATEGORY,
  GET_SUBCATEGORY,
  PRODUCT_INFO,
} from './actionTypes';

import { CatalogueActionTypes } from './types';

export const initialCounterState = {
  categoryData: [],
  subcategoryData: [],
  catAndSubcategory: {},
  getAllProduct: [],
  getAllProductInfo: {},
  error: null,
};

const catalogueReducer = (
  state = initialCounterState,
  action: CatalogueActionTypes
) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        categoryData: action.payload,
        error: null,
      };
    case GET_SUBCATEGORY:
      return {
        ...state,
        subcategoryData: action.payload,
        error: null,
      };
    case GET_CATEGORY_AND_SUBCATEGORY:
      return {
        ...state,
        catAndSubcategory: action.payload,
        error: null,
      };
    case GET_ALL_PRODUCT:
      return {
        ...state,
        getAllProduct: action.payload,
        error: null,
      };
    case PRODUCT_INFO:
      return {
        ...state,
        getAllProductInfo: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default catalogueReducer;
