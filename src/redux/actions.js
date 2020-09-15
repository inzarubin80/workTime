import {
  SET_CURRENTDATE,
  EDIT_EVENT,
  ADD_EVENT
} from './types'

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


  
export function personsFetchDataSuccess(persons) {
  return {
      type: "PERSONS_FETCH_DATA_SUCCESS",
      persons
  }
}

export function personsFetchData(url) {
  return (dispatch) => {
      fetch(url)
          .then(response => {
              if(!response.ok) {
                  throw new Error(response.statusText);
              }
              return response;
          })
          .then(response => response.json())
          .then(persons => dispatch(personsFetchDataSuccess(persons)))
          .catch(()=>{});
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(personsFetchData(url))
  };
};



const    fetchData =  url => dispatch(
      (url)  =>  (dispatch) => {
            fetch(url)
                .then(response => {
                    if(!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response;
                })
                .then(response => response.json())
                .then(persons => dispatch(personsFetchDataSuccess(persons)))
                .catch(()=>{});
        }
      
    );


