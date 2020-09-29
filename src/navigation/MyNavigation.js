import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CalendarScreen from '../sreens/CalendarScreen'

import SelectionPartnerScreen from '../sreens/SelectionPartnerScreen'
import SelectionProjectScreen from '../sreens/SelectionProjectScreen'



import LoginScreen from '../sreens/LoginScreen'
import EventForm from '../form/EventForm'

import { useSelector } from 'react-redux'


const Stack = createStackNavigator();

const StackNavigator = ({isLoggedIn}) => {
  
  console.log('isLoggedIn - stack',isLoggedIn);

  return isLoggedIn ? (
    <Stack.Navigator>
 
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="EventForm" component={EventForm} />
      <Stack.Screen name="SelectionPartnerScreen" component={SelectionPartnerScreen} />
      <Stack.Screen name="SelectionProjectScreen" component={SelectionProjectScreen} />
      
      
    </Stack.Navigator>
  )
    :
    (
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    )
    ;
}

const MyNavigation = (props) => {

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  console.log('isLoggedIn',isLoggedIn);

  return (
    <NavigationContainer>
      <StackNavigator isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
}

export default MyNavigation;
