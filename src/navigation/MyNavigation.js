import * as React from 'react';

import {Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CalendarScreen from '../sreens/CalendarScreen'

import SelectionPartnerScreen from '../sreens/SelectionPartnerScreen'
import SelectionProjectScreen from '../sreens/SelectionProjectScreen'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../sreens/LoginScreen'
import EventForm from '../sreens/EventForm'
import ReportScreen from '../sreens/ReportScreen'

import { useSelector } from 'react-redux'


import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

const StackNavigator = () => {
  
  return  (
    <Stack.Navigator>
 
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="EventForm" component={EventForm} />
      <Stack.Screen name="SelectionPartnerScreen" component={SelectionPartnerScreen} />
      <Stack.Screen name="SelectionProjectScreen" component={SelectionProjectScreen} />
      
    </Stack.Navigator>
  )
  
}

const Tab = createBottomTabNavigator();

const MyNavigation = (props) => {

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  return (
    <NavigationContainer>
      <Tab.Navigator
      
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'today';
          } else if (route.name === 'User') {
            iconName = 'accessibility';
          }
          else if (route.name === 'Report') {
            iconName = 'analytics';
          }
  
        return   <Icon name= {iconName} color={color} size={size}/>;

        },

        tabBarLabel: ({ focused, color, size }) => {
          let title = '';
          if (route.name === 'Home') {
            title = 'Работы';
          } else if (route.name === 'User') {
            title = 'Профиль';
          }
          else if (route.name === 'Report') {
            title = 'Отчеты';
          }
          return <Text>{title}</Text>;
        },



        
      })}
      
      tabBarOptions={{
        //activeTintColor: 'tomato',
       // inactiveTintColor: 'gray',
      }}
            
      >
       
      {isLoggedIn && <Tab.Screen name="Home" component={StackNavigator} title = 'Работы'/>}
      {isLoggedIn && <Tab.Screen name="Report" component={ReportScreen} title = 'Отчеты'/>}

      <Tab.Screen name="User" component={LoginScreen}/>

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyNavigation;
