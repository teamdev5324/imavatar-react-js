import React from 'react';
import { Link } from 'react-router-dom';
import { logoImage } from '../../constants/imageConstants';

const AuthHeader = () => {
  return (
    <>
      <div className="logo">
        <div className="row">
          <div className="col-md-12">
            <div className="log">
              <img src={logoImage} className="img-fluid" alt="Brand Logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthHeader;
