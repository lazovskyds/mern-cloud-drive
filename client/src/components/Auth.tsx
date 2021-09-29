import React from 'react';
import backgroundImg from '../assets/background.png';


type AuthProps = {
    title: string,
    children: any
}

const Auth: React.FC<AuthProps> = ({title, children}) => {
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