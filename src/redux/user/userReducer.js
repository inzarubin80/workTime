import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_LOGOUT, SET_USERNAME, SET_PASSWORD } from '../types'

const  initialState = {
    isLoggedIn:  false ,
    loggingIn:  false,
    username:   '',
    password: '',
    hash:'',
    err:''
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

        case SET_USERNAME:
            return {
                ...state,       
                username: action.payload,
   
            };

        case SET_PASSWORD:
            return {
                ...state,       
                password: action.payload,
   
            };
        
            case LOGIN_FAILURE:
                return {
                    ...state,

                    ...action.payload,
                    
                    loggingIn: false,
                    isLoggedIn: false,
                };


            case LOGIN_LOGOUT:
                return {
                    ...initialState
                };
        

        default:

            return state
    }
}
