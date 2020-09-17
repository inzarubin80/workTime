import {API_URL} from '../Constants'
import {encode} from 'base-64'

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


