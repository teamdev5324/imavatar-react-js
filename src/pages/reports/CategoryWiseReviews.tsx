import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import ReportsViewModel from '../../components/reports/ReportsViewModel';
import {
  activeRatingIcon,
  desableRatingIcon,
  sortIcon,
} from '../../constants/imageConstants';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';

const CategoryWiseReviews = () => {
  const [show, setShow] = useState(false);

  enum tabs {
    a = 'A',
    b = 'B',
    n = 'N',
    ne = 'Ne',
  }
  const [tab, setTab] = useState(tabs.a);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div className="deletes border-0 reporter4">
        <div className="deletes-left reporter3">
          <div className="form-group row m-0">
            <label htmlFor="staticEmail" className="col-form-label">
              Filter by:
            </label>
            <div className="">
              <select name="service" id="cars" className="form-control">
                <option value="">Select Duration</option>
                <option value="">Most Recent</option>
                <option value="">Last Week</option>
                <option value="">Last Month</option>
                <option value="">Last Year</option>
              </select>
            </div>
          </div>
        </div>
        <ReportsViewModel show={show} handleClose={handleClose} />
        <div className="reporter5">
          <p>
            <Link
              to={`/${ROUTER_URL_CONSTANT.REPORTS}/${ROUTER_URL_CONSTANT.REPORT_REVIEWS_RATINGS}`}
            >
              {' '}
              Order - wise
            </Link>
            <Link
              to={`/${ROUTER_URL_CONSTANT.REPORTS}/${ROUTER_URL_CONSTANT.REPORT_CATEGORY_WISE}`}
              className="active"
            >
              Category - wise
            </Link>
          </p>
        </div>
      </div>

      <div className="deletes border-0 reporter6">
        <div className="deletes-left reporter3">
          <div className="form-group row m-0">
            <input
              type="button"
              name=""
              className="inventedit2"
              value="Reset"
            />
          </div>
        </div>
      </div>
      <div className="deletes border-0 reporter4">
        <div className="deletes-left reporter3">
          <div className="form-group row m-0"></div>
        </div>
        <div className="reporter5">
          <input
            type="button"
            name=""
            className="inventedit2"
            value="Download"
          />
        </div>
      </div>

      <table className="table table-responsive table-striped table-hover table-bordered tbleorder">
        <tbody>
          <tr>
            <th>Sr. No. </th>
            <th>Category </th>
            <th>Product Title </th>
            <th> Average Ratings</th>
            <th>Count of Reviews or Ratings</th>
            <th> Action</th>
          </tr>

          {new Array(5).fill('_').map((d, i) => {
            return (
              <tr>
                <td> 1</td>
                <td>Yantras </td>
                <td> Evil locket</td>
                <td>3 </td>
                <td>40 </td>
                <td className="orgerns">
                  {' '}
                  <a href="#" onClick={() => setShow(true)}>
                    View all
                  </a>{' '}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CategoryWiseReviews;
