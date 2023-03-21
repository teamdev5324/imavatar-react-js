import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';

const ReportsWrapper = () => {
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
            <NavLink to={ROUTER_URL_CONSTANT.REPORT_ORDERS}>Orders</NavLink>
            <NavLink to={ROUTER_URL_CONSTANT.REPORT_RETURNS}>Returns</NavLink>
            <NavLink to={ROUTER_URL_CONSTANT.REPORT_REVIEWS_RATINGS}>
              Reviews & Rating
            </NavLink>
          </p>
        </div>
        <div className="col-md-12 whtbox">
          <div className="panel-box h600">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsWrapper;
