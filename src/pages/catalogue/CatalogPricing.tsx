import { useFormik } from 'formik';
import React from 'react';
import CatalogueTextInputField from '../../components/catalogueInputField';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { catalogueSelectors } from '../../store/catalogue';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { SystemState } from '../../store/storeTypes';
import { AnyAction } from 'redux';
import { submitProducts } from '../../services/catalogue/singleCatalouge';

const CatalogPricing = () => {
  const dispatch =
    useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();
  const catalogueState = useSelector(catalogueSelectors.getCatalogueState);

  const { getAllProductInfo } = catalogueState;

  console.log('catalogueState', getAllProductInfo);

  const productVistalInfo = Yup.object().shape({
    partnerSKUID: Yup.string()
      .required('Partner sku id is required')
      .matches(/^[A-Za-z\s]+$/, 'Enter valid product sku id'),
    yourSellingPrice: Yup.string()
      .required('Selling price is required')
      .matches(/^[0-9\b]+$/, 'Enter valid selling price'),
    onHandUnitCost: Yup.string()
      .required('On hand unit cost is required')
      .matches(/^[0-9\b]+$/, 'Enter valid unit cost'),
    maximumRetailPrice: Yup.string()
      .required('Maximum retial price is required')
      .matches(/^[0-9\b]+$/, 'Enter valid MRP'),
    HSNCode: Yup.string().required('HSN code is required'),
  });

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    // enableReinitialize: true,
    initialValues: {
      partnerSKUID: '',
      yourSellingPrice: '',
      onHandUnitCost: '',
      maximumRetailPrice: '',
      HSNCode: '',
    },
    validationSchema: productVistalInfo,
    onSubmit: (values) => {
      const prepareData = JSON.stringify({
        category: 'dsf',
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
        info: {},

        pricing: {
          hsncode: values.HSNCode,
          mrp: values.maximumRetailPrice,
          onHandUnitCost: values.onHandUnitCost,
          partnerSKUId: values.partnerSKUID,
          yourSellingPrice: values.yourSellingPrice,
        },

        subCategory: 'asd',
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
              Partner SKU ID <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.partnerSKUID}
              onChange={handleChange('partnerSKUID')}
              error={touched.partnerSKUID ? errors.partnerSKUID : ''}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Your Selling price <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.yourSellingPrice}
              onChange={handleChange('yourSellingPrice')}
              error={touched.yourSellingPrice ? errors.yourSellingPrice : ''}
            />
          </div>
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label orgerns">
              Show Price break-up
            </label>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              On hand unit cost <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.onHandUnitCost}
              onChange={handleChange('onHandUnitCost')}
              error={touched.onHandUnitCost ? errors.onHandUnitCost : ''}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Maximum Retail price <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.maximumRetailPrice}
              onChange={handleChange('maximumRetailPrice')}
              error={
                touched.maximumRetailPrice ? errors.maximumRetailPrice : ''
              }
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              HSN Code <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.HSNCode}
              onChange={handleChange('HSNCode')}
              error={touched.HSNCode ? errors.HSNCode : ''}
            />
          </div>
        </div>

        <div className="col-md-9 frmses cats_fmsbtn">
          <input
            type="button"
            name=""
            className="edit44"
            value="Save & Go Back"
            onClick={() => {
              handleSubmit();
            }}
          />
          <input
            type="button"
            name=""
            className="edit44"
            value="Save & Next"
            onClick={() => {
              handleSubmit();
            }}
          />
          <input type="button" name="" className="edit44" value="Cancel" />
        </div>
      </form>
    </div>
  );
};

export default CatalogPricing;
