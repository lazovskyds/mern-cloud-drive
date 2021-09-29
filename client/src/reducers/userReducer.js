const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';


const defaultState = {
    currentUser: {},
    isAuth: false
};

export default function userReducer(state = defaultState, action) {
    const { type, payload } = action
    switch(type) {
        case SET_USER:
            return {...state, currentUser: payload, isAuth: true};
        case LOG_OUT:
            localStorage.removeItem('token')
            return {...state, currentUser: {}, isAuth: false};
        default:
            return state;
    }
}

export const setUser = (user) => ({type: SET_USER, payload: user});
export const logOut = () => ({type: LOG_OUT});