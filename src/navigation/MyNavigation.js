import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../sreens/CalendarScreen'

import {  Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const StackKatalog = createStackNavigator();

import {Text} from 'react-native';


const Calendar = () => {
  return (
    <StackKatalog.Navigator>
      <StackKatalog.Screen name="Calendar" component={CalendarScreen}

        options={{
          title: 'Календарь',

          headerTitleStyle: {
            color: '#952833'

          },
        }}
      />
    </StackKatalog.Navigator>
  );
};


const tabNavigation = (props) => {
  return (
    <Tab.Navigator
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Calendar') {
          iconName = 'view-list';
        }

        return   <Icon name= {iconName} color={color} size={size}/>;
      },

      tabBarLabel: ({ focused, color, size }) => {
        let title = '';
        if (route.name === 'Calendar') {
          title = 'Календарь';
        }
        return <Text>{title}</Text>;
      },
    })}
    
    tabBarOptions={{
      activeTintColor:    '#952833',
      inactiveTintColor:  'gray',
    }}>

      <Tab.Screen name="Calendar" component={Calendar} />
     
    </Tab.Navigator>
  );
}

const MyNavigation = (props) => {
  return (
    <NavigationContainer>
      <tabNavigation/>
    </NavigationContainer>
  );
}

export default MyNavigation;
