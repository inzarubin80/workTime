import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../sreens/CalendarScreen'
import LoginScreen from '../sreens/LoginScreen'

import EventForm from '../form/EventForm'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
      <Stack.Navigator>
       <Stack.Screen name="LoginScreen" component={LoginScreen} />
       <Stack.Screen name="Calendar" component={CalendarScreen} />
       <Stack.Screen name="EventForm" component={EventForm} />
      </Stack.Navigator>
  );
}

const MyNavigation = (props) => {
  return (
    <NavigationContainer>

        <StackNavigator/>

    </NavigationContainer>
  );
}

export default MyNavigation;
