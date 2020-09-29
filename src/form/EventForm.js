import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Keyboard, ScrollView, Text } from 'react-native';
//import { Formik } from 'formik';
import { Input, Divider, registerCustomIconType } from 'react-native-elements';

import { useSelector, useDispatch } from 'react-redux'
//import { saveEventDispatch } from '../redux/app/appActions'
import Event from '../model/event'

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

    const [objFormEvent, setobjFormEvent] = useState(initialobjFormEvent);

    const handleBlur = () => {

    }

    const handleOnChange = (field, value) => {
        setobjFormEvent((prevState) => {
            return { ...prevState, [field]: value };

        }
        )
    }

    React.useLayoutEffect(() => {
        if (partner) {
            handleOnChange('partner', partner);
        }

        if (project) {
            handleOnChange('project', project);
        }


    }, [navigation, route]);

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

                <View style={styles.selectInput}>

                    <Text> Контрагент </Text>

                    <TextInput
                    
                        value={objFormEvent.partner.name}
                        editable={false} />


                    <Text style={styles.labelInput}> Проект </Text>

                    <TextInput
                       
                        value={objFormEvent.project.name}
                        editable={false} />

                    <Button style={styles.buttonInput}
                        onPress=
                        {() => {

                            navigation.navigate('SelectionPartnerScreen', { searchText: objFormEvent.partner.name });
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
        flexDirection: 'column',
        justifyContent: 'space-between',

        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e8ecf0',

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
