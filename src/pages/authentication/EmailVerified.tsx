import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { flowerImage, logoImage, tickIcon } from '../../constants/imageConstants';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';
import AuthHeader from './AuthHeader';

const EmailVerified = () => {
    return (
        <>
            <div className="flows">
                <img src={flowerImage} className="img-fluid" />
            </div>
            <div className="logo">
                <div className="row">
                    <div className="col-md-12">
                        <div className="log">
                            <img src={logoImage} className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>
            <div className="yellow pt-md-5 pb-md-5 ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="yellow-cont">
                                <img src={tickIcon} className="img-fluid" />
                                <h4>Email Verified</h4>
                                <p>Thank you. Your email has been verified. Click below to proceed to the next step.</p>
                                <input type="button" className="btn conti" value="Signin" onClick={() => {
                                    localStorage.clear();
                                    window.location.assign('/signin');
                                }} />
                            </div>
                        </div>
                        {/* <div className="col-md-12 frmss mb-4">
                            <a href="mobile_verify.html"> <input type="button" className="btn btn1" value="Next" /> </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmailVerified;
