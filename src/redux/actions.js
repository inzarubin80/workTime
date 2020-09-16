import {
  SET_CURRENTDATE,
  EDIT_EVENT,
  ADD_EVENT,
  SET_LOGIN_STATE
} from './types'

import {executeAuthenticationService} from '../api/AuthenticationService';


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

const setLoginState = (loginData) => {
  return {
    type: SET_LOGIN_STATE,
    payload: loginData,
  };
};


export const login = (username, password) => {
  return (dispatch) => {  // don't forget to use dispatch here!
    return executeAuthenticationService(username, password)
      .then((response) => JSON.parse(response.text().trim()))
      .then((json) => {
        if (json.msg === 'success') { // response success checking logic could differ
          dispatch(setLoginState({ username:username, password:password})); // our action is called here
        } else {
          Alert.alert('Login Failed', 'Username or Password is incorrect');
        }
      })
      .catch((err) => {
        Alert.alert('Login Failed', 'Some error occurred, please retry');
        console.log(err);
      });
  };
}

<<<<<<< HEAD
=======
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


>>>>>>> 454e0a7e1e3d686d26201329cd101828b692d83e
