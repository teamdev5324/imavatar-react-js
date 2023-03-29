import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import {
  APP_CONSTANTS,
  ROUTER_URL_CONSTANT,
} from './constants/routerUriConstants';
import Signin from './pages/authentication/Signin';
import Signup from './pages/authentication/Signup';
import MobileVerify from './pages/authentication/MobileVerify';
import MobileVerified from './pages/authentication/MobileVerified';
import Sidebar from './layout/Sidebar/Sidebar';
import PersonalDetails from './pages/profile/PersonalDetails';
import ProfileWrapper from './pages/profile/ProfileWrapper';
import Dashboard from './pages/dashboard/Dashboard';
import BankDetails from './pages/profile/BankDetails';
import GstinDetails from './pages/profile/GstinDetails';
import { ManageUsers } from './pages/profile/ManageUsers';
import ChangePassword from './pages/profile/ChangePassword';
import LegalPolicies from './pages/profile/LegalPolicies';
import Notification from './pages/profile/Notification';
import ProtectedRoutes from './ProtectedRoutes';
import InventoryWrapper from './pages/inventory/InventoryWrapper';
import ActiveInventory from './pages/inventory/ActiveInventory';
import InventoryPending from './pages/inventory/InventoryPending';
import InventoryInactive from './pages/inventory/InventoryInactive';
import InventoryOnhold from './pages/inventory/InventoryOnhold';
import InventoryBlocked from './pages/inventory/InventoryBlocked';
import PaymentsWrapper from './pages/payments/PaymentsWrapper';
import OrdersWrapper from './pages/orders/OrdersWrapper';
import NewOrders from './pages/orders/NewOrders';
import ReadyToShipOrders from './pages/orders/ReadyToShipOrders';
import Intransit from './pages/orders/Intransit';
import Delivered from './pages/orders/Delivered';
import Cancelled from './pages/orders/Cancelled';
import ReportsWrapper from './pages/reports/ReportsWrapper';
import ReportOrders from './pages/reports/ReportOrders';
import ReportReturn from './pages/reports/ReportReturn';
import ReviewsAndRatings from './pages/reports/ReviewsAndRatings';
import CategoryWiseReviews from './pages/reports/CategoryWiseReviews';
import CategoryUploads from './pages/catalogue/CategoryUploads';
import SelectCategory from './pages/catalogue/SelectCategory';
import AddCatalogueProduct from './pages/catalogue/AddCatalogueProduct';
import AddBulkCatalogue from './pages/catalogue/AddBulkCatalogue';
import ProductVitalInfo from './pages/catalogue/ProductVitalInfo';
import CatalogPricing from './pages/catalogue/CatalogPricing';
import CatalogueDescription from './pages/catalogue/CatalogueDescription';
import ImagesOrVideos from './pages/catalogue/ImagesOrVideos';
import ReturnWrapper from './pages/return/ReturnWrapper';
import ReturnInitiated from './pages/return/ReturnInitiated';
import ReturnToday from './pages/return/ReturnToday';
import ReturnCompleted from './pages/return/ReturnCompleted';
import ReturnExchange from './pages/return/ReturnExchange';
import { ToastContainer } from 'react-toastify';
import { getItem } from './utils/storage';
import EmailVerify from './pages/authentication/EmailVerify';
import EmailVerified from './pages/authentication/EmailVerified';
import OnboardingDetails from './pages/onboarding/details';
import OnboardingBankDetails from './pages/onboarding/bankDetails';
import GSTIN from './pages/onboarding/gstin';
import Terms from './pages/onboarding/terms';
import OnboardingVerified from './pages/onboarding/onboardingVerified';
import ForgotPassword from './pages/authentication/ForgotPassword';
import ResetPassword from './pages/authentication/ResetPassword';
import ForgotPasswordOTP from './pages/authentication/ForgotPasswordOTP';
import { decrypt } from './crypto';
import OTPSignin from './pages/authentication/OTPSignin';
import OTPSigninSent from './pages/authentication/OTPSigninSend';
import DeleteUser from './pages/deleteUser';
import apiCall from './pages/onboarding/apiCall';
import CreateBulkCatalog from './pages/catalogue/CreateBulkCatalog';
import ViewQcStatus from './pages/catalogue/ViewQcStatus';
import CorrectErrors from './pages/catalogue/CorrectErrors';
import ViewSuccessfulListing from './pages/catalogue/ViewSuccessfulListing';
import BulkCatalogueFileReport from './pages/catalogue/BulkCatalogueFileReport';

