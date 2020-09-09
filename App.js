import React from 'react';

import MyNavigation from './src/navigation/MyNavigation'
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './src/redux/rootReducer';

const store = createStore(rootReducer);
const App = ()  => {
  return (<Provider store={store}> 
      <MyNavigation/> 
  </Provider>
  );
};

export default App;