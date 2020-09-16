import React, { Children } from 'react'
import { View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { THEME } from '../themes'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export const AppButton = ({ children, onPress, type, color = THEME.MAIN_COLOR }) => {

    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

    return (
        <Button
            icon={children === "ОК" ? <Icon name='check-bold' color='#ffffff' size={20} /> : <Icon />}
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title={children}
            onPress={onPress}
            type={type}
            raised
        />

    )
}

const styles = StyleSheet.create(
    {

        Button: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },

        Text: {
            color: '#fff',
            fontFamily: 'roboto-bold'
        }
    }
)