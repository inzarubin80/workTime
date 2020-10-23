import { API_URL } from '../Constants'
import { encode } from 'base-64'

export const getHash = (username, password) => {
    return 'Basic ' + encode(username + ":" + password);
}

export const executeAuthenticationService = (hash) => {

    
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

export const getPartners = ({searchText, hash}) => {
    return fetch(`${API_URL}/?typerequest=referencesPartners&searchText=${searchText}`,
        {
            method: 'get',
            headers: new Headers({
                'Authorization': hash,
                'Content-Type': 'application/json'
            })
        })
        ;
}


export const getProjects = ({searchText, hash, idPartner}) => {
    return fetch(`${API_URL}/?typerequest=referencesProjects&searchText=${searchText}&idPartner=${idPartner}`,
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

