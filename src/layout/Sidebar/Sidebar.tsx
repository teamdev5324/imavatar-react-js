import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom';
import {
  bellIcon,
  catelogueIcon,
  dashboardIcon,
  inventoryIcon,
  orderIcon,
  paymentsIcon,
  profileIcon,
  profileImage,
  reportIcon,
  returnIcon,
  advertIcon,
  supportIcon,
  logoImage,
} from '../../constants/imageConstants';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';

const Sidebar = () => {
  return (
    <>
      <div className="clearfix"></div>
      <div className="mvtar">
        <div className="container-fluid">
          <div className="row">
            <div className="mvtar-tabs" style={{ padding: 0 }}>
              <nav className="col-md-2" style={{ background: 'white' }}>
                <div
                  className="nav nav-tabs nav-fill"
                  id="nav-tab"
                  style={{ boxShadow: 'none' }}
                >
                  <Link to="" className="avtirs">
                    Ambe Bhandar
                    <img src={profileImage} className="img-fluid" alt="icon" />
                  </Link>
                  <a
                    className="nav-item nav-link"
                    id="nav-home-tab"
                    data-toggle="tab"
                    href="#nav1"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    <img src={bellIcon} className="img-fluid" alt="icon" />
                    Notifications
                  </a>
                  <NavLink
                    className="nav-item nav-link "
                    id="nav-profile-tab"
                    to={`/dashboard`}
                  >
                    <img src={dashboardIcon} className="img-fluid" alt="icon" />
                    Dashboard
                  </NavLink>
                  <NavLink
                    className={(navData) => {
                      console.log(navData.isActive);

                      return `nav-item nav-link ${navData.isActive ? 'active' : ''
                        }`;
                    }}
                    id="nav-profile-tab"
                    to={`${ROUTER_URL_CONSTANT.PROFILE}/${ROUTER_URL_CONSTANT.PROFILE_DETAILS}`}
                  >
                    <img src={profileIcon} className="img-fluid" alt="icon" />
                    Profile
                  </NavLink>
                  <NavLink
                    className="nav-item nav-link"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    // href="#nav4"

                    to={`${ROUTER_URL_CONSTANT.ORDERS}/${ROUTER_URL_CONSTANT.NEW_ORDER}`}
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    <img src={orderIcon} className="img-fluid" alt="icon" />
                    Orders
                  </NavLink>
                  <NavLink
                    className="nav-item nav-link"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    to={`${ROUTER_URL_CONSTANT.RETURN}/${ROUTER_URL_CONSTANT.INITIATED}`}
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    <img src={returnIcon} className="img-fluid" alt="icon" />
                    Returns/RTO
                  </NavLink>
                  <NavLink
                    className={(navData) =>
                      `nav-item nav-link ${navData.isActive ? 'active' : ''}`
                    }
                    id="nav-home-tab"
                    to={`${ROUTER_URL_CONSTANT.INVENTORY}/${ROUTER_URL_CONSTANT.INVENTORY_ACTIVE}`}
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    <img src={inventoryIcon} className="img-fluid" />
                    Inventory
                  </NavLink>
                  <NavLink
                    className={(navData) =>
                      `nav-item nav-link ${navData.isActive ? 'active' : ''}`
                    }
                    id="nav-profile-tab"
                    data-toggle="tab"
                    to={ROUTER_URL_CONSTANT.PAYMENYS}
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    <img src={paymentsIcon} className="img-fluid" alt="icon" />
                    Payments
                  </NavLink>
                  <NavLink
                    className="nav-item nav-link"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    to={ROUTER_URL_CONSTANT.CATELOGS}
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    <img src={catelogueIcon} className="img-fluid" />
                    Catalogue Uploads
                  </NavLink>
                  <NavLink
                    className="nav-item nav-link"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    to={`${ROUTER_URL_CONSTANT.REPORTS}/${ROUTER_URL_CONSTANT.REPORT_ORDERS}`}
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    <img src={reportIcon} className="img-fluid" />
                    Reports
                  </NavLink>
                  <a
                    className="nav-item nav-link"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    href="#nav10"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    <img src={advertIcon} className="img-fluid" />
                    Advertising
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    href="#nav11"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    <img src={supportIcon} className="img-fluid" />
                    Support
                  </a>
                  <button className='edit' style={{ width: 170, marginLeft: 5, marginTop: 20, marginBottom: 10 }}
                    onClick={() => {
                      localStorage.clear();
                      sessionStorage.clear();
                      window.location.assign('/signin');
                    }}
                  >Log out</button>
                  <a href="" className="adlogo">
                    <img src={logoImage} className="img-fluid" />
                  </a>
                </div>
              </nav>
              {/* ADD CHILDREN HERE */}
              {/* {children} */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <div className="clearfix"></div>
      <div className="clearfix"></div>
      <div className="clearfix"></div>
      <div className="clearfix"></div>
    </>
  );
};

export default Sidebar;
