import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/user/userActions';

const LoginScreen = () => {

    const [username, setUsername] = useState('Z');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    
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

            {isLoggedIn?(<ActivityIndicator size="large" color="#00ff00" />)
            :(<Button title= 'Войти' onPress={() => dispatch(login(username, password ))} /> )}
          
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
