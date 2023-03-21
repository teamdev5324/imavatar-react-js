import React from 'react';
import { sortIcon } from '../../constants/imageConstants';

const ReturnCompleted = () => {
  return (
    <>
      <div className="deletes border-0 returner1">
        <form className="example" action="action_page.php">
          <input
            type="text"
            placeholder="Search Order ID, IMA SKU ID"
            name="search"
            className="form-control"
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      <div className="deletes border-0 pt-0">
        <div className="deletes-left reporter3">
          <div className="form-group row m-0 ratering">
            {/* <!-- <label for="staticEmail" className="col-form-label pr-2">Filter by:</label> --> */}
            <label htmlFor="staticEmail" className="col-form-label stdate4">
              Expected date of return:
            </label>
            <input
              type="date"
              name=""
              className="form-control"
              placeholder="order date"
            />
            <label htmlFor="staticEmail" className="col-form-label stdate4">
              Return created on:
            </label>
            <input
              type="date"
              name=""
              className="form-control"
              placeholder="order date"
            />

            <div className="">
              <select name="service" id="cars" className="form-control">
                <option value="">Type of return</option>
                <option value="">Most Recent</option>
                <option value="">Last Week</option>
                <option value="">Last Month</option>
                <option value="">Last Year</option>
                <option value="">Courier Return</option>
                <option value="">Customer Return</option>
              </select>
            </div>

            <input
              type="button"
              name=""
              className="inventedit2"
              value="Apply"
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

      <table className="table table-responsive table-striped table-hover table-bordered tbleorder">
        <tbody>
          <tr>
            <th>
              Order <span>ID </span>
              <img src={sortIcon} className="img-fluid" />
            </th>
            <th>
              IMA <span>SKU ID </span>
            </th>
            <th>
              Order <span> Date</span>
              <img src={sortIcon} className="img-fluid" />
            </th>
            <th>
              Product <span> Title</span>
            </th>
            <th>
              Order <span>Quantity </span>
            </th>
            <th>
              Order <span> amount</span>
              <img src={sortIcon} className="img-fluid" />
            </th>
            <th>
              Delivery <span>Date </span>
            </th>
            <th>
              Customer <span>Details </span>
            </th>
            <th>
              Return <span>Created on </span>
            </th>
            <th>
              Logistic <span>Partner </span>
            </th>
            <th>
              Type of <span>Return </span>
            </th>
            <th>
              Reason of <span>Return </span>
            </th>
            <th>
              Expected Date <span>of Return </span>
            </th>
          </tr>
          {new Array(10).fill('_').map((d) => {
            return (
              <tr>
                <td>0001</td>
                <td>Poo77890</td>
                <td>28-06-2022</td>
                <td>6 inch Metal Ganesha Idol</td>
                <td>2</td>
                <td>
                  <i className="fa fa-inr" aria-hidden="true"></i> 1200.00
                </td>
                <td>02-07-2022</td>
                <td>Prashant Thakare Mumbai</td>
                <td>02-07-2022</td>
                <td>Shiprocket</td>
                <td>Courier Return</td>
                <td>Customer unavailable</td>
                <td>04-07-2022</td>
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
                <option value="">9</option>
                <option value="">8</option>
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
                <a className="active" href="#">
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
                  Next <i className="fa fa-long-arrow-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ReturnCompleted;
