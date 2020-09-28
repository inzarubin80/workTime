import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Keyboard, ScrollView, Text } from 'react-native';
//import { Formik } from 'formik';
import { Input, Divider, registerCustomIconType } from 'react-native-elements';

import { useSelector, useDispatch } from 'react-redux'
//import { saveEventDispatch } from '../redux/app/appActions'
import Event from '../model/event'

const EventScreen = ({ route, navigation }) => {

    
    const { eventId } = route.params;

    console.log('eventId-- ' +  eventId);
    // const dispatch = useDispatch();
    const hash = useSelector(state => state.user.hash);


    let initialobjFormEvent;


    if (eventId == '') {
        initialobjFormEvent = new Event();
    }
    else {

        initialobjFormEvent = useSelector(state => state.app.events.find((entity) => entity.id === eventId));
         console.log('initialobjFormEvent ---------- ' + initialobjFormEvent);

    }

    const [objFormEvent, setobjFormEvent] = useState(initialobjFormEvent);

    console.log('objFormEvent- ' + objFormEvent);
    


    //const [number, setNumber] = useState('');
    //const [id, setId] = useState(objFormEvent.id);
    //const [date, setDate] = useState(objFormEvent.date);

    //const [title, setTitle] = useState(objFormEvent.title);
    //const [summary, setSummary] = useState(objFormEvent.summary);

    //const [duration, setDuration] = useState(objFormEvent.duration)

    const handleBlur = () => {

    }


    const handleOnChange = (field, value) => {
        setobjFormEvent((prevState) => 
        {       
            return {...prevState, [field]:value};
            
        }
        )
    }


    //const [summary, setSummary] = useState('');


    return (

        <ScrollView>

            <Input
                placeholder="Дата"
                value={objFormEvent.date.toString()}
                onChangeText={value => handleOnChange('date', value)}
                onBlur={handleBlur('date')}
                label='Дата'
            />


            <View>
                <Text style={styles.labelInput}> Контрагент </Text>

                <View style={styles.selectInput}>


                    <Text style={styles.labelInput}> {objFormEvent.partner.title} </Text>

                    <Button style={styles.buttonInput}
                        onPress=
                        {() => {

                            navigation.navigate('SelectionPartnerScreen',
                                {

                                    searchText: 'Искомый контрагент',
                                    onPartner: handleOnChange
                                }

                            );
                        }
                        }

                        title="Выбор"
                    />

                </View>
            </View>

           

            <Input
                placeholder="Заголовок"
                value={objFormEvent.title.toString()}
                onBlur={handleBlur('title')}
                label='Заголовок'
                onChangeText={value => handleOnChange('title', value)}
            />

            <Input
                placeholder="Описание"

                onChangeText={value => handleOnChange('summary', value)}

                onBlur={handleBlur('summary')}
                value={objFormEvent.summary.toString()}
                label='Описание'
                multiline={true}
                blurOnSubmit={true}
                onSubmitEditing={() => { Keyboard.dismiss() }}
            />


            {/*
            <Input
                placeholder="Количество часов"
                onChangeText={()=>{}}
                onBlur={handleBlur('duration')}
                value={objFormEvent.duration.toString()}
                keyboardType='numeric'
                label='Количество часов'
            />
            <Button onPress={() => { console.log('Пишем объект') }} title="ОК" />
        */}

        </ScrollView>
    )
};

const styles = StyleSheet.create({

    selectInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e8ecf0',
        flexDirection: 'row'
    },

    labelInput: {
        fontSize: 16
    },

    valueInput: {
        minWidth: "65%"
    },

    buttonInput: {
        maxWidth: "25%"
    },

});

export default EventScreen;
