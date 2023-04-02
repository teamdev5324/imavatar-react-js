import { Link } from 'react-router-dom';
import { NavLink, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';

const AddCatalogueProduct = () => {
  const location = useLocation();
  if (location.pathname.includes('catproduct/info')) {
    console.log('Activate');
  }
  return (
    <div className="tab-content col-md-10 p-0" id="nav-tabContent">
      <div
        className="tab-pane fade show active"
        id="nav4"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      >
        <div className="orng-head oddrflx">
          <p>Catalog uploads {`>`} Add single catalog</p>
          <p>
            <Link
              to={`/${ROUTER_URL_CONSTANT.CATALOGUE_PRODUCT}/${ROUTER_URL_CONSTANT.CATALOGUE_PRODUCT_INFO}`}
            >
              Select category
            </Link>

            <a href="#" className="active">
              Add Product Info
            </a>
          </p>
        </div>
        <div className="col-md-12 whtbox">
          <div className="panel-box ">
            <h4 className="cathed pt-4">Rudraksha {`>`} 9 Mukhi Rudraksha</h4>
            <div className="payment-success mt-2 mb-4">
              <div className="payment-success-content">
                <NavLink to={ROUTER_URL_CONSTANT.CATALOGUE_PRODUCT_INFO}>
                  <h6
                    className={
                      location.pathname.includes('catproduct/info')
                        ? 'active'
                        : ''
                    }
                  >
                    Product Vital Info
                  </h6>
                </NavLink>
              </div>
              <div className="payment-success-content">
                <NavLink to={ROUTER_URL_CONSTANT.CATALOGUE_PRICING}>
                  <h6
                    className={
                      location.pathname.includes('catproduct/pricing')
                        ? 'active'
                        : ''
                    }
                  >
                    Pricing
                  </h6>
                </NavLink>
              </div>
              <div className="payment-success-content">
                <NavLink to={ROUTER_URL_CONSTANT.CATALOGUE_DESCRIPTION}>
                  <h6
                    className={
                      location.pathname.includes('catproduct/description')
                        ? 'active'
                        : ''
                    }
                  >
                    Description
                  </h6>
                </NavLink>
              </div>
              <div className="payment-success-content">
                <NavLink to={ROUTER_URL_CONSTANT.CATALOGUE_IMAGES_VIDEOS}>
                  <h6
                    className={
                      location.pathname.includes('catproduct/images')
                        ? 'active'
                        : ''
                    }
                  >
                    Images/Videos
                  </h6>
                </NavLink>
              </div>
              <div className="payment-success-content">
              <NavLink to={ROUTER_URL_CONSTANT.CATALOGUE_VARIATIONS}>
                <h6 
                className={
                  location.pathname.includes('catproduct/variations')
                    ? 'active'
                    : ''
                }
                >Variations</h6>
              </NavLink>
              </div>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCatalogueProduct;
