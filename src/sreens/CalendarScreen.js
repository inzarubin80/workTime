import _ from 'lodash';
import React from 'react';

import {
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import {
  ExpandableCalendar,
  CalendarProvider
} from 'react-native-calendars';


import { setCurrentDate, setCurrentMonth, getEventsDispatch } from '../redux/app/appActions';
import { Button } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux'
import EventList from '../components/EventList'

import { login } from '../redux/user/userActions';

const CalendarScreen = ({ navigation, setCurrentMonth, setCurrentDate, getEventsDispatch, events, currentDate, currentMonth, login }) => {

 React.useEffect(() => {
   const startOfMonth = moment(currentMonth.dateString).startOf('month').format('YYYYMMDDhhmm');
   const endOfMonth = moment(currentMonth.dateString).endOf('month').format('YYYYMMDDhhmm');
   getEventsDispatch(startOfMonth, endOfMonth);
 }, [currentMonth]);
 
 
  React.useLayoutEffect(() => {
    navigation.setOptions({

      headerRight: () => (
        <Button
          title="Добавить"
          onPress={() => {
            navigation.navigate('EventForm', { eventId: '', currentDate: currentDate }
            )
          }
          }
        />
      ),
    });
  }, [navigation, currentDate]);

  onDateChanged = (date) => {
    setCurrentDate(date);
  };

  onMonthChange = (month) => {
    setCurrentMonth(month);
  };

  const renderEmptyItem = () => {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    if (_.isEmpty(item)) {
      return renderEmptyItem();
    }
    return (
      <TouchableOpacity
        style={styles.item}>
        <View>
          <Text style={styles.itemHourText}>Где мы!!!!!!!</Text>

          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button title={'Info'} />
        </View>
      </TouchableOpacity>
    );
  };


 
  
  const eventsCarrentDate = events.filter(
    (event) => { 
      console.log('event.date  ' + event.date);  
      console.log('event.title ' + event.title);  
       
      return moment(event.date).isSame(currentDate, 'day')
    
    }
  );

    const getTheme = () => {
    const themeColor = '#0059ff';
    const lightThemeColor = '#e6efff';
    const disabledColor = '#a6acb1';
    const black = '#20303c';
    const white = '#ffffff';

    return {
      // arrows
      arrowColor: black,
      arrowStyle: { padding: 0 },
      // month
      monthTextColor: black,
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: black,
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // today
      todayBackgroundColor: lightThemeColor,
      todayTextColor: themeColor,
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: white,
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: white,
      disabledDotColor: disabledColor,
      dotStyle: { marginTop: -2 }
    };
  };

  return (
    <CalendarProvider
      // date={ITEMS[0].title}
      date={currentDate}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}

      theme={{ todayButtonTextColor: '#0059ff' }}
      showTodayButton
      disabledOpacity={0.6}
    // todayBottomMargin={16}
    >

      <ExpandableCalendar
        // horizontal={false}
        // hideArrows
        // disablePan
        // hideKnob
        // initialPosition={ExpandableCalendar.positions.OPEN}
        firstDay={1}
        // markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
        // markedDates={() => {}} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
        theme={getTheme()}
        leftArrowImageSource={require('../img/previous.png')}
        rightArrowImageSource={require('../img/next.png')}
      // calendarStyle={styles.calendar}
      // headerStyle={styles.calendar} // for horizontal only
      // disableWeekScroll
      />


      <EventList


        navigation={navigation}
        events={eventsCarrentDate}

      />

    </CalendarProvider>
  )
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  section: {
    backgroundColor: '#f0f4f7',
    color: '#79838a'
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0'
  },
  emptyItemText: {
    color: '#79838a',
    fontSize: 14
  }
});


const mapStateToProps = state => {
  return {
    events: state.app.events,
    currentDate: state.app.currentDate,
    currentMonth: state.app.currentMonth,
  }
}

const mapDispatchToProps = {
  setCurrentDate, setCurrentMonth, getEventsDispatch,login
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
