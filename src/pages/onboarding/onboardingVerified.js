import React, { useEffect } from 'react';
import { flowerImage, tickIcon } from '../../constants/imageConstants';
import AuthHeader from '../authentication/AuthHeader';
import { Link, useNavigate } from 'react-router-dom';

const OnboardingVerified = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/profile/details');
    }, 5000);
  }, []);

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
                <h4>Profile Submitted Successfully</h4>
                <p>
                  Thank you for successfully submitting the profile. Your
                  account will be activated once the details are verified by
                  ImAvatar.
                </p>
                <Link to="/onboarding/details">
                  <button className="edit">Edit</button>
                </Link>
                {/* <Link to='/email-verify'>
                                <input
                                    type="button"
                                    className="btn conti"
                                    value="Verify Email ID"
                                />
                            </Link> */}
              </div>
            </div>
            {/* <Link
                        className="col-md-12 frmss mb-4"
                        to='/profile/details'
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

export default OnboardingVerified;
