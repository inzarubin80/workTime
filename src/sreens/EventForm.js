import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Keyboard, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { saveEventDispatch } from '../redux/app/appActions'
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

    const [err, setErr] = useState({});


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

    const handleSave = () => {

       let isErr = false;

        for (let key in err) {
            if (err[key]) {
                isErr = true;
                console.log('ошибка в поле ---------' + key);
                break;
            }
        }


        if (!isErr) {

            dispatch(saveEventDispatch(objFormEvent, navigation));
        }
    }



    const handleRemove = () => {

        if (!objFormEvent.id) {
            navigation.navigate('Calendar');
        }
        else {
            dispatch(saveEventDispatch({ ...objFormEvent, deletionMark: true }, navigation));
        }

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


    React.useEffect(() => {

        let newErr = {};

        for (let key in objFormEvent) {

            newErr[key] = false;

            if ((key == 'deletionMark') || (key == 'id') || (key == 'summary') || (key == 'number')) {
                continue;
            }
            else if ((key == 'partner') || (key == 'project')) {

                if ((!objFormEvent[key].id) || (objFormEvent[key].id=='00000000-0000-0000-0000-000000000000')) {

                    newErr[key] = true;
                }
            }
            else if (!objFormEvent[key]) {
                newErr[key] = true;

            }
        }

        setErr(newErr);

    }, [objFormEvent]);


    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Работа ' + objFormEvent.number + (modified ? ' *' : ''),
            headerRight: () => (

                <View style={styles.groupButton}>


                    <TouchableOpacity style={styles.button} onPress={handleRemove}>
                        <Icon
                            name="remove"
                            size={30}
                            color={THEME.MAIN_COLOR}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleCopy}>
                        <Icon
                            name="copy"
                            size={30}
                            color={THEME.MAIN_COLOR}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Icon
                            name="save"
                            size={30}
                            color={THEME.MAIN_COLOR}
                        />
                    </TouchableOpacity>
                </View>
            )
        });

    }, [navigation, route, objFormEvent, err]);




    return (

        <ScrollView >

            <View style={styles.screen}>

                <InputDate date={new Date(objFormEvent.date)} setDate={onChangeDate} />

                <Card style={styles.inputContainer}>

                    <TitleText style={err.partner ? styles.TitleTextErr : styles.TitleTextOk}>Проект</TitleText>
                    <Input value={objFormEvent.partner.name} />

                    <TitleText style={err.project ? styles.TitleTextErr : styles.TitleTextOk}>Договор</TitleText>
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

                <TitleText style={err.title ? styles.TitleTextErr : styles.TitleTextOk}>Наименование</TitleText>
                <Input style={styles.inputText} multiline={true} value={objFormEvent.title} onChangeText={value => handleOnChange('title', value)} blurOnSubmit={true} onSubmitEditing={() => { Keyboard.dismiss() }} />

                <TitleText>Содержание</TitleText>
                <Input style={styles.inputText} multiline={true} value={objFormEvent.summary} onChangeText={value => handleOnChange('summary', value)} blurOnSubmit={true} onSubmitEditing={() => { Keyboard.dismiss() }} />


                <TitleText style={err.duration ? styles.TitleTextErr : styles.TitleTextOk}>Количество часов</TitleText>
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

    inputText: {

        minWidth: '100%',

    },

    groupButton: {
        flexDirection: 'row',
    },

    TitleTextErr: {
        color: 'red'
    },
    TitleTextOk: {
        color: 'green'
    }

});

export default EventScreen;
