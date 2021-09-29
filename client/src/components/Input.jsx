import React from 'react';

const Input = (props) => {
    return (
        <input
            className="auth__input"
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
            type={props.type}
            placeholder={props.placeholder}
        />
    );
};

export default Input;