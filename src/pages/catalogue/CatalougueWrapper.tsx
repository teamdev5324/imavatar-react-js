import React, { ReactNode } from 'react';

interface CatalougueWrapperProps {
  title: string;
  children: ReactNode;
}

const CatalougueWrapper: React.FC<CatalougueWrapperProps> = ({
  title,
  children,
}) => {
  return (
    <div className="tab-content col-md-10 p-0" id="nav-tabContent">
      <div
        className="tab-pane fade show active"
        id="nav4"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      >
        <div className="orng-head oddrflx">
          <p>{title}</p>
        </div>
        <div className="col-md-12 whtbox">
          <div className="panel-box">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CatalougueWrapper;
