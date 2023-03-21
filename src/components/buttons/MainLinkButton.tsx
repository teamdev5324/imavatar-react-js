import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  to?: string;
  title: string;
  isActive?: boolean;
}

const MainLinkButton: React.FC<Props> = ({ to, title, isActive }) => {
  const navigate = useNavigate();
  return (
    <div
      className="col-md-12 frmss mb-4"
      onClick={() => (to ? navigate(`${to}`) : '')}
    >
      <input
        type="submit"
        className={`btn btn1 ${isActive ? 'btn2' : ''}`}
        value={title}
      />
    </div>
  );
};

export default MainLinkButton;
