import React from 'react';
import { Text } from 'react-native';

const SelectItem = ({ style, onPress, item, label }) => (
  <Text style={style}
    onPress={() => onPress(item)}
  >
    {item[label]}
  </Text>
);

export default SelectItem;