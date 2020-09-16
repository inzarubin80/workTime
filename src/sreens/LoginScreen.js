import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import {AppButton} from '../components/AppButton';

import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';


const LoginScreen = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>

            <Input
                value={username}
                onChangeText={username => setUsername(username)}
                label='Имя пользователя'
                style={styles.input}
            />
            <Input
                value={password}
                onChangeText={password => setPassword(password)}
                label='Пароль'
                secureTextEntry={true}
                style={styles.input}
            />


            <AppButton onPress={() => dispatch(login(username, password ))}> Вход</AppButton>
          
        </View>
    );
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#00FFFF',
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        //marginBottom: 10,
    }
});


export default LoginScreen;
