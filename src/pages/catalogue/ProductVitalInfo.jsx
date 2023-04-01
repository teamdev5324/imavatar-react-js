import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as Yup from 'yup';
import CatalogueTextInputField from '../../components/catalogueInputField';
import { submitProducts } from '../../services/catalogue/singleCatalouge';
import { catalogueSelectors } from '../../store/catalogue';
import { SystemState } from '../../store/storeTypes';
import axios from 'axios';

const ProductVitalInfo = () => {
  // const dispatch =
  // useDispatch < ThunkDispatch < SystemState, unknown, AnyAction>> ();
  // const catalogueState = useSelector(catalogueSelectors.getCatalogueState);

  // const { catAndSubcategory } = catalogueState;

  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(catalogueState, 'catalogueState');
  // }, []);

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
    unitOfMeasurementTwo: Yup.string().required(
      'Unit of measurement two is required'
    ),
    // unitOfMeasurementTwo: Yup.string().required(
    //   'Unit of measurement two is required'
    // ),
    productIdType: Yup.string().required('Product id type is required'),
  });

  const { handleChange, handleSubmit, values, errors, touched, handleBlur, setFieldValue } = useFormik({
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
      unitOfMeasurementTwo: '55',
    },
    validationSchema: productVistalInfo,
    onSubmit: async (values) => {
      let data_ = JSON.stringify({
        "fileName": certificate.fileName,
        "usecaseName": "certificateUpload",
        "fileContent": certificate.base64,
      });

      let config_ = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://18.234.206.45:8085/api/v1/files/upload',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: data_
      };

      let fileRes = await axios(config_);

      fileRes = fileRes.data.results.documentId;

      console.log(fileRes);

      const prepareData = {
        category: JSON.parse(localStorage.getItem('cat')).cat,
        subCategory: JSON.parse(localStorage.getItem('cat')).subCat,
        // pid: 2,
        // description: {
        //   briefDescription: 'string',
        //   formOfProduct: 'Solid',
        //   fragile: 'Yes',
        //   highLights: 'string',
        //   keyWords: 'string',
        //   otherInformation: 'string',
        //   packagingHeight: '1.99',
        //   packagingLength: '1.99',
        //   packagingWidth: '1.99',
        //   perisableExpirable: 'Yes',
        //   relatedDeities: 'string',
        //   relatedFaith: 'string',
        //   relatedFestival: 'string',
        //   replacementAvailable: 'Yes',
        //   returnAvailable: 'No',
        //   shelfLife: 'string',
        //   unitOfPackaging: 'cm',
        // },
        // images: {
        //   documentId1: 'DDMS0018',
        //   documentId2: null,
        //   documentId3: null,
        //   documentId4: null,
        // },
        info: {
          brandName: values.brandName,
          cirtificates: fileRes,
          color: values.Colour,
          countryOfOrigin: values.CountryOfOrigin,
          includedItem: values.IncludedItems,
          lenghtOfProduct: '1.99',
          heightOfProduct: 66,
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
          unitOfMeasurementWeight: 88,
          weightOfProduct: values.weightOfProduct,
          widthOfProduct: values.unitOfMeasurementTwo,
        },

        // pricing: {
        //   hsncode: '1234',
        //   mrp: '1.99',
        //   onHandUnitCost: '1.99',
        //   partnerSKUId: 'string',
        //   yourSellingPrice: '1.99',
        // },
        // variation: {
        //   color: 'string',
        //   height: '1.99',
        //   length: '1.99',
        //   materialType: 'string',
        //   shape: 'string',
        //   size: 'string',
        //   unitQuantity: '1.55',
        //   width: '1.99',
        // },
      };
      console.log(prepareData);
      // dispatch(submitProducts(prepareData));
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://18.234.206.45:8085/api/v1/partner/product/singleUpload/save',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: prepareData
      };

      axios.request(config)
        .then((res) => {
          res = res.data.results;
          console.log(res);
          localStorage.setItem('pid', res.id);
          navigate('/catproduct/pricing');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const [certificate, setCertificate] = useState(null);

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let res: any = null;
      reader.onload = function () {
        resolve(reader.result)
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    })
  };

  const uplodaCertificate = async () => {
    const file_ = document.createElement('input');
    file_.type = 'file';
    file_.accept = 'application/pdf';
    file_.onchange = async (file: any) => {
      file = file.target.files[0];
      console.log(file);
      const base: any = await getBase64(file);
      setCertificate({ fileName: file.name, base64: base.split('base64,')[1] });
    };
    file_.click();
  };

  useEffect(() => {
    if (certificate) {
      setFieldValue('Certificate', 'done');
    }
  }, [certificate]);

  return (
    <div className="cater_forms pb-5 product-info_">
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
              <option disabled>Select</option>
              <option>Generic</option>
              <option>GTIN</option>
              <option>ISBN</option>
              <option>UPC</option>
              <option>EAN</option>
            </select>
          </div>
          <div className='error'>{touched.productIdType ? errors.productIdType : null}</div>
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
                <option disabled>Select</option>
                <option>Available</option>
                <option>Out-off stock</option>
              </select>
            </div>
            <div className="error" style={{ paddingTop: 20, paddingLeft: '20%' }}>
              {touched.stockStatus ? errors.stockStatus : ''}
            </div>
          </div>
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
              <option disabled>Select</option>
              <option>gm</option>
              <option>kg</option>
              <option>kg</option>
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
              <option disabled>Select</option>
              <option>mm</option>
              <option>cm</option>
              <option>m</option>
              <option>ft</option>
              <option>in</option>
            </select>
          </div>
          <div className='error'>{touched.unitOfMeasurementOne ? errors.unitOfMeasurementOne : null}</div>
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
              <option disabled>Select</option>
              <option>mm</option>
              <option>cm</option>
              <option>m</option>
              <option>ft</option>
              <option>in</option>
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
              value={values.unitOfMeasurementTwo}
              onChange={handleChange('unitOfMeasurementTwo')}
              onBlur={handleBlur('unitOfMeasurementTwo')}
            >
              <option disabled>Select</option>
              <option>mm</option>
              <option>cm</option>
              <option>m</option>
              <option>ft</option>
              <option>in</option>
            </select>
          </div>
          <div className='error'>{touched.unitOfMeasurementTwo ? errors.unitOfMeasurementTwo : null}</div>
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
                value={null}
                onChange={handleChange('CountryOfOrigin')}
                onBlur={handleBlur('CountryOfOrigin')}
              >
                <option disabled>Select</option>
                <option>India</option>
                <option>Nepal</option>
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

        <div className="form-group row" onClick={uplodaCertificate}>
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Certificate <span> * </span>
            </label>
            <div className='form-control'>
              {certificate ? certificate.fileName : null}
            </div>
          </div>
          <div className='error'>
            {touched.Certificate ? errors.Certificate : null}
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
                <option disabled>Select</option>
                <option>Taxable</option>
                <option>Non-taxable</option>
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
              <label
                id="cars"
                className="form-control"
                htmlFor='clr-pcr'
                style={{ backgroundColor: values.Colour, display: 'flex', alignItems: 'center' }}
              >
                Select
              </label>
              <input
                type='color'
                onChange={handleChange('Colour')}
                onBlur={handleBlur('Colour')}
                style={{ display: 'none' }}
                id='clr-pcr'
                value={values.Colour}
              />
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
                <option disabled>Select</option>
                <option>Square</option>
                <option>Circle</option>
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
                <option disabled>Select</option>
                <option>Nothing</option>
                <option>Nothing</option>
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
