import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Button } from 'react-native'
import { Text } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { THEME } from '../themes'

export const InputDate  = ({ date, setDate }) => {

    
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View>
            <View style={styles.datetime}>

                <TouchableOpacity onPress={showDatepicker} style={styles.title}>
                    <Text h4 h4Style={{ color: THEME.MAIN_COLOR }}>{date}</Text>
                    <Icon name='calendar-month' size={30} color={THEME.MAIN_COLOR} />
                </TouchableOpacity>


{/*
                <TouchableOpacity onPress={showTimepicker} style={styles.title}>
                    <Text h4 h4Style={{ color: THEME.MAIN_COLOR }}>{format(date, "HH:mm")}</Text>
                    <Icon name='clock' size={30} color={THEME.MAIN_COLOR} />
                </TouchableOpacity>
*/}

                </View>

            {show && (
                    <DateTimePicker
                        value={new Date(date)}
                        //minimumDate={Date.parse(new Date())}
                        display={mode === "date" ? "default" : "spinner"}
                        is24Hour={true}
                        mode={mode}
                        onChange={onChange}
                    />)}
        </View>
    )

}

const styles = StyleSheet.create({

    centre: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'


    },
    title: {

        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //paddingRight: 5
        marginRight: 15

    },
    datetime: {

        flexDirection: 'row',
        //justifyContent: 'space-between',
        //marginRight: 30
    }
}
)