import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, Outlet } from 'react-router-dom';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';

const AddBulkCatalogue = () => {
    const location = useLocation();
    const [data, setData] = useState(null);
    const [cat, setCat] = useState(null);

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('bulkFileData')));
        setCat(JSON.parse(localStorage.getItem('cat')));
    }, []);

    return (
        <div className="tab-content col-md-10 p-0" id="nav-tabContent">
            <div
                className="tab-pane fade show active"
                id="nav4"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
            >
                <div className="orng-head oddrflx">
                    <p>Catalog uploads {`>`} Add Bulk Catalog</p>
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
                        {cat && <h4 className="cathed pt-4">{cat.cat} {`>`} {cat.subCat}</h4>}
                        <div className="payment-success mt-2 mb-4">
                            <div className="payment-success-content">
                                <NavLink to={ROUTER_URL_CONSTANT.CREATE_CATALOGUE}>
                                    <h6
                                        className={
                                            location.pathname.includes('catbulkproduct/createcatalog') || location.pathname.includes('catbulkproduct/bulkcataloguefilereport')
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        1. Create your
                                        catalog
                                    </h6>
                                </NavLink>
                            </div>
                            <div className="payment-success-content">
                                <NavLink to={ROUTER_URL_CONSTANT.VIEW_QC_STATUS}>
                                    <h6
                                        className={
                                            location.pathname.includes('catbulkproduct/viewqcstatus/:id') || location.pathname.includes('catbulkproduct/correcterrors')
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        2. View QC status
                                    </h6>
                                </NavLink>
                            </div>
                            <div className="payment-success-content">
                                <NavLink to={ROUTER_URL_CONSTANT.VIEW_SUCCESSFUL_LISTING}>
                                    <h6
                                        className={
                                            location.pathname.includes('catbulkproduct/viewsuccessfullisting')
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        3. View successful listing
                                    </h6>
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

export default AddBulkCatalogue;
