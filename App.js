import React from 'react';

import MyNavigation from './src/navigation/MyNavigation'
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './src/redux/rootReducer';
import {loginFromAsyncStorage} from './src/redux/user/userActions'


const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}


const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(loginFromAsyncStorage());

const App = ()  => {
  return (<Provider store={store}> 
      <MyNavigation/> 
  </Provider>
  );
};

export default App;