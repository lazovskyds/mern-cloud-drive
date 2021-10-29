import React from 'react';
import backgroundImg from '../assets/background.png';

const Auth = ({title, children}) => {
    return (
        <div className="auth">
            <div className="auth__picture">
                <img src={backgroundImg} alt="" className="authImg" />
            </div>
            <div className="auth__form">
                <h1 className="auth__title">{title}</h1>
                {children}
            </div>
        </div>
    );
};

export default Auth;