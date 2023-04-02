import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CatalogueTextInputField from '../../components/catalogueInputField';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Variations = () => {
  const navigate = useNavigate();
  const productVistalInfo = Yup.object().shape({
    size: Yup.string()
      .required('Size is required')
      .matches(/^[A-Za-z\s]+$/, 'Enter valid size name'),
    materialType: Yup.string()
      .required('MaterailType is required')
      .matches(/^[A-Za-z\s]+$/, 'Enter valid materialType'),
    color: Yup.string().required('Colour is required'),
    shape: Yup.string().required('Shape is required'),
    length: Yup.string().required('Length is required'),
    width: Yup.string().required('Width is required'),
    height: Yup.string().required('Height is required'),
    unitQuantity: Yup.string().required('Height name is required'),
  });

  const initialValues ={
    size: '',
    materialType: '',
    color: '',
    shape: '',
    length: '',
    width: '',
    height: '',
    unitQuantity: '',
  }

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
  } = useFormik({
    // enableReinitialize: true,
    initialValues,
    validationSchema: productVistalInfo,
    onSubmit: async (values) => {
      let cat = localStorage.getItem('cat');
      cat = JSON.parse(cat);

      const preparData = JSON.stringify({
        category: "cat1", // cat?.cat
        subCategory: "sub11", // cat?.subCat
        pid:85,
        variation: {
          color: values.color,
          height: values.height,
          length: values.length,
          materialType: values.materialType,
          shape: values.shape,
          size: values.size,
          unitQuantity: values.unitQuantity,
          width: values.width
        }
      });

        let saveDataConfig ={
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://18.234.206.45:8085/api/v1/partner/product/singleUpload/save',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          data: preparData
        }


        let responseData = await axios.request(saveDataConfig);
        responseData.data.results.category = responseData.data.results.categoryName;
        responseData.data.results.subCategory = responseData.data.results.subcategoryName
        console.log("responseData",responseData.data.results);

      // const savePreparData = JSON.stringify({
      //   category: "cat1",  // cat.cat
      //   subCategory: "sub11",  // cat.subCat
      //   pid:85,
      //   variation: {
      //     color: values.color,
      //     height: values.height,
      //     length: values.length,
      //     materialType: values.materialType,
      //     shape: values.shape,
      //     size: values.size,
      //     unitQuantity: values.unitQuantity,
      //     width: values.width
      //   }
      // });


      let submitDataConfig ={
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://18.234.206.45:8085/api/v1/partner/product/singleUpload/submit',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: responseData.data.results
      }

      const submitDataResponse = await axios.request(submitDataConfig);
      if(submitDataResponse.data.status == "SUCCESS"){
        navigate('/catelogs')
      }else{
        console.log("something_went_wrong");
      }
    },
  });

  const [pid,setPid] = useState(null);

  const autoFill = async() =>{
    const pid = localStorage.getItem("pid");
    console.log(pid);

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://18.234.206.45:8085/api/v1/partner/product/qc/product/' + pid,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    };


    let res = await axios(config);
    console.log("res",res.data.results.productVariation);
    const productVariationData = res.data.results.productVariation;

    const keys = Object.keys(initialValues);
    
    keys.forEach((item,index) =>{
      setFieldValue(item, productVariationData[keys[index]]);
    });

    setFieldValue('height',productVariationData.heightOfProduct);
    setFieldValue('length',productVariationData.lengthOfProduct);
    setFieldValue('width',productVariationData.widthOfProduct);
  }

  useEffect(()=>{
    const _pid = localStorage.getItem('pid');
    console.log("pId",pid);
    setPid(_pid);
  },[])

  useEffect(() => {
    if (localStorage.getItem("pid")) {
      autoFill();
    }
  }, []);

  const saveHandler = async(submitFlag) =>{
    let cat = localStorage.getItem('cat');

    const preparData = JSON.stringify({
      category: "cat1", // cat?.cat
      subCategory: "sub11", // cat?.subCat
      pid:85,
      variation: {
        color: values.color,
        height: values.height,
        length: values.length,
        materialType: values.materialType,
        shape: values.shape,
        size: values.size,
        unitQuantity: values.unitQuantity,
        width: values.width
      }
    });
    let config ={
      method: 'post',
        maxBodyLength: Infinity,
        url: 'http://18.234.206.45:8085/api/v1/partner/product/singleUpload/save',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: preparData
    }

    const responseData = await axios.request(config);
    
    if(responseData.data.status == "SUCCESS"){
      navigate('/catproduct/pricing');
    }else{
      console.log("something_went_wrong");
    }
    
  }
  return (
    <div className="cater_forms pb-5 product-info_">
      <form>
        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Size <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.size}
              onChange={handleChange('size')}
              onBlur={handleBlur('size')}
              error={touched.size ? errors.size : ''}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Material Type <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.materialType}
              onChange={handleChange('materialType')}
              onBlur={handleBlur('materialType')}
              error={touched.materialType ? errors.materialType : ''}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Colour <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.color}
              onChange={handleChange('color')}
              error={touched.color ? errors.color : ''}
              onBlur={handleBlur('color')}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-9 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Dimensions <span> * </span>
            </label>
            <div className="col-md-3">
              <label htmlFor="staticEmail" className="col-form-label">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                Length <span> * </span>
              </label>
              <CatalogueTextInputField
                value={values.length}
                onChange={handleChange('length')}
                error={touched.length ? errors.length : ''}
                onBlur={handleBlur('length')}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="staticEmail" className="col-form-label">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                Width <span> * </span>
              </label>
              <CatalogueTextInputField
                value={values.width}
                onChange={handleChange('width')}
                error={touched.width ? errors.width : ''}
                onBlur={handleBlur('width')}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="staticEmail" className="col-form-label">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                height <span> * </span>
              </label>
              <CatalogueTextInputField
                value={values.height}
                onChange={handleChange('height')}
                error={touched.height ? errors.height : ''}
                onBlur={handleBlur('height')}
              />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Shape <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.shape}
              onChange={handleChange('shape')}
              error={touched.shape ? errors.shape : ''}
              onBlur={handleBlur('shape')}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Unity Quanitiy <span> * </span>
            </label>
            <CatalogueTextInputField
              value={values.unitQuantity}
              onChange={handleChange('unitQuantity')}
              error={touched.unitQuantity ? errors.unitQuantity : ''}
              onBlur={handleBlur('unitQuantity')}
            />
          </div>
        </div>

        <div className="col-md-7 frmses fmsbtn">
          <input
            type="button"
            name=""
            className="edit"
            value="Save & Go Back"
            style={{ width: 'fit-content' }}
            onClick={() => saveHandler()}
          />
          <input
            type="button"
            name=""
            className="edit"
            value="Save & Finish"
            style={{ width: 'fit-content' }}
            onClick={() => handleSubmit()}
          />
        </div>
      </form>
    </div>
  );
};

export default Variations;
