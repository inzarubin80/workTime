import React from 'react';
import { Button, TextInput, View, KeyboardAvoidingView, Platform, StyleSheet, Keyboard, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { saveEventDispatch } from '../redux/app/appActions'

const EventScreen = ({ route, navigation }) => {

    const { eventId } = route.params;
    const dispatch = useDispatch();

    console.log('eventId' + eventId);

    let initialobj;

    if (eventId == '') {
        initialobj = { id: '', date: route.params.currentDate, summary: '', title: '', duration: '', number: '' };
    }
    else {
        initialobj = useSelector(state => state.app.events.find((event) => event.id === eventId));
    }

    return (
        <ScrollView>

            <KeyboardAvoidingView
                style={styles.container} behavior='position' >

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

                        <View>

      
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
                        </View>
                    )}

                </Formik>
            </KeyboardAvoidingView>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


export default EventScreen;
