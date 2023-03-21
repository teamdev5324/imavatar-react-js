import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import ProfileTab from '../../components/profile/ProfileTab';
import {
  avatarActiveIcon,
  bankIcon,
  deletesIcon,
  editPropertyIcon,
  multiUserIcon,
  notificationIcon,
  policyIcon,
  secureIcon,
  tickTopIcon,
} from '../../constants/imageConstants';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';
import {
  getProfileData,
  getUserData,
} from '../../services/profile/getUserData';
import { SystemState } from '../../store/storeTypes';

const ProfileWrapper = () => {
  const dispatch =
    useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getProfileData());
  }, []);
  return (
    <div className="tab-content col-md-10 p-0" id="nav-tabContent">
      <div
        className="tab-pane fade show active"
        id="nav3"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      >
        <div className="orng-head">
          <p>
            <img src={tickTopIcon} className="img-fluid" alt="icon" />
            Congratulations! Your profile has been verified.
          </p>
        </div>
        <div className="col-md-12 whtbox defpadd">
          <div className="panel-box">
            <div className="deletes">
              <div className="deletes-left">
                <h6>Hi Prashant, Your Partner Unique ID is MHAVHPT00001</h6>
                <p>(Use Partner unique ID for all future refrence)</p>
              </div>
              <div className="deletes-right">
                <img src={deletesIcon} className="img-fluid" alt="icon" />
              </div>
            </div>
            <div className="profile_icon">
              <ProfileTab
                src={avatarActiveIcon}
                title="Personal Details"
                link={`${ROUTER_URL_CONSTANT.PROFILE_DETAILS}`}
              />
              <ProfileTab
                src={bankIcon}
                title="Bank Details"
                link={`${ROUTER_URL_CONSTANT.BANK_DETAILS}`}
              />
              <ProfileTab
                src={editPropertyIcon}
                title="GSTIN Details"
                link={`${ROUTER_URL_CONSTANT.GSTIN_DETAILS}`}
              />
              <ProfileTab
                src={multiUserIcon}
                title="Manage Users"
                link={`${ROUTER_URL_CONSTANT.MANAGE_USERS}`}
              />
              <ProfileTab
                src={secureIcon}
                title="Change Password"
                link={`${ROUTER_URL_CONSTANT.CHANGE_PASSWORD}`}
              />
              <ProfileTab
                src={policyIcon}
                title="Legal terms & Policies"
                link={`${ROUTER_URL_CONSTANT.POLICIES}`}
              />
              <ProfileTab
                src={notificationIcon}
                title="Whatsapp Notification"
                link={`${ROUTER_URL_CONSTANT.WHATSAPP_NOTIFICATION}`}
              />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWrapper;
