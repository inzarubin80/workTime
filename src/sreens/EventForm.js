import React, { useState } from 'react';
import { Button, View, StyleSheet, Keyboard, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { saveEventDispatch, selectPartner, selectProject } from '../redux/app/appActions'
import Card from '../components/Card'
import Input from '../components/Input'
import TitleText from '../components/TitleText'
import { InputDate } from '../components/InputDate'
import moment from 'moment';


const EventScreen = ({ route, navigation }) => {


    const {event, partner, project} = route.params;

    const dispatch = useDispatch();
   
    const [modified, setModified] = useState(event.id ? false : true);
    const [objFormEvent, setobjFormEvent] = useState(event);

    const handleBlur = () => {    }

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

        dispatch(saveEventDispatch(objFormEvent, navigation));
       

    }


    const getValue = (value) => {

        if (value==0) {
            return '';
        }
        else
        {
            return value.toString();
        }
    }


    React.useEffect(() => {

        if (partner != objFormEvent.partner){
            handleOnChange('partner', partner);
        }
     
        if (project != objFormEvent.project){
            handleOnChange('project', project);
        }
     
    
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


                <TitleText>Количество часов</TitleText>
                <Input multiline={true} keyboardType = 'numeric' value={getValue(objFormEvent.duration)} onChangeText={value => handleOnChange('duration', value)} blurOnSubmit={true}/>

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