function App() {
  const userData = getItem(APP_CONSTANTS.auth_token);
  const [apiCalled, setApiCalled] = useState(0);
  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   if (!sessionStorage.getItem('profileData')) {
  //     setApiCalled(false);
  //   };
  // }, []);

  useEffect(() => {
    const path = window.location.href.split('/')[3];

    // if (localStorage.getItem('onboarding') === 'true' && window.location.href.split('/')[3] + '/' + window.location.href.split('/')[4] !== 'onboarding/verified') {
    //   window.location.assign('/onboarding/verified');
    // }

    if (localStorage.getItem('userData')) {
      const { emailVerified, phoneVerified } = JSON.parse(
        decrypt(localStorage.getItem('userData'))
      );

      if (
        !emailVerified &&
        !phoneVerified &&
        path !== 'signin' &&
        path !== 'signup' &&
        path !== 'mobileotp' &&
        path !== 'mobileverified' &&
        path !== 'email-verify' &&
        path !== 'email-verified'
      ) {
        window.location.assign('/mobileotp');
      }
    }

    // if (!localStorage.getItem('userData') && path !== 'signin' && path !== 'signup' && path !== 'mobileotp' && path !== 'mobileverified' && path !== 'email-verify' && path !== 'email-verified') {
    //   window.location.assign('/signin');
    // }

    // else if (localStorage.getItem('userData') && (path === 'signin' || path === 'signup' || path === 'mobileotp' || path === 'mobileverified' || path === 'email-verify' || path === 'email-verified')) {
    //   window.location.assign('/profile/details');
    // };
  });

  const CallApi = async () => {
    if (localStorage.getItem('userData') && localStorage.getItem('token')) {
      await apiCall();
      setApiCalled(1);
    }

    // if (sessionStorage.getItem('profileData')) {
    //   setApiCalled(1);
    // }
  };

  useEffect(() => {
    window.addEventListener('unload', () => {
      // sessionStorage.clear();
    });

    CallApi();
  }, []);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTER_URL_CONSTANT.SIGNUP} element={<Signup />} />
          <Route path={ROUTER_URL_CONSTANT.SIGNIN} element={<Signin />} />
          <Route
            path={ROUTER_URL_CONSTANT.MOBILEOTP_VERIFY}
            element={<MobileVerify />}
          />
          <Route
            path={ROUTER_URL_CONSTANT.MOBILEOTP_VERIFIED}
            element={<MobileVerified />}
          />
          <Route
            path="/forgot-password/otp/:username"
            element={<ForgotPasswordOTP />}
          />
          <Route path="/otp-signin/otp/:username" element={<OTPSigninSent />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/delete-user" element={<DeleteUser />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/otp-signin" element={<OTPSignin />} />
          <Route
            path={ROUTER_URL_CONSTANT.EMAILVERIFY}
            element={<EmailVerify />}
          />
          <Route
            path={ROUTER_URL_CONSTANT.EMAILVERIFIED}
            element={<EmailVerified />}
          />
          <Route element={<ProtectedRoutes />}>
            <Route path={`${ROUTER_URL_CONSTANT.HOME}/*`} element={<Sidebar />}>
              <Route
                path={ROUTER_URL_CONSTANT.PAYMENYS}
                element={<PaymentsWrapper />}
              />

              {/* INVENTORY ROUTES */}
              <Route
                path={`${ROUTER_URL_CONSTANT.INVENTORY}`}
                element={<InventoryWrapper />}
              >
                <Route
                  path={ROUTER_URL_CONSTANT.INVENTORY_ACTIVE}
                  element={<ActiveInventory />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.INVENTORY_PENDING}
                  element={<InventoryPending />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.INVENTORY_INACTIVE}
                  element={<InventoryInactive />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.INVENTORY_ONHOLD}
                  element={<InventoryOnhold />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.INVENTORY_BLOCKED}
                  element={<InventoryBlocked />}
                />
              </Route>

              {/* ORDERS ROUTE */}
              <Route
                path={ROUTER_URL_CONSTANT.ORDERS}
                element={<OrdersWrapper />}
              >
                <Route
                  path={ROUTER_URL_CONSTANT.NEW_ORDER}
                  element={<NewOrders />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.READY_TO_SHIP}
                  element={<ReadyToShipOrders />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.INTRANSIT}
                  element={<Intransit />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.DELIVERED}
                  element={<Delivered />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.CANCELLED}
                  element={<Cancelled />}
                />
              </Route>

              {/* CATALOGUE ROUTE */}
              <Route
                path={ROUTER_URL_CONSTANT.CATELOGS}
                element={<CategoryUploads />}
              />
              <Route
                path={ROUTER_URL_CONSTANT.CATALOG_SELECT_CATEGORY}
                element={<SelectCategory />}
              />
              <Route
                path={ROUTER_URL_CONSTANT.CATALOGUE_PRODUCT_BULK}
                element={<AddBulkCatalogue />}
              >
                <Route
                  path={ROUTER_URL_CONSTANT.CREATE_CATALOGUE}
                  element={<CreateBulkCatalog />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.BULK_CATALOGUE_FILE_REPORT}
                  element={<BulkCatalogueFileReport />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.VIEW_QC_STATUS}
                  element={<ViewQcStatus />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.CORRECT_ERRORS}
                  element={<CorrectErrors />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.VIEW_SUCCESSFUL_LISTING}
                  element={<ViewSuccessfulListing />}
                />
              </Route>
              <Route
                path={ROUTER_URL_CONSTANT.CATALOGUE_PRODUCT}
                element={<AddCatalogueProduct />}
              >
                <Route
                  path={ROUTER_URL_CONSTANT.CATALOGUE_PRODUCT_INFO}
                  element={<ProductVitalInfo />}
                />

                <Route
                  path={ROUTER_URL_CONSTANT.CATALOGUE_PRICING}
                  element={<CatalogPricing />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.CATALOGUE_DESCRIPTION}
                  element={<CatalogueDescription />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.CATALOGUE_IMAGES_VIDEOS}
                  element={<ImagesOrVideos />}
                />
              </Route>
              {/* CATALOGUE ROUTE END */}

              {/* PROFILE ROUTES */}
              <Route
                path={`${ROUTER_URL_CONSTANT.PROFILE}/*`}
                element={<ProfileWrapper />}
              >
                <Route
                  path={ROUTER_URL_CONSTANT.PROFILE_DETAILS}
                  element={<PersonalDetails />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.BANK_DETAILS}
                  element={<BankDetails />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.GSTIN_DETAILS}
                  element={<GstinDetails />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.MANAGE_USERS}
                  element={<ManageUsers />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.CHANGE_PASSWORD}
                  element={<ChangePassword />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.POLICIES}
                  element={<LegalPolicies />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.WHATSAPP_NOTIFICATION}
                  element={<Notification />}
                />
              </Route>
              {/* PROFILE ROUTES END */}

              {/* REPORTS ROUTE */}
              <Route
                path={ROUTER_URL_CONSTANT.REPORTS}
                element={<ReportsWrapper />}
              >
                <Route
                  path={ROUTER_URL_CONSTANT.REPORT_ORDERS}
                  element={<ReportOrders />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.REPORT_RETURNS}
                  element={<ReportReturn />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.REPORT_REVIEWS_RATINGS}
                  element={<ReviewsAndRatings />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.REPORT_CATEGORY_WISE}
                  element={<CategoryWiseReviews />}
                />
              </Route>
              {/* REPORTS ROUTE END */}

              {/* RETURN ROUTES */}
              <Route
                path={ROUTER_URL_CONSTANT.RETURN}
                element={<ReturnWrapper />}
              >
                <Route
                  path={ROUTER_URL_CONSTANT.INITIATED}
                  element={<ReturnInitiated />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.TODAY}
                  element={<ReturnToday />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.COMPLETED}
                  element={<ReturnCompleted />}
                />
                <Route
                  path={ROUTER_URL_CONSTANT.EXCHANGE}
                  element={<ReturnExchange />}
                />
              </Route>
              {/* RETURN ROUTES END */}
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Route>
          <Route path="/onboarding/details" element={<OnboardingDetails />} />
          <Route
            path="/onboarding/bank-details"
            element={<OnboardingBankDetails />}
          />
          <Route path="/onboarding/gstin" element={<GSTIN />} />
          <Route path="/onboarding/terms" element={<Terms />} />
          <Route path="/onboarding/verified" element={<OnboardingVerified />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
