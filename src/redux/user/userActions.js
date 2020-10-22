import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_LOGOUT
} from '../types'

import { executeAuthenticationService, getHash } from '../../api/EventDataService';
import AsyncStorage from '@react-native-community/async-storage';

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

export const logOut = (loginData) => {
  return {
    type: LOGIN_LOGOUT
  };
};

export const login = (username, password, navigation) => {
  return (dispatch) => {

    hash = getHash(username, password);

    let loginData = { username: username, password: password, hash: hash, err: ''};

    dispatch(setLoginRequest(loginData));

    return executeAuthenticationService(hash)
      .then(response => {

        console.log(response.status);

        if (response.status == 401){
        console.log(response.status);
          return {msg: 'Ошибка ввода имени или пароля'}
        }
        else {
          return response.json()
        }
      })

      .then((json) => {

        if (json.msg === 'success') {

          setLoginLocal(username, password, hash);

          
          dispatch(setLoginSuccess(loginData));

          navigation.navigate('Calendar');

        } else {

          loginData.err = json.msg;
          dispatch(setLoginFailure(loginData));

        }
      })
      .catch((err) => {
               
        dispatch(setLoginFailure({ username: username, password: password, err:'Сервис недоступен, попробуйте позже'}));
        console.log('Login Failed', 'Some error occurred, please retry');
        console.log(err);
      });
  };
}

const setLoginLocal = async (username, password,) => {
  try {
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('password', password);
    await AsyncStorage.setItem('hash', hash);

  } catch (err) {
    console.log(err);
  }
};