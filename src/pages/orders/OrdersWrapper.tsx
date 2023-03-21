import React from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Paginator from '../../components/inventory/Paginator';
import { sortIcon } from '../../constants/imageConstants';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';

const OrdersWrapper = () => {
  return (
    <div className="tab-content col-md-10 p-0" id="nav-tabContent">
      <div
        className="tab-pane fade show active"
        id="nav4"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      >
        <div className="orng-head oddrflx">
          <p>Orders</p>
          <p>
            <NavLink to={ROUTER_URL_CONSTANT.NEW_ORDER}>New Orders</NavLink>
            <NavLink to={ROUTER_URL_CONSTANT.READY_TO_SHIP}>
              Ready to Ship
            </NavLink>
            <NavLink to={ROUTER_URL_CONSTANT.INTRANSIT}>In Transit</NavLink>
            <NavLink to={ROUTER_URL_CONSTANT.DELIVERED}>Delivered</NavLink>
            <NavLink to={ROUTER_URL_CONSTANT.CANCELLED}>Cancelled</NavLink>
          </p>
        </div>
        <div className="col-md-12 whtbox">
          <div className="panel-box">
            <div className="deletes border-0 frmset">
              <form className="example" action="action_page.php">
                <input
                  type="text"
                  placeholder="Search Order ID, IMA SKU ID, Partner SKU ID"
                  name="search"
                  className="form-control"
                />
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
            <div className="deletes border-0">
              <div className="deletes-left frmset">
                <input
                  type="date"
                  name=""
                  className="form-control"
                  value="order date"
                />
              </div>
              <div className="deletes-right">
                <h6>
                  <a href="">Clear all filter</a>{' '}
                </h6>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersWrapper;
