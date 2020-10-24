import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { login, logOut, setUserName, setPassword } from '../redux/user/userActions';


const LoginScreen = ({ route, navigation }) => {


   
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const err = useSelector(state => state.user.err);
    const username = useSelector(state => state.user.username);
    const password = useSelector(state => state.user.password);
    


    return (
        <View style={styles.container}>

            <Text h5 style={styles.textErr}>{err}</Text>

            <Input

                disabled = {isLoggedIn}
                value={username}
                onChangeText={username => dispatch(setUserName(username))}
                label='Имя пользователя'
                style={styles.input}

            />
            <Input
                value={password}
                onChangeText={password =>dispatch(setPassword(password))}
                label='Пароль'
                secureTextEntry={true}
                style={styles.input}
                disabled = {isLoggedIn}

            />


           

            {!isLoggedIn && <Button title  = 'Войти' onPress={() => dispatch(login(username, password, navigation))} />}

           {isLoggedIn && <Button title  = 'Выйти' onPress={() => dispatch(logOut())} /> }
            
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
    },

    textErr: {
        color: 'red',
        padding:10
    }
});

export default LoginScreen;
