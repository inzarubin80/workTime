import React from 'react';
import { Button, TextInput, View, KeyboardAvoidingView, Platform, StyleSheet, Keyboard, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { changeEvent, addEvent } from '../redux/actions'

const EventScreen = ({ route, navigation }) => {

    const { eventId } = route.params;
    const dispatch = useDispatch();

    console.log('eventId' + eventId);

    let initialobj;

    if (eventId == '-1') {
        initialobj = { id: '-1', date: route.params.currentDate, summary: '', title: '', duration: '' };
    }
    else {
        initialobj = useSelector(state => state.app.EVENTS.find((event) => event.id === eventId));
    }

    return (
<ScrollView>


         <KeyboardAvoidingView
            style={styles.container} behavior='position' >

            <Formik
                
                initialValues={initialobj}
                onSubmit={
                    (values) => {
                        
                        if  (initialobj.id=='-1'){
                            dispatch(addEvent(values)) 
                        }
                        else{
                            dispatch(changeEvent(values))
                        }
                        navigation.goBack();
                    }
                }
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (

                    <View>


                        <Input
                            placeholder="Номер"
                            value={values.id}
                            onChangeText={handleChange('id')}
                            onBlur={handleBlur('id')}
                            disabled={true}
                            label='Номер'
                        />

                        <Input
                            placeholder="Дата"
                            value={values.date}
                            onChangeText={handleChange('date')}
                            onBlur={handleBlur('date')}
                            label='Дата'
                        />

                        <Input
                            placeholder="Заголовок"
                            value={values.title}
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            label='Заголовок'

                        />



                        <Input
                            placeholder="Описание"
                            onChangeText={handleChange('summary')}
                            onBlur={handleBlur('summary')}
                            value={values.summary}
                            label='Описание'
                            multiline={true}
                        blurOnSubmit={true}
                        onSubmitEditing={()=>{Keyboard.dismiss()}}


                        />


                        <Input
                            placeholder="Количество часов"
                            onChangeText={handleChange('duration')}
                            onBlur={handleBlur('duration')}
                            value={values.duration}
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
