import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE
} from '../types'

import {executeAuthenticationService} from '../../api/AuthenticationService';

const setLoginSuccess = (loginData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: loginData,
  };
};

const setLoginRequest = (loginData) => {
  return {
    type: LOGIN_REQUEST,
    payload: loginData,
  };
};

const setLoginFailure = (loginData) => {
  return {
    type: LOGIN_FAILURE,
    payload: loginData,
  };
};

export const login = (username, password) => {
  return (dispatch) => {  
    
    dispatch(setLoginRequest({username:username, password:password})); 

    return executeAuthenticationService(username, password)
      .then(response => response.json())
      .then((json) => {
        if (json.msg === 'success') { 
          dispatch(setLoginSuccess({ username:username, password:password})); 
        } else {
          
          dispatch(setLoginFailure({ username:username, password:password})); 

        }
      })
      .catch((err) => {   
        dispatch(setLoginFailure({ username:username, password:password})); 
        console.log('Login Failed', 'Some error occurred, please retry');
        console.log(err);
      });
  };
}