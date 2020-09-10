import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../sreens/CalendarScreen'
import EventScreen from '../sreens/EventScreen'

import YourApp from '../sreens/YourApp'

import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="EventScreen" component={EventScreen} />
      </Stack.Navigator>
  );
}

const MyNavigation = (props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Calendar" component={StackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyNavigation;
