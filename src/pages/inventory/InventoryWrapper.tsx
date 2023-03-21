import React from "react"
import ActiveInventory from './ActiveInventory';
import { NavLink, Outlet } from 'react-router-dom';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';

const InventoryWrapper = () => {
  return  <div className="tab-content col-md-10 p-0" id="nav-tabContent">
    <div
    className="tab-pane fade show active"
    id="nav6"
    role="tabpanel"
    aria-labelledby="nav-profile-tab"
  >
    <div className="orng-head oddrflx">
      <p>Inventory</p>
      <p>
        <NavLink to={`${ROUTER_URL_CONSTANT.INVENTORY_ACTIVE}`}
        >Active (0)</NavLink>
        {/*<a href="" className="active">Active (0) </a>*/}
        <NavLink to={`${ROUTER_URL_CONSTANT.INVENTORY_PENDING}`}>Activation pending (0) </NavLink>
        <NavLink to={ROUTER_URL_CONSTANT.INVENTORY_INACTIVE}>Inactive (0) </NavLink>
        <NavLink to={ROUTER_URL_CONSTANT.INVENTORY_ONHOLD}>On-hold (0) </NavLink>
        <NavLink to={ROUTER_URL_CONSTANT.INVENTORY_BLOCKED}>Blocked (0) </NavLink>
      </p>
    </div>
    <div className="col-md-12 whtbox">
      <div className="panel-box">
        <Outlet />
      </div>
    </div>
  </div>
  </div>
}

export default  InventoryWrapper;