import {API_URL} from '../Constants'
import {encode} from 'base-64'

/*
import AsyncStorage from '@react-native-community/async-storage';

export const STORAGE_KEY = 'BasicAuthToken';

export const getBasicAuthToken = async () => {

    const token = await AsyncStorage.getItem(STORAGE_KEY);
    
    console.log('{Значение внутри функции' + token);

    return token;

};

export const setBasicAuthToken = async (username, password) => {

    const token = 'Basic ' + encode(username + ":" + password);
    await AsyncStorage.setItem(STORAGE_KEY, token);

};

*/

export const  executeAuthenticationService = (username, password) => {

    console.log('Basic ' + encode(username + ":" + password));
    

    return fetch(`${API_URL}/?typerequest=authenticate`,
        {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Basic ' + encode(username + ":" + password),
                'Content-Type': 'application/json'
            })
        })
        ;
}


