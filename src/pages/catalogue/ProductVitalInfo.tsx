import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as Yup from 'yup';
import CatalogueTextInputField from '../../components/catalogueInputField';
import { submitProducts } from '../../services/catalogue/singleCatalouge';
import { catalogueSelectors } from '../../store/catalogue';
import { SystemState } from '../../store/storeTypes';

const ProductVitalInfo = () => {
  const dispatch =
    useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();
  const catalogueState = useSelector(catalogueSelectors.getCatalogueState);

  const { catAndSubcategory }: any = catalogueState;

  const location = useLocation();

  useEffect(() => {
    console.log(catalogueState, 'catalogueState');
  }, []);

  const productVistalInfo = Yup.object().shape({
    productName: Yup.string()
      .required('Product name is required')
      .matches(/^[A-Za-z\s]+$/, 'Enter valid product name'),
    productTitle: Yup.string()
      .required('Product title is required')
      .matches(/^[A-Za-z\s]+$/, 'Enter valid product title'),
    productID: Yup.string().required('Product id is required'),
    brandName: Yup.string()
      .required('Brand name is required')
      .matches(/^[A-Za-z\s]+$/, 'Enter valid product id'),
    productType: Yup.string()
      .required('Product type is required')
      .matches(/^[A-Za-z\s]+$/, 'Enter valid product type'),
    stockStatus: Yup.string().required('Stock status is required'),
    weightOfProduct: Yup.string().required('Weight of product is required'),
    dimensionsOfProduct: Yup.string().required(
      'Dimensions of product is required'
    ),
    CountryOfOrigin: Yup.string().required('Country of origin is required'),
    IncludedItems: Yup.string()
      .required('Included items is required')
      .matches(/^[A-Za-z\s]+$/, 'Enter valid included items'),
    Certificate: Yup.string().required('Certificate is required'),
    onHandQuantity: Yup.string()
      .required('Quantity is required')
      .matches(/^[0-9\b]+$/, 'Enter valid quantity'),
    restockLevel: Yup.string()
      .required('Restock level is required')
      .matches(/^[A-Za-z\s]+$/, 'Enter valid restock level'),
    TaxClass: Yup.string().required('Tax class is required'),
    Colour: Yup.string().required('Colour is required'),
    shape: Yup.string().required('Shape is required'),
    materialType: Yup.string().required('Material type is required'),
    unitOfMeasurementOne: Yup.string().required(
      'Unit of measurement one is required'
    ),
    UnitOfMeasurementTwo: Yup.string().required(
      'Unit of measurement two is required'
    ),
    productIdType: Yup.string().required('Product id type is required'),
  });

  const { handleChange, handleSubmit, values, errors, touched, handleBlur } = useFormik({
    // enableReinitialize: true,
    initialValues: {
      productName: '',
      productTitle: '',
      productID: '',
      brandName: '',
      productType: '',
      productIdType: '',
      stockStatus: '',
      weightOfProduct: '',
      dimensionsOfProduct: '',
      CountryOfOrigin: '',
      IncludedItems: '',
      Certificate: '',
      onHandQuantity: '',
      restockLevel: '',
      TaxClass: '',
      Colour: '',
      shape: '',
      materialType: '',
      unitOfMeasurementOne: '',
      UnitOfMeasurementTwo: '',
    },
    validationSchema: productVistalInfo,
    onSubmit: (values) => {
      const prepareData = JSON.stringify({
        category: catAndSubcategory.category,
        // pid: 2,
        description: {
          briefDescription: 'string',
          formOfProduct: 'Solid',
          fragile: 'Yes',
          highLights: 'string',
          keyWords: 'string',
          otherInformation: 'string',
          packagingHeight: '1.99',
          packagingLength: '1.99',
          packagingWidth: '1.99',
          perisableExpirable: 'Yes',
          relatedDeities: 'string',
          relatedFaith: 'string',
          relatedFestival: 'string',
          replacementAvailable: 'Yes',
          returnAvailable: 'No',
          shelfLife: 'string',
          unitOfPackaging: 'cm',
        },
        images: {
          documentId1: 'DDMS0018',
          documentId2: null,
          documentId3: null,
          documentId4: null,
        },
        info: {
          brandName: values.brandName,
          cirtificates: values.Certificate,
          color: values.Colour,
          countryOfOrigin: values.CountryOfOrigin,
          includedItem: values.IncludedItems,
          lenghtOfProduct: '1.99',
          heightOfProduct: values.UnitOfMeasurementTwo,
          materialType: values.materialType,
          onHandQuantity: values.onHandQuantity,
          productId: values.productID,
          productIdType: values.productIdType,
          productName: values.productName,
          productTitle: values.productTitle,
          productType: values.productType,
          restockLevel: values.restockLevel,
          shape: values.shape,
          stockStatus: values.stockStatus,
          taxClass: values.TaxClass,
          unitOfMeasurementDimension: values.unitOfMeasurementOne,
          unitOfMeasurementWeight: values.UnitOfMeasurementTwo,
          weightOfProduct: values.weightOfProduct,
          widthOfProduct: values.unitOfMeasurementOne,
        },

        pricing: {
          hsncode: '1234',
          mrp: '1.99',
          onHandUnitCost: '1.99',
          partnerSKUId: 'string',
          yourSellingPrice: '1.99',
        },

        subCategory: catAndSubcategory.subCategory,
        variation: {
          color: 'string',
          height: '1.99',
          length: '1.99',
          materialType: 'string',
          shape: 'string',
          size: 'string',
          unitQuantity: '1.55',
          width: '1.99',
        },
      });
      console.log(prepareData, 'prepareData');
      dispatch(submitProducts(prepareData));
    },
  });

  return (
    <div className="cater_forms pb-5">
      <form>
        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Product Name <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.productName}
              onChange={handleChange('productName')}
              error={errors.productName ?? ''}
              onBlur={handleBlur('productName')}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Product Title * <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.productTitle}
              onChange={handleChange('productTitle')}
              onBlur={handleBlur('productTitle')}
              error={touched.productTitle ? errors.productTitle : ''}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Product ID <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.productID}
              onChange={handleChange('productID')}
              onBlur={handleBlur('productID')}
              error={touched.productID ? errors.productID : ''}
            />
          </div>
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Product ID Type <span> * </span>
            </label>
            <select
              name="service"
              id="cars"
              className="form-control"
              value={values.productIdType}
              onChange={handleChange('productIdType')}
              onBlur={handleBlur('productIdType')}
            >
              <option value="">Select</option>
              <option value="1">Most Recent</option>
              <option value="2">Last Week</option>
              <option value="3">Last Month</option>
              <option value="4">Last Year</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Brand Name <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.brandName}
              onChange={handleChange('brandName')}
              onBlur={handleBlur('brandName')}
              error={touched.brandName ? errors.brandName : ''}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Product Type <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.productType}
              onChange={handleChange('productType')}
              onBlur={handleBlur('productType')}
              error={touched.productType ? errors.productType : ''}
            />
          </div>
        </div>
        <div>
          <div className="form-group row">
            <div className="col-md-6 cts_frmses">
              <label htmlFor="staticEmail" className="col-form-label">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                Stock Status <span> * </span>
              </label>
              <select
                name="service"
                id="cars"
                className="form-control"
                value={values.stockStatus}
                onBlur={handleBlur('stockStatus')}

                onChange={handleChange('stockStatus')}
              >
                <option value="">Select</option>
                <option value="1">Most Recent</option>
                <option value="2">Last Week</option>
                <option value="3">Last Month</option>
                <option value="4">Last Year</option>
              </select>
            </div>
          </div>
          {touched.stockStatus ? (
            <div className="error" style={{ paddingTop: 20, paddingLeft: 220 }}>
              {errors.stockStatus}
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Weight of Product <span> * </span>
            </label>
            <select
              name="service"
              id="cars"
              className="form-control"
              value={values.weightOfProduct}
              onBlur={handleBlur('weightOfProduct')}
              onChange={handleChange('weightOfProduct')}
            >
              <option value="">Select</option>
              <option value="1">Most Recent</option>
              <option value="2">Last Week</option>
              <option value="3">Last Month</option>
              <option value="4">Last Year</option>
            </select>
          </div>
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Unit of Measurement (UOM) <span> * </span>
            </label>
            <select
              name="service"
              id="cars"
              className="form-control"
              value={values.unitOfMeasurementOne}
              onChange={handleChange('unitOfMeasurementOne')}
              onBlur={handleBlur('unitOfMeasurementOne')}
            >
              <option value="">Select</option>
              <option value="1">Most Recent</option>
              <option value="2">Last Week</option>
              <option value="3">Last Month</option>
              <option value="4">Last Year</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Dimensions of product <span> * </span>
            </label>
            <select
              name="service"
              id="cars"
              className="form-control"
              value={values.dimensionsOfProduct}
              onChange={handleChange('dimensionsOfProduct')}
              onBlur={handleBlur('dimensionsOfProduct')}
            >
              <option value="">Select</option>
              <option value="1">Most Recent</option>
              <option value="2">Last Week</option>
              <option value="3">Last Month</option>
              <option value="4">Last Year</option>
            </select>
          </div>
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Unit of Measurement (UOM) <span> * </span>
            </label>
            <select
              name="service"
              id="cars"
              className="form-control"
              value={values.UnitOfMeasurementTwo}
              onChange={handleChange('UnitOfMeasurementTwo')}
              onBlur={handleBlur('UnitOfMeasurementTwo')}
            >
              <option value="">Select</option>
              <option value="1">Most Recent</option>
              <option value="2">Last Week</option>
              <option value="3">Last Month</option>
              <option value="4">Last Year</option>
            </select>
          </div>
        </div>
        <div>
          <div className="form-group row">
            <div className="col-md-6 cts_frmses">
              <label htmlFor="staticEmail" className="col-form-label">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                Country of Origin <span> * </span>
              </label>
              <select
                name="service"
                id="cars"
                className="form-control"
                value={values.CountryOfOrigin}
                onChange={handleChange('CountryOfOrigin')}
                onBlur={handleBlur('CountryOfOrigin')}
              >
                <option value="">Select</option>
                <option value="1">Most Recent</option>
                <option value="2">Last Week</option>
                <option value="3">Last Month</option>
                <option value="4">Last Year</option>
              </select>
            </div>
          </div>
          {touched.CountryOfOrigin ? (
            <div className="error" style={{ paddingTop: 20, paddingLeft: 220 }}>
              {errors.CountryOfOrigin}
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Included Items <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.IncludedItems}
              onChange={handleChange('IncludedItems')}
              onBlur={handleBlur('IncludedItems')}
              error={touched.IncludedItems ? errors.IncludedItems : ''}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Certificate <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.Certificate}
              onChange={handleChange('Certificate')}
              onBlur={handleBlur('Certificate')}
              error={touched.Certificate ? errors.Certificate : ''}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              On hand Quantity <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.onHandQuantity}
              onChange={handleChange('onHandQuantity')}
              onBlur={handleBlur('onHandQuantity')}
              error={touched.onHandQuantity ? errors.onHandQuantity : ''}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Restock level <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.restockLevel}
              onChange={handleChange('restockLevel')}
              onBlur={handleBlur('restockLevel')}
              error={touched.restockLevel ? errors.restockLevel : ''}
            />
          </div>
        </div>

        <div>
          <div className="form-group row">
            <div className="col-md-6 cts_frmses">
              <label htmlFor="staticEmail" className="col-form-label">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                Tax class <span> * </span>
              </label>
              <select
                name="service"
                id="cars"
                className="form-control"
                value={values.TaxClass}
                onChange={handleChange('TaxClass')}
                onBlur={handleBlur('TaxClass')}
              >
                <option value="">Select</option>
                <option value="1">Most Recent</option>
                <option value="2">Last Week</option>
                <option value="3">Last Month</option>
                <option value="4">Last Year</option>
              </select>
            </div>
          </div>
          {touched.TaxClass ? (
            <div className="error" style={{ paddingTop: 20, paddingLeft: 220 }}>
              {errors.TaxClass}
            </div>
          ) : (
            ''
          )}
        </div>

        <div>
          <div className="form-group row">
            <div className="col-md-6 cts_frmses">
              <label htmlFor="staticEmail" className="col-form-label">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                Colour <span> * </span>
              </label>
              <select
                name="service"
                id="cars"
                className="form-control"
                value={values.Colour}
                onChange={handleChange('Colour')}
                onBlur={handleBlur('Colour')}

              >
                <option value="">Select</option>
                <option value="1">Most Recent</option>
                <option value="2">Last Week</option>
                <option value="3">Last Month</option>
                <option value="4">Last Year</option>
              </select>
            </div>
          </div>
          {touched.Colour ? (
            <div className="error" style={{ paddingTop: 20, paddingLeft: 220 }}>
              {errors.Colour}
            </div>
          ) : (
            ''
          )}
        </div>

        <div>
          <div className="form-group row">
            <div className="col-md-6 cts_frmses">
              <label htmlFor="staticEmail" className="col-form-label">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                Shape <span> * </span>
              </label>
              <select
                name="service"
                id="cars"
                className="form-control"
                value={values.shape}
                onChange={handleChange('shape')}
                onBlur={handleBlur('shape')}

              >
                <option value="">Select</option>
                <option value="1">Most Recent</option>
                <option value="2">Last Week</option>
                <option value="3">Last Month</option>
                <option value="4">Last Year</option>
              </select>
            </div>
          </div>
          {touched.shape ? (
            <div className="error" style={{ paddingTop: 20, paddingLeft: 220 }}>
              {errors.shape}
            </div>
          ) : (
            ''
          )}
        </div>

        <div>
          <div className="form-group row">
            <div className="col-md-6 cts_frmses">
              <label htmlFor="staticEmail" className="col-form-label">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                Material type <span> * </span>
              </label>
              <select
                name="service"
                id="cars"
                className="form-control"
                value={values.materialType}
                onChange={handleChange('materialType')}
                onBlur={handleBlur('materialType')}

              >
                <option value="">Select</option>
                <option value="1">Most Recent</option>
                <option value="2">Last Week</option>
                <option value="3">Last Month</option>
                <option value="4">Last Year</option>
              </select>
            </div>
          </div>
          {touched.materialType ? (
            <div className="error" style={{ paddingTop: 20, paddingLeft: 220 }}>
              {errors.materialType}
            </div>
          ) : (
            ''
          )}
        </div>

        <div>
          <input
            type="button"
            name=""
            className="edit44"
            value="Save & Next"
            onClick={() => {
              handleSubmit();
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default ProductVitalInfo;
