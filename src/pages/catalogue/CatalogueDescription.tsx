import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as Yup from 'yup';
import CatalogueTextInputField from '../../components/catalogueInputField';
import { submitProducts } from '../../services/catalogue/singleCatalouge';
import { catalogueSelectors } from '../../store/catalogue';
import { SystemState } from '../../store/storeTypes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CatalogueDescription = () => {
  const dispatch =
    useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();
  const catalogueState = useSelector(catalogueSelectors.getCatalogueState);

  const { getAllProductInfo } = catalogueState;

  const navigate = useNavigate();

  const productVistalInfo = Yup.object().shape({
    briefDesccription: Yup.string().required('Description is required').matches(/^[A-Za-z0-9\s]+$/, 'Enter valid Description'),
    hgighlights: Yup.string().required('Highlights are required').matches(/^[A-Za-z0-9\s]+$/, 'Enter valid hightlights'),
    keywords: Yup.string().required('Keywords are required').matches(/^[A-Za-z0-9\s]+$/, 'Enter valid keywords'),
    relatedFaiths: Yup.string().required('Related faiths are required').matches(/^[A-Za-z\s]+$/, 'Enter valid related faiths'),
    relatedFestival: Yup.string().required('Related festivals are required').matches(/^[A-Za-z\s]+$/, 'Enter valid related festivals'),
    relatedDeities: Yup.string().required('Related deities are required').matches(/^[A-Za-z\s]+$/, 'Enter valid related deities'),
    otherInformation: Yup.string().required('Other information is required').matches(/^[A-Za-z0-9\s]+$/, 'Enter valid other information'),
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
    ).matches(/^[0-9\s]+$/, 'Enter valid packaging dimensions'),
    UnitofMeasurement: Yup.string().required('Unit of measurement is required'),
  });

  const [pid, setPid] = useState(null);

  useEffect(() => {
    const _pid: any = localStorage.getItem('pid');
    setPid(_pid);
  }, []);

  const { handleChange, handleSubmit, values, errors, touched, handleBlur } = useFormik({
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
      let cat: any = localStorage.getItem('cat');
      cat = JSON.parse(cat);
      const prepareData = {
        category: cat.cat,
        subCategory: cat.subCat,
        pid,
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
      };
      // console.log(values, 'values');
      // console.log(prepareData, 'prepareData');
      // dispatch(submitProducts(prepareData));

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://18.234.206.45:8085/api/v1/partner/product/singleUpload/submit',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: prepareData
      };

      axios.request(config)
        .then((res: any) => {
          res = res.data;
          if (res.status === 'SUCCESS') {
            navigate('/catproduct/images');
          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      {pid && (
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
                  onBlur={handleBlur('briefDesccription')}
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
                  onBlur={handleBlur('hgighlights')}
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
                  onBlur={handleBlur('keywords')}
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
                  onBlur={handleBlur('relatedFaiths')}
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
                  onBlur={handleBlur('relatedFestival')}
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
                  onBlur={handleBlur('relatedDeities')}
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
                  onBlur={handleBlur('otherInformation')}
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
                    onBlur={handleBlur('FormOfProduct')}
                  >
                    <option disabled>Select</option>
                    <option>Solid</option>
                    <option>Liquid</option>
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
                    onBlur={handleBlur('PerishableExpirable')}
                  >
                    <option disabled>Select</option>
                    <option>Yes</option>
                    <option>No</option>
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
                  <input
                    value={values.shelfLife}
                    onChange={handleChange('shelfLife')}
                    onBlur={handleBlur('shelfLife')}
                    type='text'
                    className="form-control"
                  />
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
                    onBlur={handleBlur('fragile')}
                  >
                    <option disabled>Select</option>
                    <option>Yes</option>
                    <option>No</option>
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
                    onBlur={handleBlur('returnAvailable')}
                  >
                    <option disabled>Select</option>
                    <option>Yes</option>
                    <option>No</option>
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
                    onBlur={handleBlur('exchangeAvailable')}
                  >
                    <option disabled>Select</option>
                    <option>Yes</option>
                    <option>No</option>
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
                  onBlur={handleBlur('packagingDimensions')}
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
                  onBlur={handleBlur('UnitofMeasurement')}
                >
                  <option disabled>Select</option>
                  <option>mm</option>
                  <option>cm</option>
                  <option>m</option>
                  <option>ft</option>
                  <option>in</option>
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
      )}
    </>
  );
};

export default CatalogueDescription;
