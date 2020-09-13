import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../sreens/CalendarScreen'
import EventForm from '../form/EventForm'

import YourApp from '../sreens/YourApp'

import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="EventForm" component={EventForm} />
      </Stack.Navigator>
  );
}

const MyNavigation = (props) => {
  return (
    <NavigationContainer>

        <StackNavigator/>


    {/*  
      <Tab.Navigator>
        <Tab.Screen name="Calendar" component={StackNavigator} />
      </Tab.Navigator>
    */}

    </NavigationContainer>
  );
}

export default MyNavigation;
