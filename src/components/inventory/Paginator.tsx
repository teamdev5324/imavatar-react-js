import React from 'react';

const Paginator = () => (
  <>
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
              <a className=" " href="inventory/activeInventory#">
                <i className="fa fa-long-arrow-left"></i> Prev
              </a>
            </li>
            <li className="page-item">
              <a className="active" href="inventory/activeInventory#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className=" " href="inventory/activeInventory#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className=" " href="inventory/activeInventory#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className=" " href="inventory/activeInventory#">
                4
              </a>
            </li>
            <li className="page-item">
              <a className=" " href="inventory/activeInventory#">
                5
              </a>
            </li>
            <li className="page-item">
              <a className=" " href="inventory/activeInventory#">
                6
              </a>
            </li>
            <li className="page-item">
              <a className=" " href="inventory/activeInventory#">
                Next <i className="fa fa-long-arrow-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </>
);

export default Paginator;
