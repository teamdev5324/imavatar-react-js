import React from 'react';

interface Props {
    type?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    error?: any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CatalogueTextInputField: React.FC<Props> = ({
    placeholder,
    type,
    name,
    value,
    onChange,
    error,
    onBlur,
    onFocus
}) => {

    return (
        <div style={{ width: '105%' }}>
            <input
                type={type}
                className="form-control"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onBlur={onBlur}
                onFocus={onFocus}
            />
            {error &&
                <div className='error' style={{ paddingTop: 20, }}>{error}</div>
            }
        </div>


    );
};


export default CatalogueTextInputField