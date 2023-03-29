import {
  GET_ALL_PRODUCT,
  GET_CATEGORY,
  GET_CATEGORY_AND_SUBCATEGORY,
  GET_SUBCATEGORY,
  PRODUCT_INFO,
} from './actionTypes';

interface getCatalogueCategory {
  type: typeof GET_CATEGORY;
  payload: any;
}

interface getSubCatalogueCategory {
  type: typeof GET_SUBCATEGORY;
  payload: any;
}
interface getCatAndSubcategory {
  type: typeof GET_CATEGORY_AND_SUBCATEGORY;
  payload: any;
}
interface getAllProduct {
  type: typeof GET_ALL_PRODUCT;
  payload: any;
}
interface getAllProductInfo {
  type: typeof PRODUCT_INFO;
  payload: any;
}

export type CatalogueActionTypes =
  | getCatalogueCategory
  | getSubCatalogueCategory
  | getCatAndSubcategory
  | getAllProduct
  | getAllProductInfo;
