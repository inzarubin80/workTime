import React from 'react';
import { Button, TextInput, View, KeyboardAvoidingView, Platform, StyleSheet, Keyboard, ScrollView, Text } from 'react-native';
import { Formik } from 'formik';
import { Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { saveEventDispatch } from '../redux/app/appActions'
import RNSelect from '../components/react-native-select-awesome-fetch';

import { getPartners } from '../api/EventDataService'



const itemCustom = { color: '#146eff' };

const EventScreen = ({ route, navigation }) => {

    const { eventId } = route.params;
    const dispatch = useDispatch();


    let initialobj;

    if (eventId == '') {
        initialobj = { id: '', date: route.params.currentDate, summary: '', title: '', duration: '', number: '' };
    }
    else {
        initialobj = useSelector(state => state.app.events.find((event) => event.id === eventId));
    }

    const hash = useSelector(state => state.user.hash);

    console.log('hash ' + hash);

    return (


        <Formik

            initialValues={initialobj}
            onSubmit={
                (values) => {
                    dispatch(saveEventDispatch(values))
                    navigation.goBack();
                }
            }
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (



                <ScrollView>

{/*                    <KeyboardAvoidingView
                        style={styles.container} behavior='position' >*/}




                        <Input
                            placeholder="Номер"
                            value={values.number.toString()}
                            //keyboardType='numeric'
                            //onChangeText={handleChange('number')}
                            //onBlur={handleBlur('number')}
                            disabled={true}
                            label='Номер'
                        />



                        <Input
                            placeholder="id"
                            value={values.id.toString()}
                            onChangeText={handleChange('id')}
                            onBlur={handleBlur('id')}
                            disabled={true}
                            label='id'
                        />


                        <RNSelect
                            placeholder="Контрагент"
                            height={60}
                            styleItem={itemCustom}
                            datasFunction={getPartners}
                            requestParameters={{ hash }}
                            notFind='Не найдены элементы справочника'

                        // onChangeText = {(value)=>{console.log(value)}}
                        //label = {'java'}


                        />

                        <Input
                            placeholder="Дата"
                            value={values.date.toString()}
                            onChangeText={handleChange('date')}
                            onBlur={handleBlur('date')}
                            label='Дата'
                        />

                        <Input
                            placeholder="Заголовок"
                            value={values.title.toString()}
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            label='Заголовок'

                        />



                        <Input
                            placeholder="Описание"
                            onChangeText={handleChange('summary')}
                            onBlur={handleBlur('summary')}
                            value={values.summary.toString()}
                            label='Описание'
                            multiline={true}
                            blurOnSubmit={true}
                            onSubmitEditing={() => { Keyboard.dismiss() }}
                        />


                        <Input
                            placeholder="Количество часов"
                            onChangeText={handleChange('duration')}
                            onBlur={handleBlur('duration')}
                            value={values.duration.toString()}
                            keyboardType='numeric'
                            label='Количество часов'
                        />



                        <Button onPress={handleSubmit} title="ОК" />
                    
                    {/*</KeyboardAvoidingView>*/}


                </ScrollView>
            )}

        </Formik>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


export default EventScreen;
