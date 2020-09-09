import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../sreens/CalendarScreen'
import YourApp from '../sreens/YourApp'



import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const StackNavigator = createStackNavigator();

import { Text } from 'react-native';




const MyNavigation = (props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Calendar" component={CalendarScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyNavigation;
