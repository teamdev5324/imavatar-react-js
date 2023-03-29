import { useFormik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as Yup from 'yup';
import CatalogueTextInputField from '../../components/catalogueInputField';
import { submitProducts } from '../../services/catalogue/singleCatalouge';
import { catalogueSelectors } from '../../store/catalogue';
import { SystemState } from '../../store/storeTypes';

const CatalogueDescription = () => {
  const dispatch =
    useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();
  const catalogueState = useSelector(catalogueSelectors.getCatalogueState);

  const { getAllProductInfo } = catalogueState;

  const productVistalInfo = Yup.object().shape({
    briefDesccription: Yup.string().required('Description is required'),
    hgighlights: Yup.string().required('Highlights are required'),
    keywords: Yup.string().required('Keywords are required'),
    relatedFaiths: Yup.string().required('Related faiths are required'),
    relatedFestival: Yup.string().required('Related festivals are required'),
    relatedDeities: Yup.string().required('Related deities are required'),
    otherInformation: Yup.string().required('Other information is required'),
    FormOfProduct: Yup.string().required('Form of product is required'),
    PerishableExpirable: Yup.string().required('Expirability is required'),
    shelfLife: Yup.string().required('Shelf life is required'),
    fragile: Yup.string().required('Fragile is required'),
    returnAvailable: Yup.string().required('Return availability is required'),
    exchangeAvailable: Yup.string().required(
      'Exchange availability is required'
    ),
    packagingDimensions: Yup.string().required(
      'Packaging dimensions are required'
    ),
    UnitofMeasurement: Yup.string().required('Unit of measurement is required'),
  });

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    // enableReinitialize: true,
    initialValues: {
      briefDesccription: '',
      hgighlights: '',
      keywords: '',
      relatedFaiths: '',
      relatedFestival: '',
      relatedDeities: '',
      otherInformation: '',
      FormOfProduct: '',
      PerishableExpirable: '',
      shelfLife: '',
      fragile: '',
      returnAvailable: '',
      exchangeAvailable: '',
      packagingDimensions: '',
      UnitofMeasurement: '',
    },
    validationSchema: productVistalInfo,
    onSubmit: (values) => {
      const prepareData = {
        category: 'cat1',
        pid: 2,
        description: {
          briefDescription: values.briefDesccription,
          formOfProduct: values.FormOfProduct,
          fragile: values.fragile,
          highLights: values.hgighlights,
          keyWords: values.keywords,
          otherInformation: values.otherInformation,
          packagingHeight: '1.99',
          packagingLength: '1.99',
          packagingWidth: values.packagingDimensions,
          perisableExpirable: values.PerishableExpirable,
          relatedDeities: values.relatedDeities,
          relatedFaith: values.relatedFaiths,
          relatedFestival: values.relatedFestival,
          replacementAvailable: values.exchangeAvailable,
          returnAvailable: values.returnAvailable,
          shelfLife: values.shelfLife,
          unitOfPackaging: values.UnitofMeasurement,
        },
        images: {
          documentId1: 'DDMS0018',
          documentId2: null,
          documentId3: null,
          documentId4: null,
        },
        info: {}, // you can take data from reducer   ,

        pricing: {
          hsncode: '1234',
          mrp: '1.99',
          onHandUnitCost: '1.99',
          partnerSKUId: 'string',
          yourSellingPrice: '1.99',
        },

        subCategory: 'sub11',
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
      };
      console.log(values, 'values');
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
              Brief Desccription <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.briefDesccription}
              onChange={handleChange('briefDesccription')}
              error={touched.briefDesccription ? errors.briefDesccription : ''}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Highlights <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.hgighlights}
              onChange={handleChange('hgighlights')}
              error={touched.hgighlights ? errors.hgighlights : ''}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Keywords <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.keywords}
              onChange={handleChange('keywords')}
              error={touched.keywords ? errors.keywords : ''}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Related faiths <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.relatedFaiths}
              onChange={handleChange('relatedFaiths')}
              error={touched.relatedFaiths ? errors.relatedFaiths : ''}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Related Festival <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.relatedFestival}
              onChange={handleChange('relatedFestival')}
              error={touched.relatedFestival ? errors.relatedFestival : ''}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Related Deities <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.relatedDeities}
              onChange={handleChange('relatedDeities')}
              error={touched.relatedDeities ? errors.relatedDeities : ''}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Other Information <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.otherInformation}
              onChange={handleChange('otherInformation')}
              error={touched.otherInformation ? errors.otherInformation : ''}
            />
          </div>
        </div>

        <div>
          <div className="form-group row">
            <div className="col-md-6 cts_frmses">
              <label htmlFor="staticEmail" className="col-form-label">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                Form of product <span> * </span>
              </label>
              <select
                name="service"
                id="cars"
                className="form-control"
                value={values.FormOfProduct}
                onChange={handleChange('FormOfProduct')}
              >
                <option value="1">Select</option>
                <option value="2">Most Recent</option>
                <option value="3">Last Week</option>
                <option value="4">Last Month</option>
                <option value="5">Last Year</option>
              </select>
            </div>
          </div>
          {touched.FormOfProduct ? (
            <div className="error" style={{ paddingTop: 20, paddingLeft: 220 }}>
              {errors.FormOfProduct}
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
                Perishable/Expirable <span> * </span>
              </label>
              <select
                name="service"
                id="cars"
                className="form-control"
                value={values.PerishableExpirable}
                onChange={handleChange('PerishableExpirable')}
              >
                <option value="1">Select</option>
                <option value="2">Most Recent</option>
                <option value="3">Last Week</option>
                <option value="4">Last Month</option>
                <option value="5">Last Year</option>
              </select>
            </div>
          </div>
          {touched.PerishableExpirable ? (
            <div className="error" style={{ paddingTop: 20, paddingLeft: 220 }}>
              {errors.PerishableExpirable}
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
                Shelf Life <span> * </span>
              </label>
              <select
                name="service"
                id="cars"
                className="form-control"
                value={values.shelfLife}
                onChange={handleChange('shelfLife')}
              >
                <option value="1">Select</option>
                <option value="2">Most Recent</option>
                <option value="3">Last Week</option>
                <option value="4">Last Month</option>
                <option value="5">Last Year</option>
              </select>
            </div>
          </div>
          {touched.shelfLife ? (
            <div className="error" style={{ paddingTop: 20, paddingLeft: 220 }}>
              {errors.shelfLife}
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
                Fragile <span> * </span>
              </label>
              <select
                name="service"
                id="cars"
                className="form-control"
                value={values.fragile}
                onChange={handleChange('fragile')}
              >
                <option value="1">Select</option>
                <option value="2">Most Recent</option>
                <option value="3">Last Week</option>
                <option value="4">Last Month</option>
                <option value="5">Last Year</option>
              </select>
            </div>
          </div>
          {touched.fragile ? (
            <div className="error" style={{ paddingTop: 20, paddingLeft: 220 }}>
              {errors.fragile}
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
                Return Available <span> * </span>
              </label>
              <select
                name="service"
                id="cars"
                className="form-control"
                value={values.returnAvailable}
                onChange={handleChange('returnAvailable')}
              >
                <option value="1">Select</option>
                <option value="2">Most Recent</option>
                <option value="3">Last Week</option>
                <option value="4">Last Month</option>
                <option value="5">Last Year</option>
              </select>
            </div>
          </div>
          {touched.returnAvailable ? (
            <div className="error" style={{ paddingTop: 20, paddingLeft: 220 }}>
              {errors.returnAvailable}
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
                Exchange Available <span> * </span>
              </label>
              <select
                name="service"
                id="cars"
                className="form-control"
                value={values.exchangeAvailable}
                onChange={handleChange('exchangeAvailable')}
              >
                <option value="1">Select</option>
                <option value="2">Most Recent</option>
                <option value="3">Last Week</option>
                <option value="4">Last Month</option>
                <option value="5">Last Year</option>
              </select>
            </div>
          </div>
          {touched.exchangeAvailable ? (
            <div className="error" style={{ paddingTop: 20, paddingLeft: 220 }}>
              {errors.exchangeAvailable}
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Packaging dimensions <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.packagingDimensions}
              onChange={handleChange('packagingDimensions')}
              error={
                touched.packagingDimensions ? errors.packagingDimensions : ''
              }
            />
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
              value={values.UnitofMeasurement}
              onChange={handleChange('UnitofMeasurement')}
            >
              <option value="1">Select</option>
              <option value="2">Most Recent</option>
              <option value="3">Last Week</option>
              <option value="4">Last Month</option>
              <option value="5">Last Year</option>
            </select>
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

export default CatalogueDescription;
