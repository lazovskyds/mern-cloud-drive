import React from 'react';
import sprite from '../assets/sprite.svg';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../reducers/userReducer';
import { getFiles, searchFiles } from '../actions/file';
import { showLoader } from '../reducers/appReducer';
import { API_URL } from '../config';
import { deleteAvatar, uploadAvatar } from '../actions/user';

const Navbar = () => {
	const isAuth = useSelector(({user}) => user.isAuth);
	const currentDir = useSelector(({files}) => files.currentDir);
	const currentUser = useSelector(({user}) => user.currentUser);

    const [searchName, setSearchName] = React.useState('');
    const [searchTimeout, setSearchTimeout] = React.useState(false);

    const dispatch = useDispatch();

    const defaultUserIcon = <svg className="user__default"><use href={sprite + "#user-default-icon"} /></svg>;
    const avatar = currentUser.avatar ? <img className="user__image" src={`${API_URL + currentUser.avatar}`} alt="" /> : defaultUserIcon;

    const searchHandler = (e) => {
        setSearchName(e.target.value);
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        dispatch(showLoader());

        if (e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 1000, e.target.value));
        } else {
            dispatch(getFiles(currentDir));
        }
    };

    const changeHandler = (e) => {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file));
    }
    
    return (
        <div className="navbar">
            <NavLink className="navbar-left" to="/">
                <svg className="navbar__logo">
                    <use href={sprite + "#logo"} />
                </svg>
                <span className="navbar__logo-description">Cloud</span>
            </NavLink>

            { isAuth
                && <div className="navbar__search">
                    <input
                        value={searchName}
                        onChange={(e) => searchHandler(e)}
                        type="text"
                        placeholder="File name..."
                        className="navbar__search-input"
                    />
                </div> }

            <div className="navbar-right">
                { !isAuth
                    && <NavLink to="/login">
                        <svg className="navbar__icon navbar__login">
                            <use href={sprite + "#sign-in"} />
                        </svg>
                    </NavLink> }
                { !isAuth
                    && <span>|</span> } 
                { !isAuth
                    && <NavLink to="/registration">
                        <svg className="navbar__icon navbar__registration">
                            <use href={sprite + "#sign-up"} />
                        </svg>
                    </NavLink> }
                { isAuth
                    && <div className="user">
                        {avatar}

                        {!currentUser.avatar ? <label>
                            <svg
                                className="user__action"
                            >
                                <use href={sprite + "#upload-file"} />
                            </svg>
                            
                            <input
                                onChange={(e) => changeHandler(e)}
                                accept="image/*"
                                type="file"
                                style={{display: 'none'}}
                            />
                        </label> : ''}

                        {currentUser.avatar ? <svg
                            className="user__action"
                            onClick={() => dispatch(deleteAvatar())}
                        >
                            <use href={sprite + '#delete-file'} />
                        </svg> : ''}
                    </div> }
                { isAuth
                    && <svg className="navbar__icon navbar__log-out" onClick={() => dispatch(logOut())}>
                        <use href={sprite + "#log-out"} />
                    </svg> }                
            </div>
        </div>
    );
};

export default Navbar;