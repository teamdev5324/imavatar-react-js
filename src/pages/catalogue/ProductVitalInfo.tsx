import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductVitalInfo = () => {
  const location = useLocation();
  console.log(location.pathname);

  if (location.pathname.includes('catproduct/info')) {
    console.log('Activate');
  }
  return (
    <div className="cater_forms pb-5">
      <form>
        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Product Name <span> * </span>
            </label>
            <input type="text" className="form-control" name="" />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Product Title * <span> * </span>
            </label>
            <input type="text" className="form-control" name="" />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Product ID <span> * </span>
            </label>
            <input type="text" className="form-control" name="" />
          </div>
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Product ID Type <span> * </span>
            </label>
            <select name="service" id="cars" className="form-control">
              <option value="">Select</option>
              <option value="">Most Recent</option>
              <option value="">Last Week</option>
              <option value="">Last Month</option>
              <option value="">Last Year</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Brand Name <span> * </span>
            </label>
            <input type="text" className="form-control" name="" />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Product Type <span> * </span>
            </label>
            <input type="text" className="form-control" name="" />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Stock Status <span> * </span>
            </label>
            <select name="service" id="cars" className="form-control">
              <option value="">Select</option>
              <option value="">Most Recent</option>
              <option value="">Last Week</option>
              <option value="">Last Month</option>
              <option value="">Last Year</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Weight of Product <span> * </span>
            </label>
            <select name="service" id="cars" className="form-control">
              <option value="">Select</option>
              <option value="">Most Recent</option>
              <option value="">Last Week</option>
              <option value="">Last Month</option>
              <option value="">Last Year</option>
            </select>
          </div>
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Unit of Measurement (UOM) <span> * </span>
            </label>
            <select name="service" id="cars" className="form-control">
              <option value="">Select</option>
              <option value="">Most Recent</option>
              <option value="">Last Week</option>
              <option value="">Last Month</option>
              <option value="">Last Year</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Dimensions of product <span> * </span>
            </label>
            <select name="service" id="cars" className="form-control">
              <option value="">Select</option>
              <option value="">Most Recent</option>
              <option value="">Last Week</option>
              <option value="">Last Month</option>
              <option value="">Last Year</option>
            </select>
          </div>
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Unit of Measurement (UOM) <span> * </span>
            </label>
            <select name="service" id="cars" className="form-control">
              <option value="">Select</option>
              <option value="">Most Recent</option>
              <option value="">Last Week</option>
              <option value="">Last Month</option>
              <option value="">Last Year</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Country of Origin <span> * </span>
            </label>
            <select name="service" id="cars" className="form-control">
              <option value="">Select</option>
              <option value="">Most Recent</option>
              <option value="">Last Week</option>
              <option value="">Last Month</option>
              <option value="">Last Year</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Included Items <span> * </span>
            </label>
            <input type="text" className="form-control" name="" />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Certificate <span> * </span>
            </label>
            <input type="text" className="form-control" name="" />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              On hand Quantity <span> * </span>
            </label>
            <input type="text" className="form-control" name="" />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Restock level <span> * </span>
            </label>
            <input type="text" className="form-control" name="" />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Tax class <span> * </span>
            </label>
            <select name="service" id="cars" className="form-control">
              <option value="">Select</option>
              <option value="">Most Recent</option>
              <option value="">Last Week</option>
              <option value="">Last Month</option>
              <option value="">Last Year</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Colour <span> * </span>
            </label>
            <select name="service" id="cars" className="form-control">
              <option value="">Select</option>
              <option value="">Most Recent</option>
              <option value="">Last Week</option>
              <option value="">Last Month</option>
              <option value="">Last Year</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Shape <span> * </span>
            </label>
            <select name="service" id="cars" className="form-control">
              <option value="">Select</option>
              <option value="">Most Recent</option>
              <option value="">Last Week</option>
              <option value="">Last Month</option>
              <option value="">Last Year</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Material type <span> * </span>
            </label>
            <select name="service" id="cars" className="form-control">
              <option value="">Select</option>
              <option value="">Most Recent</option>
              <option value="">Last Week</option>
              <option value="">Last Month</option>
              <option value="">Last Year</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductVitalInfo;
