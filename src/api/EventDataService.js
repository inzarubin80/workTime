import { API_URL } from '../Constants'
import { encode } from 'base-64'


export const getHash = (username, password) => {
    return 'Basic ' + encode(username + ":" + password);
}

export const executeAuthenticationService = (hash) => {

    console.log('executeAuthenticationService------------------');

    
    return fetch(`${API_URL}/?typerequest=authenticate`,
        {
            method: 'get',
            headers: new Headers({
                'Authorization': hash,
                'Content-Type': 'application/json'
            })
        })
        ;
}

export const getEvents = (beginningPeriod, endPeriod, hash) => {
    
    console.log('getEvents------------------');

    return fetch(`${API_URL}/?typerequest=events&beginningPeriod=${beginningPeriod}&endPeriod=${endPeriod}`,
        {
            method: 'get',
            headers: new Headers({
                'Authorization': hash,
                'Content-Type': 'application/json'
            })
        })
        ;
}

export const saveEvent = (event, hash) => {

    console.log('saveEvent------------------');
    console.log(hash);
    console.log(event);
    
    return fetch(`${API_URL}/?typerequest=saveEvent`,
        {
            method: 'POST',
            body: JSON.stringify(event),
            headers: new Headers({
                'Authorization': hash,
                'Content-Type': 'application/json'
            })
        })
        ;
}

