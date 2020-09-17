import { LOGIN_SUCCESS, LOGIN_REQUEST } from '../types'

const initialState = {
    isLoggedIn: false,
    loggingIn: false,
    username: '',
    password: '',
};

export default (state = initialState, action) => {

    switch (action.type) {

        case LOGIN_REQUEST:
            return {
                ...state,
                ...action.payload,
                loggingIn: true,
                isLoggedIn: false,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loggingIn: false,
                isLoggedIn: true,

            };

        default:

            return state
    }
}
