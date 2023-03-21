import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  src: string;
  title: string;
  link: string;
}

const ProfileTab: React.FC<Props> = ({ src, title, link }) => {
  return (
    <NavLink
      className={(navData) =>
        `profile_icon_box ${navData.isActive ? 'actives' : ''}`
      }
      to={link}
    >
      <img src={src} className="img-fluid" alt="icon" />
      <p>{title}</p>
    </NavLink>
  );
};

export default ProfileTab;
