import React from 'react';
import { deleteIcon, editIcon } from '../../constants/imageConstants';

interface Props {
  role: string;
  name: string;
  email: string;
  phone: string;
}

const ManageUserCard: React.FC<Props> = ({ email, name, phone, role }) => {
  return (
    <div className="magr-user">
      <div className="mgs-img">
        <a href="">
          <img src={editIcon} className="img-fluid" alt="icon" />
        </a>
        <a href="">
          <img src={deleteIcon} className="img-fluid" alt="icon" />
        </a>
      </div>
      <div className="mgrusr1">
        <h4>Role</h4>
        <h6>{role}</h6>
      </div>
      <div className="mgrusr1">
        <h4>Name </h4>
        <h6> {name}</h6>
      </div>
      <div className="mgrusr1">
        <h4> Email ID</h4>
        <h6> {email} </h6>
      </div>
      <div className="mgrusr1">
        <h4>Mobile Number </h4>
        <h6>{phone}</h6>
      </div>
    </div>
  );
};

export default ManageUserCard;
