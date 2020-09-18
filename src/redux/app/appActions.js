import {
  SET_CURRENTDATE,
  SET_CURRENTMONTH, 
  EDIT_EVENT,
  ADD_EVENT,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE
} from '../types'

import {getEvents} from '../../api/EventDataService';

export const setCurrentDate = (currentDate) => {  
  return {
      type: SET_CURRENTDATE,
      payload: currentDate
  }
}

export const setCurrentMonth = (currentMonth) => {  
  return {
      type: SET_CURRENTMONTH,
      payload: currentMonth
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


const setEventsSuccess = (events) => {
  return {
    type: FETCH_EVENTS_SUCCESS,
    payload: events,
  };
};

const setEventsRequest = () => {
  return {
    type: FETCH_EVENTS_REQUEST
  };
};


const setEventsFailure = () => {
  return {
    type: FETCH_EVENTS_FAILURE
  };
};

export const getEventsDispatch = (beginningPeriod, endPeriod) => {
  
  console.log('старт getEventsDispatch');

  return  dispatch => {  
    
    dispatch(setEventsRequest()); 
    /*
    return getEvents(beginningPeriod, endPeriod)
      .then(response => response.json())
      .then((json) => {
          dispatch(setEventsSuccess(json));     
      })
      .catch((err) => {   
        dispatch(setEventsFailure()); 
        console.log(err);
      });
  */
    };
  
}
