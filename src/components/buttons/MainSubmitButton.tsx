import React from 'react';

interface Props {
  title: string;
  className: string;
}

const MainSubmitButton: React.FC<Props> = ({ title, className }) => {
  return (
    <input
      type="submit"
      name=""
      className={className}
      value={title}
      style={{ width: 'fit-content' }}
    />
  );
};

export default MainSubmitButton;
