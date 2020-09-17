import {
  SET_CURRENTDATE,
  EDIT_EVENT,
  ADD_EVENT,
} from '../types'



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


