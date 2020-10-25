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
  CalendarProvider,
  LocaleConfig
} from 'react-native-calendars';


import { setCurrentDate, setCurrentMonth, getEventsDispatch } from '../redux/app/appActions';
import { Button, Divider} from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux'
import EventList from '../components/EventList'

import Event from '../model/event'
import Partner from '../model/partner'
import Project from '../model/project'

import Icon from 'react-native-vector-icons/FontAwesome';


import { THEME } from '../themes'
import { login } from '../redux/user/userActions';


LocaleConfig.locales['ru'] = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthNamesShort: [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ],
  dayNames: [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ],
  dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  today: 'Сегодня',
};

LocaleConfig.defaultLocale = 'ru';

const CalendarScreen = ({ navigation, setCurrentMonth, setCurrentDate, getEventsDispatch, events, currentDate, currentMonth }) => {

  React.useEffect(() => {
    const startOfMonth = moment(currentMonth.dateString).startOf('month').format('YYYYMMDDhhmm');
    const endOfMonth = moment(currentMonth.dateString).endOf('month').format('YYYYMMDDhhmm');
    getEventsDispatch(startOfMonth, endOfMonth);
  }, [currentMonth]);


  const decorationNormDay = {
    selected: true,
    selectedColor: '#006600',
    //selectedTextColor: 'red',
  }

  const decorationLiteDay = {
    selected: true,
    selectedColor: '#33FF33',
  }

const decorationHardDay = {
    selected: true,
    selectedColor: '#003300',
  }
  



  const carentDecorationDay = {
    //selected: true,
    selectedColor: 'blue',
    //selectedTextColor: 'blue',
  }


 

  let DataTime = {};
  events.forEach((item, index, array) => {
    if ([item.date] in DataTime) {
      DataTime[item.date] = DataTime[item.date] + Number(item.duration);
    }
    else {
      DataTime[item.date] = Number(item.duration);
    }
  });

  for (let key in DataTime) {
    if (key == currentDate) {
      DataTime[key] = carentDecorationDay;
    }
    else {
    
      if (DataTime[key]>8)
      {
        DataTime[key] = decorationHardDay;
      }
      else if (DataTime[key]==8)
      {
        DataTime[key] = decorationNormDay;
      }
      else
      {
        DataTime[key] = decorationLiteDay;
      }
     
    
    }
  }



  React.useLayoutEffect(() => {


    navigation.setOptions({

      title: 'Работы по дням',

      headerRight: () => (
        <TouchableOpacity style={styles.button} onPress={() => {

          navigation.navigate('EventForm', { event: new Event('', currentDate), partner: new Partner(), project: new Project() })
        }}>
          <Icon
            name="plus-square"
            size={35}
            color={THEME.MAIN_COLOR}
          />
        </TouchableOpacity>),
    });
  }, [navigation, currentDate]);

  const onDateChanged = (date) => {
    setCurrentDate(date);
  };

  const onMonthChange = (month) => {
    setCurrentMonth(month);
  };


  let totalHours = 0;
  let totalHoursMonth = 0;

  const eventsCarrentDate = events.filter(
    (event) => {

      totalHoursMonth = totalHoursMonth +  event.duration; 
      if (moment(event.date).isSame(currentDate, 'day')) {
        totalHours = totalHours + event.duration;
        return true;
      }
      else {
        return false;
      }
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

        markedDates={DataTime}

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

    <Divider style={{ backgroundColor: '#333333' }} />


    <View style = {styles.total}>
      
      <View >      
        <Text style = {styles.totalText}>Итого за день: {totalHours} ч.</Text>
      </View>

      <View >      
        <Text style = {styles.totalText}>Итого за месяц: {totalHoursMonth} ч.</Text>
      </View>

    </View>

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

  button: {
    marginRight: 30,
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
  },


  total: {

   justifyContent: 'space-between',
    flexDirection: 'row', 
   // borderWidth: 1,

  },

  totalText: {
    fontSize: 16,
    padding: 5,
    color: '#333333',

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
  setCurrentDate, setCurrentMonth, getEventsDispatch, login
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
