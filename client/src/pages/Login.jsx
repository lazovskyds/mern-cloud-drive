import React from 'react';
import { Auth, Input } from '../components';
import { login } from '../actions/user';
import { useDispatch } from 'react-redux';


const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const dispatch = useDispatch();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <Auth title="Login">
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

export default Login;