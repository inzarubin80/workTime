import { API_URL } from '../Constants'
import { encode } from 'base-64'
import AsyncStorage from '@react-native-community/async-storage';

const Header = async  () => {

    const username = await AsyncStorage.getItem('username');
    const password = await AsyncStorage.getItem('password');

    console.log('username' + username);

    return new Headers({
        'Authorization': 'Basic ' + encode(username + ":" + password),
        'Content-Type': 'application/json'
    })
}


export const  getEvents =  (beginningPeriod, endPeriod) => {
  return fetch(`${API_URL}/?typerequest=events&beginningPeriod=${beginningPeriod}&endPeriod=${endPeriod}`,
        {
            method: 'get',
            headers: Header(),
        })
    ;
}

/*
import const retrieveAllEvents = (beginningPeriod, endPeriod) => {
    return axios.get(`${API_URL}/items`,
        {

            params: {
                'typerequest': 'events',
                'beginningPeriod': '15.12.2015 20:42:22',
                'endPeriod': '15.12.2020 20:42:22'
            }
        });
}


class EventDataService {
    retrieveAllEvents(beginningPeriod, endPeriod) {
        return axios.get(`${API_URL}/items`,
            {

                params: {
                    'typerequest': 'events',
                    'beginningPeriod': '15.12.2015 20:42:22',
                    'endPeriod': '15.12.2020 20:42:22'
                }
            });
    }

    retrieveEvent(name, id) {
        return axios.get(`${API_URL}/users/${name}/todos/${id}`);
    }

    deleteEvent(name, id) {
        return axios.delete(`${API_URL}/users/${name}/todos/${id}`);
    }

    updateEvent(name, id, todo) {
        return axios.put(`${API_URL}/users/${name}/todos/${id}`, todo);
    }

    createEvent(name, todo) {
        return axios.post(`${API_URL}/users/${name}/todos/`, todo);
    }

}

export default new EventDataService()
*/
