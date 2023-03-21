import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { flowerImage, tickIcon } from '../../constants/imageConstants';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';
import AuthHeader from './AuthHeader';

const MobileVerified = () => {
  return (
    <>
      <div className="flows">
        <img src={flowerImage} className="img-fluid" alt="Background" />
      </div>
      <AuthHeader />

      <div className="clearfix"></div>
      <div className="yellow pt-md-5 pb-md-5 ">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="yellow-cont">
                <img src={tickIcon} className="img-fluid" alt="Verifi Icon" />
                <h4>Mobile Number Verified</h4>
                <p>
                  Thank you. Your Mobile number has been verified. Click below
                  to verify your email ID.
                </p>
                <Link to='/email-verify'>
                  <input
                    type="button"
                    className="btn conti"
                    value="Verify Email ID"
                  />
                </Link>
              </div>
            </div>
            {/* <Link
              className="col-md-12 frmss mb-4"
              to='/email-verify'
            >
              <input type="button" className="btn btn1" value="Next" />
            </Link> */}
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </>
  );
};

export default MobileVerified;
