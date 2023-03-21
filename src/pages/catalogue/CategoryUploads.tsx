import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { catalogueFds } from '../../constants/imageConstants';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';
import CatalougueWrapper from './CatalougueWrapper';

const CategoryUploads = () => {
  enum tabs {
    a = 'Single',
    b = 'Bulk',
    c = 'Bundle',
  }
  const [curTab, setCurTab] = useState(tabs.a);
  return (
    <CatalougueWrapper title="Catalog uploads">
      <div className="deletes border-0 frmset catloging">
        <label htmlFor="staticEmail" className="col-form-label">
          Create listing of products available on IMA portal
        </label>
        <form className="example" action="action_page.php">
          <input
            type="text"
            placeholder="Search by Gemstones, Rudraksha, Pooja Samagri"
            name="search"
            className="form-control"
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      <div className="deletes border-0">
        <div className="deletes-left">
          <label htmlFor="staticEmail" className="col-form-label">
            Sell products not listed on IMA portal
          </label>
          <div className="catlog-btn">
            <p>
              <Link to={`/${ROUTER_URL_CONSTANT.CATALOG_SELECT_CATEGORY}`}>
                {' '}
                Add Single Catalog{' '}
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </Link>{' '}
            </p>
            <p>
              <a href="" className="ml-3">
                {' '}
                Add Bulk Catalog{' '}
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </a>{' '}
            </p>
          </div>
        </div>
        <div className="deletes-right">
          <label htmlFor="staticEmail" className="col-form-label">
            Create bundled listing
          </label>
          <div className="catlog-btn">
            <p>
              <a href="">
                {' '}
                Create Bundled Kits{' '}
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </a>{' '}
            </p>
          </div>
        </div>
      </div>

      <h4 className="cathed"> Overview</h4>
      <div className="payment-block">
        <div className="payment-block-content">
          <h5>Total uploads done </h5>
          <h6>3</h6>
        </div>
        <div className="payment-block-content">
          <h5>Using Single uploads </h5>
          <h6>1 </h6>
        </div>
        <div className="payment-block-content">
          <h5>Using Bulk uploads </h5>
          <h6>1 </h6>
        </div>
        <div className="payment-block-content">
          <h5>Using Bundled Kits</h5>
          <h6>2 </h6>
        </div>
      </div>

      <div className="payment-success mt-5 mb-4">
        <div className="payment-success-content">
          <h6
            className={curTab === tabs.a ? 'active' : ''}
            onClick={() => setCurTab(tabs.a)}
          >
            Single uploads ( 1 ){' '}
          </h6>
        </div>
        <div className="payment-success-content">
          <h6
            className={curTab === tabs.b ? 'active' : ''}
            onClick={() => setCurTab(tabs.b)}
          >
            Bulk uploads ( 1 ){' '}
          </h6>
        </div>
        <div className="payment-success-content">
          <h6
            className={curTab === tabs.c ? 'active' : ''}
            onClick={() => setCurTab(tabs.c)}
          >
            Bundled kits listing ( 1 )
          </h6>
        </div>
      </div>

      <table className="table table-responsive table-striped table-hover table-bordered tbleorder">
        <tbody>
          <tr>
            <th>Sr. No. </th>
            <th>Image </th>
            <th>Category </th>
            <th>File ID </th>
            <th>Created Date & Time </th>
            <th>Products </th>
            <th>QC Status (↑) </th>
            <th>Actions </th>
          </tr>

          {new Array(5).fill('_').map((_, i) => {
            return (
              <tr>
                <td>{i + 1} </td>
                <td>
                  {' '}
                  {new Array(i < 5 ? i + 1 : 3).fill('_').map(() => (
                    <img src={catalogueFds} className="img-fluid" />
                  ))}
                </td>
                <td>Rudraksha </td>
                <td>1234 </td>
                <td>31 July 2022 | 4.30 PM </td>
                <td>1 </td>
                <td>In Progress </td>
                <td className="orgerns">Edit </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="paginator">
        <div className="paginator-left">
          <div className="form-group row m-0">
            <label htmlFor="staticEmail" className="col-form-label">
              Rows per page
            </label>
            <div className="col-sm-1">
              <select name="service" id="cars" className="form-control">
                <option value="">10</option>
                <option value="">9 </option>
                <option value="">8 </option>
                <option value="">7</option>
              </select>
            </div>
          </div>
        </div>
        <div className="paginator-right">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className=" " href="#">
                  <i className="fa fa-long-arrow-left"></i> Prev
                </a>
              </li>
              <li className="page-item">
                <a className="active " href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className=" " href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className=" " href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className=" " href="#">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className=" " href="#">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className=" " href="#">
                  6
                </a>
              </li>
              <li className="page-item">
                <a className=" " href="#">
                  {' '}
                  Next <i className="fa fa-long-arrow-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </CatalougueWrapper>
  );
};

export default CategoryUploads;
