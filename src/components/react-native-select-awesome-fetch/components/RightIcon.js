import React from 'react';
import { View, StyleSheet } from "react-native";

const RightIcon = ({ rightIcon, clearValue }) => (
  <View style={styles.rightIcon}>
    {rightIcon(clearValue)}
  </View>
);

const styles = StyleSheet.create({
  rightIcon: {
    width: '5%',
    marginTop: 10
  }
});

export default RightIcon;