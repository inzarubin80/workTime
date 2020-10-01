import React, { useState } from 'react';
import { Button, View, StyleSheet, Keyboard, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { saveEventDispatch, selectPartner, selectProject } from '../redux/app/appActions'
import Event from '../model/event'
import Card from '../components/Card'
import Input from '../components/Input'
import TitleText from '../components/TitleText'
import { InputDate } from '../components/InputDate'
import moment from 'moment';


const EventScreen = ({ route, navigation }) => {


    const { eventId, currentDate } = route.params;

    const partner = useSelector(state => state.app.selectPartner);
    const project = useSelector(state => state.app.selectProject);

    console.log('partner *************** ' + partner.name);
    console.log('project *************** ' + project.name);


    const dispatch = useDispatch();

    let initialobjFormEvent;

    console.log('eventId --- ' + eventId);

    if (partner) {
        console.log('partner --- ' + partner.name);
    }

    if (eventId) {
        initialobjFormEvent = useSelector(state => state.app.events.find((entity) => entity.id === eventId));

    }
    else {
        initialobjFormEvent = new Event('', currentDate);
    }


    const [modified, setModified] = useState(initialobjFormEvent.id ? false : true);
    const [objFormEvent, setobjFormEvent] = useState(initialobjFormEvent);

    const handleBlur = () => {

    }


    const handleOnChange = (field, value) => {
        setobjFormEvent((prevState) => {
            return { ...prevState, [field]: value };
        }
        )
        setModified(true);
    }

    const onChangeDate = (selectedDate) => {

        handleOnChange('date', moment(selectedDate).format('YYYY-MM-DD'));

    };

    const handleDispatch = () => {

        dispatch(saveEventDispatch(objFormEvent));
        navigation.navigate('Calendar');

    }

    React.useEffect(() => {
        handleOnChange('partner', partner);
        handleOnChange('project', project);
    }, [partner, project]);



    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Работа ' + objFormEvent.number + (modified ? ' *' : ''),
            headerRight: () => (
                <Button title="Записать" onPress={handleDispatch} />)
        });

    }, [navigation, route, objFormEvent]);

    return (

        <ScrollView >

            <View style={styles.screen}>

                <InputDate date={new Date(objFormEvent.date)} setDate={onChangeDate} />

                <Card style={styles.inputContainer}>

                    <TitleText>Проект</TitleText>
                    <Input value={objFormEvent.partner.name} />
                    <Input value={objFormEvent.project.name} />
                    <Button style={styles.buttonInput}
                        onPress=
                        {() => {

                            navigation.navigate('SelectionPartnerScreen', { searchText: objFormEvent.partner.name });
                        }
                        }

                        title="Выбор"
                    />
                </Card>

                <TitleText>Наименование</TitleText>
                <Input multiline={true} value={objFormEvent.title} onChangeText={value => handleOnChange('title', value)} blurOnSubmit={true} onSubmitEditing={() => { Keyboard.dismiss() }} />

                <TitleText>Содержание</TitleText>
                <Input multiline={true} value={objFormEvent.summary} onChangeText={value => handleOnChange('summary', value)} blurOnSubmit={true} onSubmitEditing={() => { Keyboard.dismiss() }} />

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


});

export default EventScreen;
