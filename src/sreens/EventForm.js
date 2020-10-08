import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Keyboard, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { saveEventDispatch} from '../redux/app/appActions'
import Card from '../components/Card'
import Input from '../components/Input'
import TitleText from '../components/TitleText'
import { InputDate } from '../components/InputDate'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import { THEME } from '../themes'

const EventScreen = ({ route, navigation }) => {


    const { event, partner, project } = route.params;

    const dispatch = useDispatch();

    const [modified, setModified] = useState(event.id ? false : true);
    const [objFormEvent, setobjFormEvent] = useState(event);

    const handleBlur = () => { }

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

    const handleCopy = () => {
        setobjFormEvent((prevState) => {
            return { ...prevState, id: '', number: '' };
        })
        setModified(true);
    }

    const getValue = (value) => {

        if (value == 0) {
            return '';
        }
        else {
            return value.toString();
        }
    }


    React.useEffect(() => {

        if (partner != objFormEvent.partner) {
            handleOnChange('partner', partner);
        }

        if (project != objFormEvent.project) {
            handleOnChange('project', project);
        }


    }, [partner, project]);




    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Работа ' + objFormEvent.number + (modified ? ' *' : ''),
            headerRight: () => (

                <View style={styles.groupButton}>

                    <TouchableOpacity style={styles.button} onPress={handleCopy}>
                        <Icon
                            name="copy"
                            size={30}
                            color={THEME.MAIN_COLOR}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleDispatch}>

                        <Icon
                            name="save"
                            size={30}
                            color={THEME.MAIN_COLOR}
                        />

                    </TouchableOpacity>

                </View>





            )
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


                    <TouchableOpacity onPress=
                        {() => {

                            navigation.navigate('SelectionPartnerScreen', { searchText: objFormEvent.partner.name });
                        }
                        }>

                        <Icon
                            name="search"
                            size={30}
                            color={THEME.MAIN_COLOR}
                        />

                    </TouchableOpacity>


                </Card>

                <TitleText>Наименование</TitleText>
                <Input multiline={true} value={objFormEvent.title} onChangeText={value => handleOnChange('title', value)} blurOnSubmit={true} onSubmitEditing={() => { Keyboard.dismiss() }} />

                <TitleText>Содержание</TitleText>
                <Input multiline={true} value={objFormEvent.summary} onChangeText={value => handleOnChange('summary', value)} blurOnSubmit={true} onSubmitEditing={() => { Keyboard.dismiss() }} />


                <TitleText>Количество часов</TitleText>
                <Input multiline={true} keyboardType='numeric' value={getValue(objFormEvent.duration)} onChangeText={value => handleOnChange('duration', value)} blurOnSubmit={true} />

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
        alignItems: 'center',
        margin: 5,
        paddingVertical: 5
    },

    button: {
        marginRight: 30,
    },


    groupButton: {
        flexDirection: 'row',
    }



});

export default EventScreen;
