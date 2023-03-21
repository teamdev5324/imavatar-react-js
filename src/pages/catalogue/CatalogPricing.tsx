import React from 'react';

const CatalogPricing = () => {
  return (
    <div className="cater_forms pb-5">
      <form>
        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Partner SKU ID <span> * </span>
            </label>
            <input type="text" className="form-control" name="" />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Your Selling price <span> * </span>
            </label>
            <input type="text" className="form-control" name="" />
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
            <input type="text" className="form-control" name="" />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              Maximum Retail price <span> * </span>
            </label>
            <input type="text" className="form-control" name="" />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 cts_frmses">
            <label htmlFor="staticEmail" className="col-form-label">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              HSN Code <span> * </span>
            </label>
            <input type="text" className="form-control" name="" />
          </div>
        </div>

        <div className="col-md-9 frmses cats_fmsbtn">
          <input
            type="button"
            name=""
            className="edit44"
            value="Save & Go Back"
          />
          <input type="button" name="" className="edit44" value="Save & Next" />
          <input type="button" name="" className="edit44" value="Cancel" />
        </div>
      </form>
    </div>
  );
};

export default CatalogPricing;
