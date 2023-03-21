import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {
  activeRatingIcon,
  desableRatingIcon,
  sortIcon,
} from '../../constants/imageConstants';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';

const ReviewsAndRatings = () => {
  enum tabs {
    a = 'A',
    b = 'B',
    n = 'N',
    ne = 'Ne',
  }
  const [tab, setTab] = useState(tabs.a);

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
        <div className="reporter5">
          <p>
            <Link
              to={`/${ROUTER_URL_CONSTANT.REPORTS}/${ROUTER_URL_CONSTANT.REPORT_REVIEWS_RATINGS}`}
              className="active"
            >
              {' '}
              Order - wise
            </Link>
            <Link
              to={`/${ROUTER_URL_CONSTANT.REPORTS}/${ROUTER_URL_CONSTANT.REPORT_CATEGORY_WISE}`}
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
          <div className="form-group row m-0">
            <h2>
              <a
                href="#"
                className={tab === tabs.a ? 'active' : ''}
                onClick={() => setTab(tabs.a)}
              >
                All Ratings{' '}
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </a>
              <a
                href="#"
                className={tab === tabs.b ? 'active' : ''}
                onClick={() => setTab(tabs.b)}
              >
                Positive{' '}
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </a>
              <a
                href="#"
                className={tab === tabs.n ? 'active' : ''}
                onClick={() => setTab(tabs.n)}
              >
                Neutral <i className="fa fa-info-circle" aria-hidden="true"></i>
              </a>
              <a
                href="#"
                className={tab === tabs.ne ? 'active' : ''}
                onClick={() => setTab(tabs.ne)}
              >
                Negative{' '}
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </a>
            </h2>
          </div>
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
            <th>Sr. No.</th>
            <th>
              Order Date
              <img src={sortIcon} className="img-fluid" />
            </th>
            <th>
              Order ID
              <img src={sortIcon} className="img-fluid" />
            </th>
            <th>Category</th>
            <th>Product Title</th>
            <th>Ratings</th>
            <th>Reviews</th>
          </tr>

          {new Array(5).fill('_').map((d, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>19-09-2022</td>
                <td>10001</td>
                <td>Yantras</td>
                <td>Evil eye locket</td>
                <td className="ratestar">
                  {new Array(i).fill('_').map((d) => (
                    <img src={activeRatingIcon} className="img-fluid" />
                  ))}
                  {i < 5 &&
                    new Array(5 - i)
                      .fill('_')
                      .map((d) => (
                        <img src={desableRatingIcon} className="img-fluid" />
                      ))}
                </td>
                <td>Quality of locket is ordinary</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ReviewsAndRatings;
