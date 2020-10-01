import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE } from '../types'



const initialState = {
    isLoggedIn: false,
    loggingIn: false,
    username: 'Z',
    password: '',
    hash:''
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

            case LOGIN_FAILURE:
                return {
                    ...state,
                    loggingIn: false,
                    isLoggedIn: false,
                };
        

        default:

            return state
    }
}
