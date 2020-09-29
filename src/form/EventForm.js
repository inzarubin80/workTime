import React, { useState } from 'react';
import { Button, View, StyleSheet, Keyboard, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import Event from '../model/event'
import Card from '../components/Card'
import Input from '../components/Input'
import TitleText from '../components/TitleText'
import InputDate from '../components/InputDate'

import moment from 'moment';


import DateTimePicker from '@react-native-community/datetimepicker';

const EventScreen = ({ route, navigation }) => {


    const { eventId, partner, project } = route.params;

    const hash = useSelector(state => state.user.hash);

    let initialobjFormEvent;

    console.log('eventId --- ' + eventId);

    if (partner) {
        console.log('partner --- ' + partner.name);
    }

    if (eventId) {
        initialobjFormEvent = useSelector(state => state.app.events.find((entity) => entity.id === eventId));
    }
    else {
        initialobjFormEvent = new Event();
    }


    const [modified, setModified] = useState(initialobjFormEvent.id ? false : true);
    const [objFormEvent, setobjFormEvent] = useState(initialobjFormEvent);
    const [show, setShow] = useState(false);

    const showDatepicker = () => {
        setShow(true);
    };

    const handleBlur = () => {

    }


    const handleOnChange = (field, value) => {

        setModified(true);

        setobjFormEvent((prevState) => {
            return { ...prevState, [field]: value };
        }
        )
    }


    const onChangeDate = (selectedDate) => {
         handleOnChange('date', currentDate);

    };

    React.useLayoutEffect(() => {
        if (partner) {
            handleOnChange('partner', partner);
        }

        if (project) {
            handleOnChange('project', project);
        }

        navigation.setOptions({
            title: 'Работа ' + objFormEvent.number + (modified ? ' *' : ''),
        });

    }, [navigation, route, modified]);

    return (

        <ScrollView >

            <View style={styles.screen}>

                <Card style={styles.inputContainer}>

                    <TitleText>Проект</TitleText>
                    <Input multiline={true} value={objFormEvent.partner.name} />
                    <Input multiline={true} value={objFormEvent.project.name} />
                    <Button style={styles.buttonInput}
                        onPress=
                        {() => {

                            navigation.navigate('SelectionPartnerScreen', { searchText: objFormEvent.partner.name });
                        }
                        }

                        title="Выбор"
                    />
                </Card>

                            
              
                <InputDate  date = {objFormEvent.date} setDate= {onChangeDate}/>

             
                <TitleText>Наименование</TitleText>
                <Input multiline={true} value={objFormEvent.title.toString()} onChangeText={value => handleOnChange('title', value)} blurOnSubmit={true} onSubmitEditing={() => { Keyboard.dismiss() }} />

                <TitleText>Содержание</TitleText>
                <Input multiline={true} value={objFormEvent.summary.toString()} onChangeText={value => handleOnChange('summary', value)} blurOnSubmit={true} onSubmitEditing={() => { Keyboard.dismiss() }} />

                <Button onPress={() => { console.log('Пишем объект') }} title="ОК" />

            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        padding: 5,
        alignItems: 'center'
    },

    inputContainer: {
        width: 400,
        maxWidth: '90%',
        alignItems: 'center'
    },



    buttonInput: {
        maxWidth: "25%"
    },

});

export default EventScreen;
