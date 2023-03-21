import React from 'react';
import AuthHeader from './AuthHeader';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AuthWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div style={{ background: 'white' }}>
      <div className="clearfix">
        <AuthHeader />
        <div className="clearfix"></div>
        {children}
        <div className="clearfix"></div>
      </div>
    </div>
  );
};

export default AuthWrapper;
