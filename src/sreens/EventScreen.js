import React from 'react';
import { Button, TextInput, View } from 'react-native';
import { Formik } from 'formik';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

const EventScreen = props => (
    <Formik
        initialValues={{ summary: '', title: '', start: '' }}
        onSubmit={values => console.log(values)}
    >
        {({ handleChange, handleBlur, handleSubmit, values }) => (

            <View>

                <Input
                    placeholder="Title"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')} />

                <Input
                    placeholder="summary"
                    onChangeText={handleChange('summary')}
                    onBlur={handleBlur('summary')}
                    value={values.summary}
                />

                <DateTimePicker
                    testID="dateTimePicker"
                    value={start}
               //     mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={handleChange('start')}
                />
                <Button onPress={handleSubmit} title="Submit" />
            </View>
        )}
    </Formik>
);

export default EventScreen;
