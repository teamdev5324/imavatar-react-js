import React from 'react';

interface Props {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  mainClass?: string;
  subClass?: string;
  colClass: string;
  value: string;
  error: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInputField: React.FC<Props> = ({
  label,
  placeholder,
  type,
  mainClass,
  subClass,
  name,
  colClass,
  value,
  onChange,
  error,
  onBlur,
  onFocus
}) => {

  return (
    <div
      className={`${colClass ? colClass : ''} frmses ${mainClass ? mainClass : ''
        }`}
    >
      <label>{label}</label>
      <input
        type={type}
        className={`form-control ${subClass ? subClass : ''}`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {error && (
        <div className='error'>{error}</div>
      )}
    </div>
  );
};

export default ProfileInputField;
