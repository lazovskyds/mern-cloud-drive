import React from 'react';
import { Auth, Input } from '../components';
import { registration } from '../actions/user';


const Registration = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        registration(email, password);
        setEmail('');
        setPassword('');
    };

    return (
        <Auth title="Registration">
            <form onSubmit={handleFormSubmit}>
                <div className="auth__row">
                    <div className="auth__label">Email</div>
                    <Input
                        value={email}
                        setValue={setEmail}
                        type="text"
                        placeholder="Email"
                    />
                </div>
                <div className="auth__row">
                    <div className="auth__label">Password</div>
                    <Input
                        value={password}
                        setValue={setPassword}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <button type="submit" className="auth__button">Send</button>
            </form>
        </Auth>
    );
};

export default Registration;