import axios from 'axios'
import {API_URL } from '../../Constants'

class EventDataService {
  retrieveAllEvents(beginningPeriod, endPeriod) {
        return axios.get(`${API_URL}/items`, 
        {
            params: {
                'typerequest': 'events',
                'beginningPeriod': '15.12.2015 20:42:22',
                'endPeriod':'15.12.2020 20:42:22' 
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