import React from 'react';

const ReportOrders = () => {
  return (
    <>
      <div className="deletes border-0 reporter1">
        <div className="deletes-left inventoring1">
          <div className="form-group row m-0">
            <label htmlFor="staticEmail" className="col-form-label">
              Select Report type:
            </label>
            <div className="">
              <select name="service" id="cars" className="form-control">
                <option value="">Select </option>
                <option value="">New Orders </option>
                <option value="">Ready to Ship </option>
                <option value="">In transit </option>
                <option value="">Delivered</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="deletes border-0 reporter2">
        <div className="deletes-left reporter3" style={{ flex: 1 }}>
          <div className="form-group row m-0">
            <label htmlFor="staticEmail" className="col-form-label">
              Filter by:
            </label>
            <div className="">
              <select name="service" id="cars" className="form-control">
                <option value="">Select Duration </option>
                <option value="">Most Recent </option>
                <option value="">Last Week </option>
                <option value="">Last Month</option>
                <option value="">Last Year</option>
              </select>
            </div>
            <input
              type="date"
              name=""
              className="form-control"
              placeholder="order date"
            />
            <input
              type="date"
              name=""
              className="form-control"
              placeholder="order date"
            />
            <input
              type="button"
              name=""
              className="inventedit2"
              value="Download"
            />
            <input
              type="button"
              name=""
              className="inventedit2"
              value="Reset"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportOrders;
