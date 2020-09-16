import {
  SET_CURRENTDATE,
  EDIT_EVENT,
  ADD_EVENT,
  SET_LOGIN_STATE
} from './types'

import {executeAuthenticationService} from '../api/AuthenticationService';


export const setCurrentDate = (currentDate) => {  
  return {
      type: SET_CURRENTDATE,
      payload: currentDate
  }
}

export const changeEvent = (event) => {  
  return {
      type: EDIT_EVENT,
      payload: event
  }
}

export const addEvent = (event) => {  
  return {
      type: ADD_EVENT,
      payload: event
  }
}

const setLoginState = (loginData) => {
  return {
    type: SET_LOGIN_STATE,
    payload: loginData,
  };
};


export const login = (username, password) => {
  return (dispatch) => {  // don't forget to use dispatch here!
    return executeAuthenticationService(username, password)
      .then(response => response.json())
      .then((json) => {
        if (json.msg === 'success') { // response success checking logic could differ
          console.log('Все хорошо');
          dispatch(setLoginState({ username:username, password:password})); // our action is called here
        } else {
          console.log('Login Failed', 'Username or Password is incorrect');
        }
      })
      .catch((err) => {
        console.log('Login Failed', 'Some error occurred, please retry');
        
        console.log(err);
      });
  };
}